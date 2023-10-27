import OrtographyCorrections from 'App/Models/OrtographyCorrections'
import type OrtographyCorrectionsRepositoryInterface from 'App/Interfaces/Repositories/OrtographyCorrectionsRepositoryInterface'
import type { OrtographyCorrectionDto } from 'App/Dtos/OrtographyCorrections/OrtographyCorrectionDto'

export default class OrtographyCorrectionsLucidRepository
  implements OrtographyCorrectionsRepositoryInterface
{
  constructor(private readonly model: typeof OrtographyCorrections) {}

  public async create(ortographyCorrectionDto: OrtographyCorrectionDto): Promise<boolean> {
    return !!(await this.model.create(ortographyCorrectionDto))
  }
}
