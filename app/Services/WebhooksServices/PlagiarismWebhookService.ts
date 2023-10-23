import DefaultResponse from '@ioc:Utils/DefaultResponse'
import PlagiarismReportRepository from '@ioc:Repositories/PlagiarismReportRepository'
import Plagiarism from '@ioc:ExternalApis/Plagiarism'
import AcademicPaperRepository from '@ioc:Repositories/AcademicPaperRepository'
import { AnalyseStatus } from 'App/Dtos/AcademicPapers/AcademicPaperDto'
import type { PlagiarismWebhookDto } from 'App/Dtos/Webhooks/PlagiarismWebhookDto'

export default class PlagiarismWebhookService {
  private async getSources(reportId: number) {
    return await Plagiarism.getSources(reportId)
  }

  private getOriginality(plagiarism: number) {
    const total = 100
    return total - plagiarism
  }

  private async getAcademicPaperId(externalId: number) {
    const academicPaper = await PlagiarismReportRepository.getAcademicPaperByExternalId(externalId)
    return academicPaper?.id
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

    const academicPaperId = await this.getAcademicPaperId(externalId)

    await AcademicPaperRepository.updateAnalyseStatus(academicPaperId!, AnalyseStatus.COMPLETED)

    return await DefaultResponse.success('Webhook received and processed successfully', 200)
  }
}
