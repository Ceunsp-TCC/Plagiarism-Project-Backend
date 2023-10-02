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
