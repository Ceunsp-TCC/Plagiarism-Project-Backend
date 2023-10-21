import type { CreateReportReturn } from 'App/Services/types/Http/PlagiarismSearchServices/CreateReportResponse'

export interface PlagiarismServiceInterface {
  createReport(text: string): Promise<CreateReportReturn>
}
