import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'classSemesters'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('classId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('classes')
        .onDelete('CASCADE')
      table.string('name', 150).notNullable()
      table.string('description', 255)
      table.timestamp('createdAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('updatedAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('deletedAt', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
