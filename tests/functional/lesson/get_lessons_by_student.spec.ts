import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import {
  basicCredentials,
  mockAdminCredentials,
  mockStudentCredentials,
  mockStudentEmptyLessonsCredentials,
} from '../../helpers'

const url = '/v1/lessons/get-lessons-by-student'
const urlLogin = '/v1/auth/login'

test.group('Get lessons by student', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be get lessons', async ({ client, assert }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockStudentCredentials)

    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(200)
    assert.equal(sut.response.body.content.totalRegisters, 1)
  })

  test('Should be not found lessons', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockStudentEmptyLessonsCredentials)

    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(404)
  })

  test('Should be choice numberlines per page', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockStudentCredentials)

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
