import { DefaultPaginateDtoResponse } from 'App/Dtos/Utils/DefaultPaginateDto'
import type { ClassRepositoryDto, ClassDtoResponse } from 'App/Dtos/Class/ClassDto'

export default interface ClassRepositoryInterface {
  create(ClassRepositoryDto: ClassRepositoryDto)
  getAll(
    schoolId: number,
    currentPage?: number,
    numberlinesPerPage?: number,
    name?: string
  ): Promise<DefaultPaginateDtoResponse<ClassDtoResponse>>
}
