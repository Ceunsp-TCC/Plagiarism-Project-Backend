import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeFind,
  beforeFetch,
  BelongsTo,
  belongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import type { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

export default class Activities extends BaseModel {
  public static table = 'activities'
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'lessonId', serializeAs: null })
  public lessonId: number

  @column()
  public title: string

  @column()
  public comments?: string

  @column()
  public type: 'NOTICE' | 'ACADEMICPAPER'

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
  public static async ignoreDeletedFind(query: ModelQueryBuilderContract<typeof Activities>) {
    query.whereNull('deletedAt')
  }
  @beforeFetch()
  public static async ignoreDeletedFetch(query: ModelQueryBuilderContract<typeof Activities>) {
    query.whereNull('deletedAt')
  }

  public async delete() {
    this.deletedAt = DateTime.local()
    await this.save()
  }

  @belongsTo(() => Activities, {
    localKey: 'lessonId',
    foreignKey: 'id',
  })
  public lesson: BelongsTo<typeof Activities>
}
