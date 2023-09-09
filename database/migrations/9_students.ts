import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('userId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .integer('schoolId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('schools')
        .onDelete('CASCADE')
      table
        .integer('classId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('classes')
        .onDelete('CASCADE')
      table.string('CPF', 20).notNullable()
      table.boolean('randomPassword').defaultTo(true)
      table.enum('status', ['ACTIVE', 'INACTIVE']).defaultTo('ACTIVE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
