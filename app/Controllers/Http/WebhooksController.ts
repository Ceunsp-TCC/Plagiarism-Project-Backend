import PlagiarismWebhookService from 'App/Services/WebhooksServices/PlagiarismWebhookService'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { PlagiarismWebhookDto } from 'App/Dtos/Webhooks/PlagiarismWebhookDto'

export default class WebhooksController {
  private plagiarismWebhookService: PlagiarismWebhookService

  constructor() {
    this.plagiarismWebhookService = new PlagiarismWebhookService()
  }

  public async plagiarism({ request }: HttpContextContract) {
    const payload = await request.body()

    console.log(`Plagiarism Webhook payload: ${JSON.stringify(payload)}`)

    return await this.plagiarismWebhookService.handler(payload as PlagiarismWebhookDto)
  }
}
