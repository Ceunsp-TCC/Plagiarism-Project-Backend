export enum ActivityType {
  NOTICE = 'NOTICE',
  ACADEMICPAPER = 'ACADEMICPAPER',
}
export interface ActivityRepositoryDto {
  lessonId: number
  title: string
  comments?: string
  type: ActivityType
}

export interface ActivityDataDto {
  id: number
  title: string
  comments?: string
  type: string
  createdAt: string
  sent?: boolean
  note?: number
}
