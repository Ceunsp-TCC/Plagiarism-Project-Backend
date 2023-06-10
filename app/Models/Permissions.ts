import { DateTime } from 'luxon'
import RolesPermissions from './RolesPermissions'
import {
  BaseModel,
  column,
  beforeFind,
  beforeFetch,
  ModelQueryBuilderContract,
  beforeSave,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'

export default class Permissions extends BaseModel {
  @column({ isPrimary: true })
  public id: number

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

  @hasMany(() => RolesPermissions, {
    localKey: 'id',
    foreignKey: 'idPermisssion',
  })
  public rolePermissions: HasMany<typeof RolesPermissions>

  @beforeFind()
  public static async ignoreDeletedFind(query: ModelQueryBuilderContract<typeof Permissions>) {
    query.whereNull('deletedAt')
  }
  @beforeFetch()
  public static async ignoreDeletedFetch(query: ModelQueryBuilderContract<typeof Permissions>) {
    query.whereNull('deletedAt')
  }

  public async delete() {
    this.deletedAt = DateTime.local()
    await this.save()
  }
  @beforeSave()
  public static async uppercaseName(permissions: Permissions) {
    if (permissions.$dirty.name) {
      permissions.name = permissions.name.toUpperCase()
    }
  }
}
