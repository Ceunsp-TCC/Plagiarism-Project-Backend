import { DateTime } from 'luxon'
import { BaseModel, column, beforeFind, beforeFetch } from '@ioc:Adonis/Lucid/Orm'
import type { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

export default class PlagiarismReport extends BaseModel {
  public static table = 'plagiarismReports'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'requesterId', serializeAs: null })
  public requesterId: number

  @column({ columnName: 'academicPaperId', serializeAs: null })
  public academicPaperId: number

  @column({ columnName: 'externalId', serializeAs: null })
  public externalId: number

  @column()
  public plagiarism?: number

  @column()
  public originality?: number

  @column({ columnName: 'aiProbability', serializeAs: null })
  public aiProbability?: number

  @column()
  public sources?: any

  @column({ columnName: 'webhookJson', serializeAs: null })
  public webhookJson?: any

  @column.dateTime({
    autoCreate: true,
    columnName: 'createdAt',
    serializeAs: 'createdAt',
    serialize: (value) => value.toFormat('dd/MM/yyyy HH:mm:ss'),
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: null,
    columnName: 'updatedAt',
  })
  public updatedAt: DateTime

  @column.dateTime({ columnName: 'deletedAt', serializeAs: null })
  public deletedAt: DateTime

  @beforeFind()
  public static async ignoreDeletedFind(query: ModelQueryBuilderContract<typeof PlagiarismReport>) {
    query.whereNull('deletedAt')
  }
  @beforeFetch()
  public static async ignoreDeletedFetch(
    query: ModelQueryBuilderContract<typeof PlagiarismReport>
  ) {
    query.whereNull('deletedAt')
  }

  public async delete() {
    this.deletedAt = DateTime.local()
    await this.save()
  }
}
