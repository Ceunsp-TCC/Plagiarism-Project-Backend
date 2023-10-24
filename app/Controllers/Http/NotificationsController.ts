import GetNotificationService from 'App/Services/NotificationServices/GetNotificationService'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NotificationsController {
  private getNotificationService: GetNotificationService

  constructor() {
    this.getNotificationService = new GetNotificationService()
  }

  public async show({ auth }: HttpContextContract) {
    const receiverId = await auth.user?.id

    return await this.getNotificationService.run(receiverId!)
  }
}
