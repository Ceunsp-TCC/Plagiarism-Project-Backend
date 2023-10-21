import DefaultResponse from '@ioc:Utils/DefaultResponse'
import PlagiarismReportRepository from '@ioc:Repositories/PlagiarismReportRepository'
import type { PlagiarismWebhookDto } from 'App/Dtos/Webhooks/PlagiarismWebhookDto'

export default class PlagiarismWebhookService {
  private getOriginality(plagiarism: number) {
    const total = 100
    return total - plagiarism
  }

  public async handler(plagiarismWebhookDto: PlagiarismWebhookDto) {
    const originality = this.getOriginality(plagiarismWebhookDto.plagiarism)

    const data = {
      externalId: plagiarismWebhookDto.id,
      plagiarism: plagiarismWebhookDto.plagiarism,
      aiProbability: plagiarismWebhookDto.ai_probability,
      originality: originality,
      sources: [],
      webhookJson: plagiarismWebhookDto,
    }

    await PlagiarismReportRepository.update(data)

    return await DefaultResponse.success('Webhook received and processed successfully', 200)
  }
}
