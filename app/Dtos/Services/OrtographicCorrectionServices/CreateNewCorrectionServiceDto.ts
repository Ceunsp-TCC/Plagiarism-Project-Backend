import type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'

export interface CreateNewCorrectionServiceDto {
  requesterId: number
  userProvidedIdentifier: string
  original: MultipartFileContract
}
