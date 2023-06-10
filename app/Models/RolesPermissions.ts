import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
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

  @belongsTo(() => Roles, {
    localKey: 'id',
    foreignKey: 'idRole',
  })
  public roles: BelongsTo<typeof Roles>

  @belongsTo(() => Permissions, {
    localKey: 'id',
    foreignKey: 'idPermission',
  })
  public permissions: BelongsTo<typeof Permissions>
}
