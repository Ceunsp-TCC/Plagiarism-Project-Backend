import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import {
  basicCredentials,
  mockSchoolCredentials,
  mockAdminCredentials,
  mockSchoolEmptyClassesCredentials,
} from '../../helpers'

const url = '/v1/classes/get-students'
const urlLogin = '/v1/auth/login'

test.group('Get students by class', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be get students by class', async ({ client, assert }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .get(`${url}/300`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(200)
    assert.equal(sut.response.body.content.totalRegisters, 2)
  })

  test('Should be not found students in class', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolEmptyClassesCredentials)

    const sut = await client
      .get(`${url}/4`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(404)
  })

  test('Should be choice numberlines per page', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .get(`${url}/300`)
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
    const sut = await client
      .get(`${url}/1`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(403)
  })
})
