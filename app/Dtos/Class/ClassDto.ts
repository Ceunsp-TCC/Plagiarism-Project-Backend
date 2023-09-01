interface ClassSemesterLessonsDto {
  name: string
  description?: string
  place: string
}
interface ClassSemesterDto {
  name: string
  description?: string
  lessons: ClassSemesterLessonsDto[]
}
export interface ClassRepositoryDto {
  schoolId: number
  courseId: number
  name: string
  semesters: ClassSemesterDto[]
}
export interface ClassServiceDto {
  schoolId: number
  courseId: number
}

interface Lesson {
  name: string
  description: string
  place: string
}
export interface CourseSemesterDto {
  name: string
  description: string
  lessons: Lesson[]
}

export interface ClassDtoResponse {
  id: number
  name: string
  createdAt: string
}
