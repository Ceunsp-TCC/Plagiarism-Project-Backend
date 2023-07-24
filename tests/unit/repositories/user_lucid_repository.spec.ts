import { test } from '@japa/runner'
import UserLucidRepository from 'App/Repositories/UserRepository/UserLucidRepository'
import Database from '@ioc:Adonis/Lucid/Database'
import sinon from 'sinon'
import { faker } from '@faker-js/faker'
import Users from 'App/Models/Users'
import Schools from 'App/Models/Schools'
import Teachers from 'App/Models/Teachers'
import Students from 'App/Models/Students'
import RoleFactory from 'Database/factories/RoleFactory'

test.group('User Lucid repository', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be create a scholl', async ({ assert }) => {
    const mockModel = sinon.createStubInstance(Users) as unknown as typeof Users

    const schoolReturn = new Schools()
    sinon.stub(UserLucidRepository.prototype, 'createSchool').resolves(schoolReturn)
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

    assert.equal(result, schoolReturn)
  })
  test('Should be create a  teacher', async ({ assert }) => {
    const mockModel = sinon.createStubInstance(Users) as unknown as typeof Users

    const teacherReturn = new Teachers()
    sinon.stub(UserLucidRepository.prototype, 'createTeacher').resolves(teacherReturn)
    const userRepository = new UserLucidRepository(mockModel)
    const role = await RoleFactory.create()

    const user = {
      name: faker.company.name(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number('119########'),
      password: faker.internet.password({
        length: 10,
      }),
      roleName: 'TEACHER',
      roleId: role.id!,
    }
    const teacher = {
      CPF: faker.string.numeric(14),
      CND: faker.string.numeric(14),
      schoolId: 1,
    }

    const result = await userRepository.createTeacher(user, teacher)

    assert.equal(result, teacherReturn)
  })
  test('Should be create a  student', async ({ assert }) => {
    const mockModel = sinon.createStubInstance(Users) as unknown as typeof Users

    const studentReturn = new Students()
    sinon.stub(UserLucidRepository.prototype, 'createStudent').resolves(studentReturn)
    const userRepository = new UserLucidRepository(mockModel)
    const role = await RoleFactory.create()

    const user = {
      name: faker.company.name(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number('119########'),
      password: faker.internet.password({
        length: 10,
      }),
      roleName: 'STUDENT',
      roleId: role.id!,
    }
    const student = {
      CPF: faker.string.numeric(14),
      schoolId: 1,
    }

    const result = await userRepository.createStudent(user, student)

    assert.equal(result, studentReturn)
  })

  test('Should be find user by email', async ({ assert }) => {
    const mockModel = sinon.createStubInstance(Users) as unknown as typeof Users

    const user = new Users()
    sinon.stub(UserLucidRepository.prototype, 'findByEmail').resolves(user)

    const userRepository = new UserLucidRepository(mockModel)

    const result = await userRepository.findByEmail('gmaciel@gmail.com')
    assert.equal(result, result)
  })
  test('Should be find school by cnpj', async ({ assert }) => {
    const mockModel = sinon.createStubInstance(Users) as unknown as typeof Users

    const user = new Users()
    sinon.stub(UserLucidRepository.prototype, 'findSchoolByCnpj').resolves(user)

    const userRepository = new UserLucidRepository(mockModel)

    const result = await userRepository.findSchoolByCnpj('22232323')
    assert.equal(result, result)
  })
  test('Should be find user by id', async ({ assert }) => {
    const mockModel = sinon.createStubInstance(Users) as unknown as typeof Users

    const user = new Users()
    sinon.stub(UserLucidRepository.prototype, 'findUserById').resolves(user)

    const userRepository = new UserLucidRepository(mockModel)

    const result = await userRepository.findUserById(1)
    assert.equal(result, result)
  })
  test('Should be update status schoool  by id', async ({ assert }) => {
    const mockModel = sinon.createStubInstance(Users) as unknown as typeof Users

    sinon.stub(UserLucidRepository.prototype, 'updateSchoolStatus').resolves(true)

    const userRepository = new UserLucidRepository(mockModel)

    const result = await userRepository.updateSchoolStatus('COMPLETED', 1)
    assert.equal(result, result)
  })
})
