import Notifications from 'App/Models/Notifications'
import type { CreateNotificationDto } from 'App/Dtos/Notifications/NotificationDto'

export default interface NotificationsRepositoryInterface {
  create(createNotificationDto: CreateNotificationDto): Promise<Notifications>
  getCurrent(receiverId: number): Promise<Notifications | null>
  readNotification(receiverId: number): Promise<boolean>
}
