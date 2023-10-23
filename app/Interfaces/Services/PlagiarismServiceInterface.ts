import type { CreateReportReturn } from 'App/Services/types/Http/PlagiarismSearchServices/CreateReportResponse'
import type { SourceFormatted } from 'App/Services/types/Http/PlagiarismSearchServices/GetSourcesPlagiarismSearchResponse'

export interface PlagiarismServiceInterface {
  createReport(text: string): Promise<CreateReportReturn>
  getSources(reportId: number): Promise<SourceFormatted[]>
}
