import type {
  AcademicPaperDto,
  AcademicPaperDtoResponse,
} from 'App/Dtos/AcademicPapers/AcademicPaperDto'
import type { DefaultPaginateDtoResponse } from 'App/Dtos/Utils/DefaultPaginateDto'

export default interface AcademicPapersRepositoryInterface {
  create(AcademicPaperRepositoryDto: AcademicPaperDto)
  getAll(
    activityId: number,
    currentPage: number,
    numberlinesPerPage: number
  ): Promise<DefaultPaginateDtoResponse<AcademicPaperDtoResponse>>
}
