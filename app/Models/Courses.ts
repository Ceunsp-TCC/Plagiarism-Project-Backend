import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeFind,
  beforeFetch,
  belongsTo,
  BelongsTo,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import Schools from 'App/Models/Schools'
import type { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

export default class Courses extends BaseModel {
  public static table = 'courses'
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'schoolId', serializeAs: null })
  public schoolId: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public modality: 'HYBRID' | 'INPERSON' | 'ONLINE'

  @column()
  public category: string

  @column()
  public price: number

  @column()
  public image: string

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
  public static async ignoreDeletedFind(query: ModelQueryBuilderContract<typeof Courses>) {
    query.whereNull('deletedAt')
  }
  @beforeFetch()
  public static async ignoreDeletedFetch(query: ModelQueryBuilderContract<typeof Courses>) {
    query.whereNull('deletedAt')
  }

  public async delete() {
    this.deletedAt = DateTime.local()
    await this.save()
  }

  @belongsTo(() => Schools, {
    localKey: 'schoolId',
    foreignKey: 'userId',
  })
  public school: BelongsTo<typeof Schools>

  public static byUser = scope((query, schoolId: number) => {
    query.where('schoolId', schoolId)
  })
}
