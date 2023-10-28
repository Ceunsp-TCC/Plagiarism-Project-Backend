import { OrtographyCorrectionStatus } from 'App/Models/OrtographyCorrections'
import OrtographyCorrections from 'App/Models/OrtographyCorrections'
import type { DefaultPaginateDtoResponse } from 'App/Dtos/Utils/DefaultPaginateDto'
import type {
  OrtographyCorrectionDto,
  OrtographyCorrectionDtoResponse,
} from 'App/Dtos/OrtographyCorrections/OrtographyCorrectionDto'

export default interface OrtographyCorrectionsRepositoryInterface {
  create(OrtographyCorrectionDto: OrtographyCorrectionDto): Promise<boolean>
  getAll(
    requesterId: number,
    currentPage?: number,
    numberlinesPerPage?: number,
    identifier?: string
  ): Promise<DefaultPaginateDtoResponse<OrtographyCorrectionDtoResponse>>
  getById(id: number): Promise<OrtographyCorrections | null>
  updateStatus(userProvidedIdentifier: string, status: OrtographyCorrectionStatus): Promise<boolean>
  updateResultCorrection(userProvidedIdentifier: string, result: string): Promise<boolean>
  findByUserProvidedIdentifier(
    userProvidedIdentifier: string
  ): Promise<OrtographyCorrections | null>
}
