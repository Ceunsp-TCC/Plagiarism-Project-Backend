import { DateTime } from 'luxon'
import { BaseModel, column, beforeFind, beforeFetch } from '@ioc:Adonis/Lucid/Orm'
import type { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

export interface NotificationData {
  navigateTo: string
}

export default class Notifications extends BaseModel {
  public static table = 'notifications'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'receiverId', serializeAs: null })
  public receiverId: number

  @column()
  public message: string

  @column({ columnName: 'isRead', serializeAs: null })
  public isRead: boolean

  @column({ prepare: (value) => JSON.stringify(value) })
  public data: NotificationData

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
  public static async ignoreDeletedFind(query: ModelQueryBuilderContract<typeof Notifications>) {
    query.whereNull('deletedAt')
  }
  @beforeFetch()
  public static async ignoreDeletedFetch(query: ModelQueryBuilderContract<typeof Notifications>) {
    query.whereNull('deletedAt')
  }

  public async delete() {
    this.deletedAt = DateTime.local()
    await this.save()
  }
}
