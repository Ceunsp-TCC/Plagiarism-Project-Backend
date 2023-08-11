import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'lessons'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('semesterId').notNullable()
      table.string('name', 150).notNullable()
      table.string('description', 255)
      table.string('local').notNullable()
      table.timestamp('createdAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('updatedAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('deletedAt', { useTz: true }).nullable()
      table.foreign('semesterId').references('semesters.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
