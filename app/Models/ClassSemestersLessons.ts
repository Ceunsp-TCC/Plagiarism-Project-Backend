import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeFind,
  beforeFetch,
  belongsTo,
  BelongsTo,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import ClassSemesters from 'App/Models/ClassSemesters'
import Teachers from 'App/Models/Teachers'
import type { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

export default class ClassSemestersLessons extends BaseModel {
  public static table = 'classSemestersLessons'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'classSemesterId', serializeAs: null })
  public classSemesterId: number

  @column({ columnName: 'teacherId', serializeAs: null })
  public teacherId: number

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

  @hasOne(() => Teachers, {
    localKey: 'teacherId',
    foreignKey: 'userId',
  })
  public teacher: HasOne<typeof Teachers>

  @belongsTo(() => ClassSemesters, {
    localKey: 'courseId',
    foreignKey: 'id',
  })
  public semester: BelongsTo<typeof ClassSemesters>
}
