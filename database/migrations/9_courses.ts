import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'courses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('schoolId').notNullable()
      table.string('name', 150).unique().notNullable()
      table.string('description', 255)
      table.enum('modality', ['HYBRID', 'INPERSON', 'ONLINE']).defaultTo('HYBRID')
      table.string('category').notNullable()
      table.float('price').notNullable()
      table.string('image').notNullable()
      table.timestamp('createdAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('updatedAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('deletedAt', { useTz: true }).nullable()
      table.foreign('schoolId').references('users.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
