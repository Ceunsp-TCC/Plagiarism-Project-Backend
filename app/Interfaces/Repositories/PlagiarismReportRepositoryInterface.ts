import { PlagiarismReportDto } from 'App/Dtos/PlagiarismReport/PlagiarismReportDto'

export default interface PlagiarismReportRepositoryInterface {
  create(CreatePlagiarismReportDto: PlagiarismReportDto)
  update(plagiarismReportDto: PlagiarismReportDto)
}
