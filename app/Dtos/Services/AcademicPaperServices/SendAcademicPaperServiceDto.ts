import type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'

export interface SendAcademicPaperServiceDto {
  activityId: number
  studentId: number
  paper: MultipartFileContract
  comments?: string
}
