import type { DefaultPaginateDtoResponse } from 'App/Dtos/Utils/DefaultPaginateDto'
import type { TeacherDtoResponse } from 'App/Dtos/Teachers/TeacherDto'

export default interface TeacherRepositoryInterface {
  getAll(
    schoolId: number,
    currentPage?: number,
    numberlinesPerPage?: number,
    name?: string
  ): Promise<DefaultPaginateDtoResponse<TeacherDtoResponse>>
  updateRandomPassword(userId: number)
  getById(teacherId: number)
}
