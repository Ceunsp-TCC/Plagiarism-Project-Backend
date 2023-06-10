import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'schools'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigInteger('userId').notNullable()
      table.string('CNPJ', 16).notNullable().unique()
      table.string('CEP', 50).notNullable()
      table.string('street', 255).notNullable()
      table.string('district', 150).notNullable()
      table.string('city', 100).notNullable()
      table.string('state', 5).notNullable()
      table.string('complement', 100).nullable()
      table.integer('number').nullable()
      table.enum('status', ['INREVIEW', 'CANCELED', 'COMPLETED']).defaultTo('INREVIEW')
      table.foreign('userId').references('users.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
// SET TIME ZONE 'America/Sao_Paulo'; comando para alterar timezone
