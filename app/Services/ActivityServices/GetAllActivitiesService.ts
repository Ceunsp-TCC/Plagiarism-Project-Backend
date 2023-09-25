import DefaultResponse from '@ioc:Utils/DefaultResponse'
import ActivityRepository from '@ioc:Repositories/ActivityRepository'
import CustomException from 'App/Exceptions/CustomException'

export default class GetAllActivitiesService {
  public async getAll(lessonId: number) {
    const activities = await ActivityRepository.getAll(lessonId)
    const isEmpty = activities.length === 0

    if (isEmpty) {
      throw new CustomException('Activities not found', 404)
    }

    return await DefaultResponse.successWithContent('Activities found', 200, activities)
  }
}
