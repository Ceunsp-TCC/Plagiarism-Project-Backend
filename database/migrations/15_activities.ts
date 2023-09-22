import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'activities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('lessonId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('classSemestersLessons')
        .onDelete('CASCADE')
      table.string('title', 150).notNullable()
      table.string('comments', 255).nullable()
      table.enum('type', ['NOTICE', 'ACADEMICPAPER']).defaultTo('NOTICE')
      table.timestamp('createdAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('updatedAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('deletedAt', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
