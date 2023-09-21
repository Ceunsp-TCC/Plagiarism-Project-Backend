import type { DefaultPaginateDtoResponse } from 'App/Dtos/Utils/DefaultPaginateDto'
import type { StudentDtoResponse } from 'App/Dtos/Students/StudentDto'
import type { LessonByStudentDto } from 'App/Dtos/Lessons/LessonByStudentDto'

export default interface StudentRepositoryInterface {
  getAll(
    schoolId: number,
    currentPage?: number,
    numberlinesPerPage?: number,
    name?: string
  ): Promise<DefaultPaginateDtoResponse<StudentDtoResponse>>
  updateRandomPassword(userId: number)
  getByClass(
    classId: number,
    currentPage?: number,
    numberlinesPerPage?: number,
    name?: string
  ): Promise<DefaultPaginateDtoResponse<StudentDtoResponse>>
  getLessons(
    studentId: number,
    currentPage?: number,
    numberlinesPerPage?: number
  ): Promise<DefaultPaginateDtoResponse<LessonByStudentDto>>
}
