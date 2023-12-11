import type { CreateReportReturn } from 'App/Services/types/Http/PlagiarismSearchServices/CreateReportResponse'
import type { GetReportByIdReturn } from 'App/Services/types/Http/PlagiarismSearchServices/GetReportByIdResponse'
import type { SourceFormatted } from 'App/Services/types/Http/PlagiarismSearchServices/GetSourcesPlagiarismSearchResponse'

export interface PlagiarismServiceInterface {
  createReport(text: string): Promise<CreateReportReturn>
  getReportById(reportId: number): Promise<GetReportByIdReturn>
  getSources(reportId: number): Promise<SourceFormatted[]>
}
