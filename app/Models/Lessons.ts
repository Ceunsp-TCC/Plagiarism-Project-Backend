import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeFind,
  beforeFetch,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import Semesters from 'App/Models/Semesters'
import type { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

export default class Lessons extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'semesterId', serializeAs: null })
  public semesterId: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public place: string

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
  public static async ignoreDeletedFind(query: ModelQueryBuilderContract<typeof Lessons>) {
    query.whereNull('deletedAt')
  }
  @beforeFetch()
  public static async ignoreDeletedFetch(query: ModelQueryBuilderContract<typeof Lessons>) {
    query.whereNull('deletedAt')
  }

  public async delete() {
    this.deletedAt = DateTime.local()
    await this.save()
  }
  @belongsTo(() => Semesters, {
    localKey: 'semesterId',
    foreignKey: 'id',
  })
  public semester: BelongsTo<typeof Semesters>
}
