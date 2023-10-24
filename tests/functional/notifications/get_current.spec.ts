import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import NotificationFactory from 'Database/factories/NotificationFactory'
import { basicCredentials, mockTeacherCredentials } from '../../helpers'

const url = '/v1/notifications/get-current'
const urlLogin = '/v1/auth/login'

test.group('Get current notification', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Found notification', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockTeacherCredentials)
    const receiverId = login.response.body.content.user.id

    await NotificationFactory.merge({ receiverId }).create()
    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(200)
  })

  test('Not Found notification', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockTeacherCredentials)

    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(404)
  })
})
