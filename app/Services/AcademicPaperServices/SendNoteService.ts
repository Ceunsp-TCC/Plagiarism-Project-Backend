import DefaultResponse from '@ioc:Utils/DefaultResponse'
import AcademicPaperRepository from '@ioc:Repositories/AcademicPaperRepository'
import NotificationsRepository from '@ioc:Repositories/NotificationsRepository'
import CustomException from 'App/Exceptions/CustomException'
import ActivityRepository from '@ioc:Repositories/ActivityRepository'

export default class SendNoteService {
  private async createNotification(receiverId: number, lessonId: number, academicPaperId: number) {
    const screen = `/lessons/${lessonId}`

    const notificationData = {
      message: `Boas notícias! O seu trabalho ${academicPaperId} foi corrigido.`,
      receiverId,
      data: {
        navigateTo: screen,
        reactQueryKeys: ['activities'],
      },
    }
    return await NotificationsRepository.create(notificationData)
  }

  public async send(academicPaperId: number, note: number) {
    const findAcademicPaper = await AcademicPaperRepository.getById(academicPaperId)

    if (!findAcademicPaper) {
      throw new CustomException(`Not found academic paper`, 404)
    }

    const activityId = findAcademicPaper.activityId
    const studentId = await (await findAcademicPaper.related('student').query().first())?.userId
    const lessonId = await (await ActivityRepository.findById(activityId))?.lessonId

    await AcademicPaperRepository.updateNote(academicPaperId, note)

    await this.createNotification(studentId!, lessonId!, academicPaperId)

    return await DefaultResponse.success('Note sent successfully', 200)
  }
}
