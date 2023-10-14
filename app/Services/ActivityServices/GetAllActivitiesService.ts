import DefaultResponse from '@ioc:Utils/DefaultResponse'
import ActivityRepository from '@ioc:Repositories/ActivityRepository'
import AcademicPaperRepository from '@ioc:Repositories/AcademicPaperRepository'
import CustomException from 'App/Exceptions/CustomException'
import type { ActivityDataDto } from 'App/Dtos/Activities/ActivityDto'

export default class GetAllActivitiesService {
  public async getAll(lessonId: number, roleName: string, studentId?: number) {
    const activities = await ActivityRepository.getAll(lessonId)
    const isEmpty = activities.length === 0

    if (isEmpty) {
      throw new CustomException('Activities not found', 404)
    }

    const activitiesSerializer = await Promise.all(
      activities.map(async (activity) => {
        const activityData: ActivityDataDto = {
          id: activity.id,
          title: activity.title,
          comments: activity.comments,
          type: activity.type,
          createdAt: activity.createdAt,
        }
        const isStudent = roleName === 'STUDENT'

        if (isStudent) {
          const sent = Boolean(
            await AcademicPaperRepository.getByStudentIdAndActivityId(studentId!, activity.id)
          )
          activityData.sent = sent
        }

        return activityData
      })
    )

    return await DefaultResponse.successWithContent('Activities found', 200, activitiesSerializer)
  }
}
