import type { NotificationData } from 'App/Models/Notifications'

export interface CreateNotificationDto {
  receiverId: number
  message: string
  data: NotificationData
}
