import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'academicPapers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('activityId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('activities')
        .onDelete('CASCADE')
      table
        .integer('studentId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('students')
        .onDelete('CASCADE')
      table.string('paper').notNullable()
      table.string('comments', 255).nullable()
      table
        .enum('analysisStatus', ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'])
        .defaultTo('PENDING')
      table.timestamp('createdAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('updatedAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('deletedAt', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
