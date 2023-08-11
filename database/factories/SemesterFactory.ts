import Semesters from 'App/Models/Semesters'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Semesters, ({ faker }) => {
  return {
    name: faker.person.firstName(),
    description: faker.person.lastName(),
  }
}).build()
