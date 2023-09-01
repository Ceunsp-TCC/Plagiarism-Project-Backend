import Classes from 'App/Models/Classes'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Classes, async ({ faker }) => {
  return {
    name: faker.company.name(),
  }
}).build()
