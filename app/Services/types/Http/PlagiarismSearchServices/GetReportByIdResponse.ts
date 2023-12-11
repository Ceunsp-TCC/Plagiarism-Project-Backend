import type { PlagiarismStatus } from 'App/Dtos/Webhooks/PlagiarismWebhookDto'

export interface GetReportByIdReturn {
  id: number
  status: PlagiarismStatus
  plagiarism: number
  originality: number
  webhookJson: any
}

export interface GetReportByIdData {
  id: number
  status: PlagiarismStatus
  plagiarism: number
  originality: number
}
