import { BaseCommand } from '@adonisjs/core/build/standalone'
import { PlagiarismStatus } from 'App/Dtos/Webhooks/PlagiarismWebhookDto'
import Plagiarism from '@ioc:ExternalApis/Plagiarism'
import NotificationsRepository from '@ioc:Repositories/NotificationsRepository'
import PlagiarismReportRepository from '@ioc:Repositories/PlagiarismReportRepository'
import AcademicPaperRepository from '@ioc:Repositories/AcademicPaperRepository'
import { AnalysisStatus } from 'App/Dtos/AcademicPapers/AcademicPaperDto'
import { DateTime } from 'luxon'

export default class PlagiarismCheckedCronJob extends BaseCommand {
  public static commandName = 'plagiarism-search-checked:cron-job'
  public static description = 'Cron job para redundancia de status de plagio'

  public static settings = {
    loadApp: true,
  }
  protected async getPlagiarismReportNotComplete() {
    return PlagiarismReportRepository.getPlagiarismReportWhenReviewIsNotCompleted()
  }

  protected async getReportFromPartner(externalId: number) {
    return Plagiarism.getReportById(externalId)
  }

  protected async getSourcesFromPartner(externalId: number) {
    return Plagiarism.getSources(externalId)
  }

  protected async createNotification(receiverId: number, academicPaperId: number) {
    const screen = `/lessons/activity/academic-paper/${academicPaperId}`

    const notificationData = {
      message: `Boas notícias! A análise do trabalho ${academicPaperId} foi finalizada.`,
      receiverId,
      data: {
        navigateTo: screen,
        reactQueryKeys: ['academic-paper'],
      },
    }
    return await NotificationsRepository.create(notificationData)
  }

  public async run() {
    const nowDate = DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss')
    this.logger.info(`plagiarism-search-completed - STARTED - ${nowDate}`)
    const currentPlagiarismReport = await this.getPlagiarismReportNotComplete()

    const notFoundPlagiarismForCompleteReview = !currentPlagiarismReport

    if (!notFoundPlagiarismForCompleteReview) {
      const externalId = currentPlagiarismReport.externalId

      const plagiarismDataFromPartner = await this.getReportFromPartner(externalId)

      const academicPaperId = currentPlagiarismReport.academicPaperId
      const requesterId = currentPlagiarismReport.requesterId
      const plagiarism = plagiarismDataFromPartner.plagiarism
      const originality = plagiarismDataFromPartner.originality
      const webhookJson = plagiarismDataFromPartner.webhookJson

      const status = plagiarismDataFromPartner.status

      const reviewIsCompleted = status === PlagiarismStatus.COMPLETED

      if (reviewIsCompleted) {
        const sources = await this.getSourcesFromPartner(externalId)

        const data = {
          externalId,
          plagiarism,
          originality,
          sources: JSON.stringify(sources),
          webhookJson,
        }

        await PlagiarismReportRepository.update(data)

        await AcademicPaperRepository.updateAnalyseStatus(
          academicPaperId!,
          AnalysisStatus.COMPLETED
        )

        await this.createNotification(requesterId!, academicPaperId!)
      }
    }

    this.logger.info(`plagiarism-search-completed - COMPLETED - ${nowDate}`)
  }
}
