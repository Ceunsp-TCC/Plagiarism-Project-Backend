import { test } from '@japa/runner'
import SchoolLucidRepository from 'App/Repositories/SchoolRepository/SchoolLucidRepository'
import Database from '@ioc:Adonis/Lucid/Database'
import sinon from 'sinon'
import { faker } from '@faker-js/faker'
import Schools from 'App/Models/Schools'

test.group('School lucid repository', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be create a scholl', async ({ assert }) => {
    const mockModel = sinon.createStubInstance(Schools) as unknown as typeof Schools
    sinon.stub(SchoolLucidRepository.prototype, 'create').resolves(true)
    const schoolRepository = new SchoolLucidRepository(mockModel)

    const school = {
      corporateName: faker.company.name(),
      email: faker.internet.email(),
      password: faker.internet.password({
        length: 10,
      }),
      CNPJ: faker.string.numeric(14),
      phoneNumber: faker.phone.number('119########'),
    }
    const schoolAddress = {
      street: faker.location.street(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      CEP: faker.location.zipCode(),
      district: faker.location.country(),
      number: faker.number.int({
        max: 5,
      }),
      complement: faker.location.secondaryAddress(),
    }
    assert.equal(await schoolRepository.create(school, schoolAddress), true)
  })

  test('Should be find school by email', async ({ assert }) => {
    const mockModel = sinon.createStubInstance(Schools) as unknown as typeof Schools
    const school = {
      id: 1,
      corporateName: faker.company.name(),
      email: faker.internet.email(),
      password: faker.internet.password({
        length: 10,
      }),
      CNPJ: faker.string.numeric(14),
      phoneNumber: faker.phone.number('119########'),
    }
    sinon.stub(SchoolLucidRepository.prototype, 'findByEmail').resolves(school as Schools)

    const schoolRepository = new SchoolLucidRepository(mockModel)

    assert.equal(await schoolRepository.findByEmail(school.email), school)
  })
})
