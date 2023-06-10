import { test } from '@japa/runner'
import UserLucidRepository from 'App/Repositories/UserRepository/UserLucidRepository'
import Database from '@ioc:Adonis/Lucid/Database'
import sinon from 'sinon'
import { faker } from '@faker-js/faker'
import Users from 'App/Models/Users'
import RoleFactory from 'Database/factories/RoleFactory'

test.group('User Lucid repository', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be create a scholl', async ({ assert }) => {
    const mockModel = sinon.createStubInstance(Users) as unknown as typeof Users
    sinon.stub(UserLucidRepository.prototype, 'createSchool').resolves(true)
    const schoolRepository = new UserLucidRepository(mockModel)
    const role = await RoleFactory.create()

    const user = {
      name: faker.company.name(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number('119########'),
      password: faker.internet.password({
        length: 10,
      }),
      roleName: 'SCHOOL',
      roleId: role.id!,
    }
    const school = {
      CNPJ: faker.string.numeric(14),
      CEP: faker.location.zipCode(),
      district: faker.location.country(),
      street: faker.location.street(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      complement: faker.location.secondaryAddress(),
      number: faker.number.int({
        max: 5,
      }),
    }

    const result = await schoolRepository.createSchool(user, school)

    assert.equal(result, true)
  })

  test('Should be find user by email', async ({ assert }) => {
    const mockModel = sinon.createStubInstance(Users) as unknown as typeof Users

    const user = new Users()
    sinon.stub(UserLucidRepository.prototype, 'findByEmail').resolves(user)

    const userRepository = new UserLucidRepository(mockModel)

    const result = await userRepository.findByEmail('gmaciel@gmail.com')
    assert.equal(result, result)
  })
})
