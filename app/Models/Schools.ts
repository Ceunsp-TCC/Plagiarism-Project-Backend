import { BaseModel, column, belongsTo, BelongsTo, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Users from 'App/Models/Users'
import Teachers from 'App/Models/Teachers'
import Students from 'App/Models/Students'
export default class Schools extends BaseModel {
  public static table = 'schools'
  public static primaryKey = ''

  @column({ columnName: 'userId', serializeAs: null })
  public userId: number

  @column({
    columnName: 'CNPJ',
  })
  public CNPJ: string

  @column({
    columnName: 'CEP',
  })
  public CEP: string

  @column()
  public street: string

  @column()
  public district: string

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public complement: string

  @column()
  public number: number

  @column()
  public status: 'INREVIEW' | 'CANCELED' | 'COMPLETED'

  @hasMany(() => Teachers, {
    localKey: 'userId',
    foreignKey: 'schoolId',
  })
  public teachers: HasMany<typeof Teachers>

  @hasMany(() => Students, {
    localKey: 'userId',
    foreignKey: 'schoolId',
  })
  public students: HasMany<typeof Students>

  @belongsTo(() => Users, {
    localKey: 'userId',
    foreignKey: 'id',
  })
  public user: BelongsTo<typeof Users>
}
