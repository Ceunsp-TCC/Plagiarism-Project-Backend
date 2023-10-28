import { DateTime } from 'luxon'
import { BaseModel, column, beforeFetch, beforeFind } from '@ioc:Adonis/Lucid/Orm'
import type { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

export enum OrtographyCorrectionStatus {
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export default class OrtographyCorrections extends BaseModel {
  public static table = 'ortographyCorrections'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'requesterId', serializeAs: null })
  public requesterId: number

  @column({ columnName: 'userProvidedIdentifier', serializeAs: 'userProvidedIdentifier' })
  public userProvidedIdentifier: string

  @column()
  public original: string

  @column()
  public result?: string

  @column()
  public status: OrtographyCorrectionStatus

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
  public static async ignoreDeletedFind(
    query: ModelQueryBuilderContract<typeof OrtographyCorrections>
  ) {
    query.whereNull('deletedAt')
  }
  @beforeFetch()
  public static async ignoreDeletedFetch(
    query: ModelQueryBuilderContract<typeof OrtographyCorrections>
  ) {
    query.whereNull('deletedAt')
  }

  public async delete() {
    this.deletedAt = DateTime.local()
    await this.save()
  }
}
