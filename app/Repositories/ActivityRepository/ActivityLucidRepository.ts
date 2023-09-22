import Activities from 'App/Models/Activities'
import type ActivityRepositoryInterface from 'App/Interfaces/Repositories/ActivityRepositoryInterface'
import type { ActivityRepositoryDto } from 'App/Dtos/Activities/ActivityDto'

export default class ActivityLucidRepository implements ActivityRepositoryInterface {
  constructor(private readonly model: typeof Activities) {}

  public async create(activityDto: ActivityRepositoryDto) {
    const activity = await this.model.create(activityDto)

    return activity
  }
}
