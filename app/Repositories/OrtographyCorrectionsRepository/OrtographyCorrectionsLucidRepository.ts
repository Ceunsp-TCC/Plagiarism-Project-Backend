import OrtographyCorrections from 'App/Models/OrtographyCorrections'
import { OrtographyCorrectionStatus } from 'App/Models/OrtographyCorrections'
import DefaultPaginate from '@ioc:Utils/DefaultPaginate'
import type OrtographyCorrectionsRepositoryInterface from 'App/Interfaces/Repositories/OrtographyCorrectionsRepositoryInterface'
import type { SimplePaginatorContract } from '@ioc:Adonis/Lucid/Database'
import type {
  OrtographyCorrectionDto,
  OrtographyCorrectionDtoResponse,
} from 'App/Dtos/OrtographyCorrections/OrtographyCorrectionDto'

export default class OrtographyCorrectionsLucidRepository
  implements OrtographyCorrectionsRepositoryInterface
{
  constructor(private readonly model: typeof OrtographyCorrections) {}

  public async create(ortographyCorrectionDto: OrtographyCorrectionDto): Promise<boolean> {
    return !!(await this.model.create(ortographyCorrectionDto))
  }

  public async getAll(
    requesterId: number,
    currentPage: number = 1,
    numberlinesPerPage: number = 10,
    identifier: string = ''
  ) {
    const ortographyCorrections = await this.model
      .query()
      .where('requesterId', requesterId)
      .where((query) => {
        if (identifier) {
          query.whereILike('identifier', `%${identifier}%`)
        }
      })
      .orderBy('createdAt', 'desc')
      .paginate(currentPage!, numberlinesPerPage)

    return DefaultPaginate.formatToDefaultPaginate<OrtographyCorrectionDtoResponse>({
      items: (await ortographyCorrections.all()) as unknown as OrtographyCorrectionDtoResponse[],
      paginateProperties:
        ortographyCorrections as unknown as SimplePaginatorContract<OrtographyCorrectionDtoResponse>,
    })
  }

  public async getById(id: number): Promise<OrtographyCorrections | null> {
    return await this.model.query().where('id', id).first()
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
