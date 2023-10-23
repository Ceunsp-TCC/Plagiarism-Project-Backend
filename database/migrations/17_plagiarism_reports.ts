import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'plagiarismReports'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('requesterId')
      table
        .integer('academicPaperId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('academicPapers')
        .onDelete('CASCADE')
      table.bigInteger('externalId')
      table.decimal('plagiarism', 10, 2).nullable()
      table.decimal('originality', 10, 2).nullable()
      table.json('sources').nullable()
      table.json('webhookJson').nullable()
      table.timestamp('createdAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('updatedAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('deletedAt', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
