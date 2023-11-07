export enum PlagiarismStatus {
  PROCESSING = -10,
  COMPLETED = 2,
}

export interface PlagiarismWebhookDto {
  id: number
  plagiarism: number
  ai_probability: number
  status: PlagiarismStatus
}
