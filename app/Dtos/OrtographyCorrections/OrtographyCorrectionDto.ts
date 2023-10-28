import { OrtographyCorrectionStatus } from 'App/Models/OrtographyCorrections'
export interface OrtographyCorrectionDto {
  requesterId: number
  userProvidedIdentifier: string
  original: string
}

export interface OrtographyCorrectionDtoResponse {
  id: number
  userProvidedIdentifier: string
  original: string
  result?: string
  status: OrtographyCorrectionStatus
  createdAt: string
}
