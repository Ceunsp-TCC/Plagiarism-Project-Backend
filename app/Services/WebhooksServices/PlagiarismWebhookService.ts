import DefaultResponse from '@ioc:Utils/DefaultResponse'
import PlagiarismReportRepository from '@ioc:Repositories/PlagiarismReportRepository'
import Plagiarism from '@ioc:ExternalApis/Plagiarism'
import AcademicPaperRepository from '@ioc:Repositories/AcademicPaperRepository'
import { AnalysisStatus } from 'App/Dtos/AcademicPapers/AcademicPaperDto'
import NotificationsRepository from '@ioc:Repositories/NotificationsRepository'
import type { PlagiarismWebhookDto } from 'App/Dtos/Webhooks/PlagiarismWebhookDto'

export default class PlagiarismWebhookService {
  private async getSources(reportId: number) {
    return await Plagiarism.getSources(reportId)
  }

  private getOriginality(plagiarism: number) {
    const total = 100
    return total - plagiarism
  }

  private async getReport(externalId: number) {
    return await PlagiarismReportRepository.getAcademicPaperByExternalId(externalId)
  }

  private async createNotification(receiverId: number, academicPaperId: number) {
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

  public async handler(plagiarismWebhookDto: PlagiarismWebhookDto) {
    const externalId = plagiarismWebhookDto.id
    const sources = await this.getSources(externalId)
    const plagiarism = plagiarismWebhookDto.plagiarism
    const originality = this.getOriginality(plagiarism)

    const data = {
      externalId,
      plagiarism,
      originality: originality,
      sources: JSON.stringify(sources),
      webhookJson: plagiarismWebhookDto,
    }

    await PlagiarismReportRepository.update(data)

    const plagiarismReport = await this.getReport(externalId)

    const academicPaperId = plagiarismReport?.academicPaperId
    const requesterId = plagiarismReport?.requesterId

    await AcademicPaperRepository.updateAnalyseStatus(academicPaperId!, AnalysisStatus.COMPLETED)

    await this.createNotification(requesterId!, academicPaperId!)

    return await DefaultResponse.success('Webhook received and processed successfully', 200)
  }
}
