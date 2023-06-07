import { DateTime } from 'luxon'
import type { HasOne } from '@ioc:Adonis/Lucid/Orm'
import {
  BaseModel,
  column,
  beforeFind,
  ModelQueryBuilderContract,
  beforeFetch,
  hasOne,
  beforeSave,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

import SchoolAddress from 'App/Models/SchoolAddress'

export default class Schools extends BaseModel {
  public static table = 'schools'
  @column({ isPrimary: true })
  public id: number

  @column({
    columnName: 'corporateName',
    serializeAs: null,
  })
  public corporateName: string

  @column({
    columnName: 'CNPJ',
  })
  public CNPJ: string

  @column({
    columnName: 'phoneNumber',
    serializeAs: null,
  })
  public phoneNumber: string

  @column()
  public email: string

  @column({
    serializeAs: null,
  })
  public password: string

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

  @hasOne(() => SchoolAddress, {
    localKey: 'id',
    foreignKey: 'idSchool',
  })
  public address: HasOne<typeof SchoolAddress>

  @beforeSave()
  public static async encryptPassword(school: Schools) {
    if (school.$dirty.password) {
      school.password = await Hash.make(school.password)
    }
  }

  @beforeFind()
  public static async ignoreDeletedFind(query: ModelQueryBuilderContract<typeof Schools>) {
    query.whereNull('deletedAt')
  }
  @beforeFetch()
  public static async ignoreDeletedFetch(query: ModelQueryBuilderContract<typeof Schools>) {
    query.whereNull('deletedAt')
  }

  public async delete() {
    this.deletedAt = DateTime.local()
    await this.save()
  }
}
