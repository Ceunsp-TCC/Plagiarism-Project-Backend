import type { ActivityRepositoryDto } from 'App/Dtos/Activities/ActivityDto'

export default interface ActivityRepositoryInterface {
  create(ActivityRepositoryDto: ActivityRepositoryDto)
}
