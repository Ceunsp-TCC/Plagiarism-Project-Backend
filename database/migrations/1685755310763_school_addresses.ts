import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'schoolAddress'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigInteger('idSchool').notNullable()
      table.foreign('idSchool').references('schools.id').onDelete('CASCADE')
      table.string('CEP', 50).notNullable()
      table.string('street', 255).notNullable()
      table.string('district', 150).notNullable()
      table.string('city', 100).notNullable()
      table.string('state', 5).notNullable()
      table.string('complement', 100).nullable()
      table.integer('number').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
