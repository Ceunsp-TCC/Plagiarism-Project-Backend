import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rolesPermissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('idRole').notNullable()
      table.bigInteger('idPermission').notNullable()
      table.foreign('idRole').references('roles.id').onDelete('CASCADE')
      table.foreign('idPermission').references('permissions.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
