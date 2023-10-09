import type { AcademicPaperDto } from 'App/Dtos/AcademicPapers/AcademicPaperDto'

export default interface AcademicPapersRepositoryInterface {
  create(AcademicPaperRepositoryDto: AcademicPaperDto)
}
