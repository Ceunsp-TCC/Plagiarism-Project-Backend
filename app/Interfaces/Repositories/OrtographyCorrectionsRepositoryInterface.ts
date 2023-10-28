import { OrtographyCorrectionStatus } from 'App/Models/OrtographyCorrections'
import OrtographyCorrections from 'App/Models/OrtographyCorrections'
import type { OrtographyCorrectionDto } from 'App/Dtos/OrtographyCorrections/OrtographyCorrectionDto'

export default interface OrtographyCorrectionsRepositoryInterface {
  create(OrtographyCorrectionDto: OrtographyCorrectionDto): Promise<boolean>
  updateStatus(userProvidedIdentifier: string, status: OrtographyCorrectionStatus): Promise<boolean>
  updateResultCorrection(userProvidedIdentifier: string, result: string): Promise<boolean>
  findByUserProvidedIdentifier(
    userProvidedIdentifier: string
  ): Promise<OrtographyCorrections | null>
}
