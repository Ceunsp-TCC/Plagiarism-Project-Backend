import Users from 'App/Models/Users'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Schools from 'App/Models/Schools'
import TeacherFactory from 'database/factories/TeacherFactory'

//@ts-ignore
const SchoolFactory = Factory.define(Schools, ({ faker }) => {
  return {
    CNPJ: faker.string.numeric(14),
    street: faker.location.street(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    CEP: faker.location.zipCode(),
    district: faker.location.country(),
    number: faker.number.int({ max: 10 }),
    complement: faker.location.secondaryAddress(),
    status: 'INREVIEW',
  }
})
  .relation('teachers', () => TeacherFactory)
  .build()

export default Factory.define(Users, ({ faker }) => {
  return {
    name: faker.company.name(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number('119########'),
    password: faker.internet.password({ length: 10 }),
  }
})
  .relation('school', () => SchoolFactory)
  .relation('teacher', () => TeacherFactory)
  .build()
