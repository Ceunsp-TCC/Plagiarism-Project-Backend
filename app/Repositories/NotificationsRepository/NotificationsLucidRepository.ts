import Notifications from 'App/Models/Notifications'
import type { CreateNotificationDto } from 'App/Dtos/Notifications/NotificationDto'
import type NotificationsRepositoryInterface from 'App/Interfaces/Repositories/NotificationsRepositoryInterface'

export default class NotificationsLucidRepository implements NotificationsRepositoryInterface {
  constructor(private readonly model: typeof Notifications) {}

  public async create(notificationDto: CreateNotificationDto) {
    return await this.model.create(notificationDto)
  }

  public async getCurrent(receiverId: number): Promise<Notifications | null> {
    return await this.model.query().where('receiverId', receiverId).where('isRead', false).first()
  }

  public async readNotification(receiverId: number) {
    const notification = await this.getCurrent(receiverId)

    return !!(await notification?.merge({ isRead: true }).save())
  }
}
