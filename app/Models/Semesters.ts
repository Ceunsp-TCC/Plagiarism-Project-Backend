import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeFind,
  beforeFetch,
  BelongsTo,
  belongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import Courses from 'App/Models/Courses'
import type { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

export default class Semesters extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'courseId', serializeAs: null })
  public courseId: number

  @column()
  public name: string

  @column()
  public description: string

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
  public static async ignoreDeletedFind(query: ModelQueryBuilderContract<typeof Semesters>) {
    query.whereNull('deletedAt')
  }
  @beforeFetch()
  public static async ignoreDeletedFetch(query: ModelQueryBuilderContract<typeof Semesters>) {
    query.whereNull('deletedAt')
  }

  public async delete() {
    this.deletedAt = DateTime.local()
    await this.save()
  }

  @belongsTo(() => Courses, {
    localKey: 'courseId',
    foreignKey: 'id',
  })
  public course: BelongsTo<typeof Courses>
}
