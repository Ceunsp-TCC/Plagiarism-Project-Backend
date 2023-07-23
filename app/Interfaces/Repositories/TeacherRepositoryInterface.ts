import { DefaultPaginateDtoResponse } from 'App/Dtos/Utils/DefaultPaginateDto'
import { TeacherDtoResponse } from 'App/Dtos/Teachers/TeacherDto'
export default interface TeacherRepositoryInterface {
  getAll(
    schoolId: number,
    currentPage?: number,
    numberlinesPerPage?: number,
    name?: string
  ): Promise<DefaultPaginateDtoResponse<TeacherDtoResponse>>
}
