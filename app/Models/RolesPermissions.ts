import { BaseModel, column, BelongsTo, belongsTo, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Roles from './Roles'
import Permissions from './Permissions'

export default class RolesPermissions extends BaseModel {
  public static table = 'rolesPermissions'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'idRole' })
  public idRole: number

  @column({ columnName: 'idPermission' })
  public idPermission: number

  @hasOne(() => Roles, {
    localKey: 'idRole',
    foreignKey: 'id',
  })
  public roles: HasOne<typeof Roles>

  @belongsTo(() => Permissions, {
    localKey: 'id',
    foreignKey: 'idPermission',
  })
  public permissions: BelongsTo<typeof Permissions>
}
