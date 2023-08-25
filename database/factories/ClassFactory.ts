import Classes from 'App/Models/Classes'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Classes, ({ faker }) => {
  return {
    name: faker.person.fullName(),
  }
}).build()
