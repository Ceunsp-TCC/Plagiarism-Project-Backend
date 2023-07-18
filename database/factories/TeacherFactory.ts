import Teachers from 'App/Models/Teachers'

import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Teachers, ({ faker }) => {
  return {
    CPF: faker.string.numeric(14),
    CND: faker.string.numeric(14),
  }
}).build()
