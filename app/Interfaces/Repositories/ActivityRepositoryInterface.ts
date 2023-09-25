import type { ActivityRepositoryDto } from 'App/Dtos/Activities/ActivityDto'
import Activities from 'App/Models/Activities'

export default interface ActivityRepositoryInterface {
  create(ActivityRepositoryDto: ActivityRepositoryDto)
  getAll(lessonId: number): Promise<Activities[]>
}
