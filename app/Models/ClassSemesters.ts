import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeFind,
  beforeFetch,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Classes from 'App/Models/Classes'
import ClassSemestersLessons from 'App/Models/ClassSemestersLessons'
import type { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

export default class ClassSemesters extends BaseModel {
  public static table = 'classSemesters'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'classId', serializeAs: null })
  public classId: number

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
  public static async ignoreDeletedFind(query: ModelQueryBuilderContract<typeof ClassSemesters>) {
    query.whereNull('deletedAt')
  }
  @beforeFetch()
  public static async ignoreDeletedFetch(query: ModelQueryBuilderContract<typeof ClassSemesters>) {
    query.whereNull('deletedAt')
  }

  public async delete() {
    this.deletedAt = DateTime.local()
    await this.save()
  }

  @belongsTo(() => Classes, {
    localKey: 'courseId',
    foreignKey: 'id',
  })
  public class: BelongsTo<typeof Classes>

  @hasMany(() => ClassSemestersLessons, {
    localKey: 'id',
    foreignKey: 'classSemesterId',
  })
  public lessons: HasMany<typeof ClassSemestersLessons>
}
