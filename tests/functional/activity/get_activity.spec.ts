import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { basicCredentials, mockTeacherCredentials, mockAdminCredentials } from '../../helpers'
import ActivityFactory from 'Database/factories/ActivityFactory'

const url = '/v1/activities/get-by-id'
const urlLogin = '/v1/auth/login'

test.group('Get activitiy', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('Should be get activity', async ({ client }) => {
    const activity = await ActivityFactory.create()
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockTeacherCredentials)

    const sut = await client
      .get(`${url}/${activity.id}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(200)
  })
  test('Should be not found activity', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockTeacherCredentials)

    const sut = await client
      .get(`${url}/${2}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(404)
  })

  test('Should be resource is denied access', async ({ client }) => {
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
