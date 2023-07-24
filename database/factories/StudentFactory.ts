import Students from 'App/Models/Students'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Students, ({ faker }) => {
  return {
    CPF: faker.string.numeric(14),
  }
}).build()
