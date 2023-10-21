import PlagiarismReport from 'App/Models/PlagiarismReport'
import type { PlagiarismReportDto } from 'App/Dtos/PlagiarismReport/PlagiarismReportDto'
import type PlagiarismReportRepositoryInterface from 'App/Interfaces/Repositories/PlagiarismReportRepositoryInterface'

export default class PlagiarismReportLucidRepository
  implements PlagiarismReportRepositoryInterface
{
  constructor(private readonly model: typeof PlagiarismReport) {}

  public async create(plagiarismReportDto: PlagiarismReportDto) {
    const plagiarismReport = await this.model.create(plagiarismReportDto)

    return plagiarismReport
  }

  public async update(plagiarismReportDto: PlagiarismReportDto) {
    const report = await this.model
      .query()
      .where('externalId', plagiarismReportDto.externalId!)
      .first()

    return !!(await report?.merge(plagiarismReportDto).save())
  }
}
