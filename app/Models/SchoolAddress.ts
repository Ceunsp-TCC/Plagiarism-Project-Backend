import type {BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import {BaseModel, column, belongsTo} from '@ioc:Adonis/Lucid/Orm'
import Schools from 'App/Models/Schools'

export default class SchoolAddress extends BaseModel {
  public static table = 'schoolAddress'
  public static primaryKey = ''

  @column({columnName: 'idSchool'})
  public idSchool: number

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

  @belongsTo(() => Schools, {
    localKey: 'idSchool',
    foreignKey: 'id',
  })
  public school: BelongsTo<typeof Schools>
}
