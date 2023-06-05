import Schools from 'App/Models/Schools'
import SchoolAddress from 'App/Models/SchoolAddress'
import Factory from '@ioc:Adonis/Lucid/Factory'

const SchoolAddressFactory = Factory.define(SchoolAddress, ({ faker }) => {
  return {
    street: faker.location.street(),
    city: faker.location.city(),
    state: faker.location.state(),
    CEP: faker.location.zipCode(),
    district: faker.location.country(),
    number: faker.number.int({ max: 10 }),
    complement: faker.location.secondaryAddress(),
  }
}).build()
export default Factory.define(Schools, ({ faker }) => {
  return {
    corporateName: faker.company.name(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    CNPJ: faker.string.numeric(14),
    phoneNumber: faker.phone.number('119########'),
  }
})
  .relation('address', () => SchoolAddressFactory)
  .build()
