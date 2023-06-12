import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Users from 'App/Models/Users'
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

  @belongsTo(() => Users, {
    localKey: 'userId',
    foreignKey: 'id',
  })
  public user: BelongsTo<typeof Users>
}
