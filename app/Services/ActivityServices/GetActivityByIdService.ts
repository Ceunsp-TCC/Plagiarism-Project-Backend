import DefaultResponse from '@ioc:Utils/DefaultResponse'
import ActivityRepository from '@ioc:Repositories/ActivityRepository'
import CustomException from 'App/Exceptions/CustomException'

export default class GetActivityByIdService {
  public async getById(activityId: number) {
    const activity = await ActivityRepository.findById(activityId)

    if (!activity) {
      throw new CustomException('Activity not found', 404)
    }

    return await DefaultResponse.successWithContent('Activity found', 200, activity)
  }
}
