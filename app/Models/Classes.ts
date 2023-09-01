import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeFind,
  beforeFetch,
  belongsTo,
  BelongsTo,
  HasOne,
  hasOne,
  HasMany,
  hasMany,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import Schools from 'App/Models/Schools'
import Courses from 'App/Models/Courses'
import ClassSemesters from 'App/Models/ClassSemesters'
import type { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

export default class Classes extends BaseModel {
  public static table = 'classes'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'schoolId', serializeAs: null })
  public schoolId: number

  @column({ columnName: 'courseId', serializeAs: null })
  public courseId: number

  @column()
  public name: string

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
  public static async ignoreDeletedFind(query: ModelQueryBuilderContract<typeof Classes>) {
    query.whereNull('deletedAt')
  }
  @beforeFetch()
  public static async ignoreDeletedFetch(query: ModelQueryBuilderContract<typeof Classes>) {
    query.whereNull('deletedAt')
  }

  public async delete() {
    this.deletedAt = DateTime.local()
    await this.save()
  }
  public static byUser = scope((query, schoolId: number) => {
    query.where('schoolId', schoolId)
  })

  @belongsTo(() => Schools, {
    localKey: 'schoolId',
    foreignKey: 'id',
  })
  public school: BelongsTo<typeof Schools>

  @hasOne(() => Courses, {
    localKey: 'courseId',
    foreignKey: 'id',
  })
  public course: HasOne<typeof Courses>

  @hasMany(() => ClassSemesters, {
    localKey: 'id',
    foreignKey: 'classId',
  })
  public semesters: HasMany<typeof ClassSemesters>
}
