import Users from 'App/Models/Users'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Schools from 'App/Models/Schools'
import Roles from 'App/Models/Roles'

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
  .state('schoolCompleted', async (school) => {
    school.status = 'COMPLETED'
  })
  .build()

export default Factory.define(Users, ({ faker }) => {
  return {
    name: faker.company.name(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number('119########'),
    password: faker.internet.password({ length: 10 }),
  }
})
  .state('admin', async (user) => {
    const role = await Roles.query().select('id').where('name', 'ADMIN').first()
    user.roleName = 'ADMIN'
    user.roleId = role?.id!
  })
  .state('school', async (user) => {
    const role = await Roles.query().select('id').where('name', 'SCHOOL').first()
    user.roleName = 'SCHOOL'
    user.roleId = role?.id!
  })
  .state('defaultPassword', (user) => (user.password = 'Alpha@12'))
  .relation('school', () => SchoolFactory)
  .build()
