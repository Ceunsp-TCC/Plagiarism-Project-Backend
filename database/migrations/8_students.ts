import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigInteger('userId').notNullable()
      table.bigInteger('schoolId').notNullable()
      table.string('CPF', 20).notNullable()
      table.boolean('randomPassword').defaultTo(true)
      table.enum('status', ['ACTIVE', 'INACTIVE']).defaultTo('ACTIVE')
      table.foreign('schoolId').references('users.id').onDelete('CASCADE')
      table.foreign('userId').references('users.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
