export interface AcademicPaperDto {
  activityId: number
  studentId: number
  paper: string
  comments?: string
}
export interface AcademicPaperDtoResponse {
  paper: string
  comments?: string
  createdAt: string
}
