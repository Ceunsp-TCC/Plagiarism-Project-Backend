import { PlagiarismReportDto } from 'App/Dtos/PlagiarismReport/PlagiarismReportDto'
import PlagiarismReport from 'App/Models/PlagiarismReport'

export default interface PlagiarismReportRepositoryInterface {
  create(CreatePlagiarismReportDto: PlagiarismReportDto)
  update(plagiarismReportDto: PlagiarismReportDto)
  getAcademicPaperByExternalId(externalId: number): Promise<PlagiarismReport | null>
}
