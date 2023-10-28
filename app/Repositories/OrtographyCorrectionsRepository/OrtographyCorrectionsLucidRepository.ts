import OrtographyCorrections from 'App/Models/OrtographyCorrections'
import { OrtographyCorrectionStatus } from 'App/Models/OrtographyCorrections'
import type OrtographyCorrectionsRepositoryInterface from 'App/Interfaces/Repositories/OrtographyCorrectionsRepositoryInterface'
import type { OrtographyCorrectionDto } from 'App/Dtos/OrtographyCorrections/OrtographyCorrectionDto'

export default class OrtographyCorrectionsLucidRepository
  implements OrtographyCorrectionsRepositoryInterface
{
  constructor(private readonly model: typeof OrtographyCorrections) {}

  public async create(ortographyCorrectionDto: OrtographyCorrectionDto): Promise<boolean> {
    return !!(await this.model.create(ortographyCorrectionDto))
  }

  public async findByUserProvidedIdentifier(
    userProvidedIdentifier: string
  ): Promise<OrtographyCorrections | null> {
    return await this.model.query().where('userProvidedIdentifier', userProvidedIdentifier).first()
  }

  public async updateResultCorrection(
    userProvidedIdentifier: string,
    result: string
  ): Promise<boolean> {
    const ortographyCorrection = await this.model
      .query()
      .where('userProvidedIdentifier', userProvidedIdentifier)
      .first()

    return !!(await ortographyCorrection?.merge({ result }))?.save()
  }
  public async updateStatus(
    userProvidedIdentifier: string,
    status: OrtographyCorrectionStatus
  ): Promise<boolean> {
    const ortographyCorrection = await this.model
      .query()
      .where('userProvidedIdentifier', userProvidedIdentifier)
      .first()

    return !!(await ortographyCorrection?.merge({ status }))?.save()
  }
}
