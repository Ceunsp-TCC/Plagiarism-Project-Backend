import Lessons from 'App/Models/Lessons'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Lessons, ({ faker }) => {
  return {
    name: faker.person.bio(),
    description: faker.person.bio(),
    local: faker.string.uuid(),
  }
}).build()
