import type { OrtographyCorrectionDto } from 'App/Dtos/OrtographyCorrections/OrtographyCorrectionDto'

export default interface OrtographyCorrectionsRepositoryInterface {
  create(OrtographyCorrectionDto: OrtographyCorrectionDto): Promise<boolean>
}
