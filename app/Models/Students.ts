import { BaseModel, column, belongsTo, BelongsTo, scope } from '@ioc:Adonis/Lucid/Orm'
import Users from 'App/Models/Users'
import Schools from 'App/Models/Schools'
import Classes from 'App/Models/Classes'
export default class Students extends BaseModel {
  public static table = 'students'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'userId', serializeAs: null })
  public userId: number

  @column({ columnName: 'schoolId', serializeAs: null })
  public schoolId: number

  @column({ columnName: 'classId', serializeAs: null })
  public classId: number

  @column({
    columnName: 'CPF',
  })
  public CPF: string

  @column({
    columnName: 'randomPassword',
    serializeAs: 'randomPassword',
  })
  public randomPassword: boolean

  @column()
  public status: 'ACTIVE' | 'INACTIVE'

  @belongsTo(() => Users, {
    localKey: 'id',
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof Users>

  @belongsTo(() => Schools, {
    localKey: 'schoolId',
    foreignKey: 'userId',
  })
  public school: BelongsTo<typeof Schools>

  @belongsTo(() => Classes, {
    localKey: 'classId',
    foreignKey: 'id',
  })
  public class: BelongsTo<typeof Classes>

  public static byUser = scope((query, schoolId: number) => {
    query.where('schoolId', schoolId)
  })
}
