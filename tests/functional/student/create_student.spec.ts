import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { faker } from '@faker-js/faker'
import {
  basicCredentials,
  mockSchoolCredentials,
  mockAdminCredentials,
  mockStudentObject,
} from '../../helpers'

const url = '/v1/students/create'
const urlLogin = '/v1/auth/login'

test.group('Create student', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should create student success', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)
    const sut = await client
      .post(url)
      .bearerToken(login.response.body.content.accessToken.token)
      .json(mockStudentObject)

    sut.assertStatus(201)
    sut.assertBodyContains({
      statusCode: 201,
      message: 'Student created successfully',
    })
  })
  test('Should fields empty', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)
    const sut = await client.post(url).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(422)
  })
  test('Should be unathorized', async ({ client }) => {
    const sut = await client.post(url)

    sut.assertStatus(401)
  })
  test('Should be resource denied ', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockAdminCredentials)
    const sut = await client
      .post(url)
      .bearerToken(login.response.body.content.accessToken.token)
      .json(mockStudentObject)

    sut.assertStatus(403)
  })

  test('Should be email already exists', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .post(url)
      .bearerToken(login.response.body.content.accessToken.token)
      .json({
        name: faker.company.name(),
        email: 'schoolCompleted@gmail.com',
        password: 'Alpha@12',
        confirmPassword: 'Alpha@12',
        phoneNumber: faker.phone.number('119########'),
        CPF: faker.string.numeric(14),
      })

    sut.assertStatus(422)
  })
})
