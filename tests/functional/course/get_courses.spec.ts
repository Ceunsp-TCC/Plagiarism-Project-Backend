import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import CourseFactory from 'Database/factories/CourseFactory'
import { basicCredentials, mockSchoolCredentials, mockAdminCredentials } from '../../helpers'

const url = '/v1/courses/get-all'
const urlLogin = '/v1/auth/login'
test.group('Get courses', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('Should be get courses', async ({ client, assert }) => {
    await CourseFactory.createMany(5)
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(200)
    assert.equal(sut.response.body.content.totalRegisters, 5)
  })
  test('Should be not found course', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(404)
  })
  test('Should be choice numberlines per page', async ({ client }) => {
    await CourseFactory.createMany(3)
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)
    const sut = await client
      .get(url)
      .qs({ numberlinesPerPage: 10 })
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertBodyContains({
      content: {
        registersPerPage: 10,
      },
    })
  })
  test('Should be resource denied', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockAdminCredentials)
    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(403)
  })
})
