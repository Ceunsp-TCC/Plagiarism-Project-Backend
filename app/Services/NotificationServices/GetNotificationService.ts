import DefaultResponse from '@ioc:Utils/DefaultResponse'
import NotificationsRepository from '@ioc:Repositories/NotificationsRepository'
import CustomException from 'App/Exceptions/CustomException'

export default class GetNotificationService {
  public async run(receiverId: number) {
    const notification = await NotificationsRepository.getCurrent(receiverId)

    if (!notification) {
      throw new CustomException('Your notifications are empty', 404)
    }

    await NotificationsRepository.readNotification(receiverId)

    return await DefaultResponse.successWithContent('Notification found', 200, notification)
  }
}
