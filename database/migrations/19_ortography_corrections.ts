import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ortographyCorrections'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('requesterId').notNullable()
      table.string('userProvidedIdentifier').notNullable()
      table.string('original').notNullable()
      table.string('result').nullable()
      table.enum('status', ['PROCESSING', 'COMPLETED', 'FAILED']).defaultTo('PROCESSING')
      table.timestamp('createdAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('updatedAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('deletedAt', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
