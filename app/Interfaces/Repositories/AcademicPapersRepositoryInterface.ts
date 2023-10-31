import type {
  AcademicPaperDto,
  AcademicPaperDtoResponse,
} from 'App/Dtos/AcademicPapers/AcademicPaperDto'
import AcademicPapers from 'App/Models/AcademicPapers'
import { AnalysisStatus } from 'App/Dtos/AcademicPapers/AcademicPaperDto'
import type { DefaultPaginateDtoResponse } from 'App/Dtos/Utils/DefaultPaginateDto'

export default interface AcademicPapersRepositoryInterface {
  create(AcademicPaperRepositoryDto: AcademicPaperDto)
  getAll(
    activityId: number,
    currentPage: number,
    numberlinesPerPage: number
  ): Promise<DefaultPaginateDtoResponse<AcademicPaperDtoResponse>>

  getByStudentIdAndActivityId(studentId: number, activityId: number): Promise<AcademicPapers | null>
  getById(academicPaperId: number): Promise<AcademicPapers | null>
  updateAnalyseStatus(academicPaperId: number, status: AnalysisStatus): Promise<boolean>
  updateNote(academicPaperId: number, note: number): Promise<boolean>
}
