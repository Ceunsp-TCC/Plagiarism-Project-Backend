import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'schools'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('corporateName', 150).notNullable()
      table.string('CNPJ', 16).notNullable().unique()
      table.string('phoneNumber', 15).notNullable()
      table.string('email', 150).notNullable().unique()
      table.string('password').notNullable()
      table.enum('status', ['INREVIEW', 'CANCELED', 'COMPLETED']).defaultTo('INREVIEW')
      table.timestamp('createdAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('updatedAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('deletedAt', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
// SET TIME ZONE 'America/Sao_Paulo'; comando para alterar timezone
