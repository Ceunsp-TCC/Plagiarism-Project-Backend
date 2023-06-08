import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import SchoolFactory from 'Database/factories/SchoolFactory'

const url = '/v1/auth/me'
const urlLogin = '/v1/auth/login'

test.group('Me', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be is returned user informations', async ({ client }) => {
    const school = await SchoolFactory.create()
    await school.merge({ password: 'Alpha@12' }).save()

    const login = await client.post(urlLogin).json({
      email: school.email,
      password: 'Alpha@12',
      deviceName: 'browser',
    })

    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)
    sut.assertStatus(200)
    sut.assertBodyContains({ message: 'User information successfully returned' })
  })
  test('Should be is unathorized', async ({ client }) => {
    const sut = await client.get(url)

    sut.assertStatus(401)
    sut.assertBodyContains({ message: 'Unauthorized' })
  })
})
