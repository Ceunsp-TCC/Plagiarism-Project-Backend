import { ActivityType } from 'App/Dtos/Activities/ActivityDto'

export interface CreateActivityServiceDto {
  lessonId: number
  title: string
  comments?: string
  type: ActivityType
}
