import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import SchoolFactory from 'Database/factories/SchoolFactory'
import Env from '@ioc:Adonis/Core/Env'

const url = '/v1/auth/logout'
const urlLogin = '/v1/auth/login'
const urlMe = '/v1/auth/me'

test.group('Logout', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be is logout user', async ({ client }) => {
    const school = await SchoolFactory.create()
    await school.merge({ password: 'Alpha@12', status: 'COMPLETED' }).save()

    const login = await client
      .post(urlLogin)
      .basicAuth(
        Env.get('PLAGIARISM_PLATFORM_AUTHENTICATOR_USERNAME'),
        Env.get('PLAGIARISM_PLATFORM_AUTHENTICATOR_PASSWORD')
      )
      .json({
        email: school.email,
        password: 'Alpha@12',
        deviceName: 'browser',
      })

    const sut = await client.post(url).bearerToken(login.response.body.content.accessToken.token)
    sut.assertStatus(200)
    sut.assertBodyContains({ message: 'User successfully logged out' })
  })
  test('Should be verify is token turn invalid', async ({ client }) => {
    const school = await SchoolFactory.create()
    await school.merge({ password: 'Alpha@12', status: 'COMPLETED' }).save()

    const login = await client
      .post(urlLogin)
      .basicAuth(
        Env.get('PLAGIARISM_PLATFORM_AUTHENTICATOR_USERNAME'),
        Env.get('PLAGIARISM_PLATFORM_AUTHENTICATOR_PASSWORD')
      )
      .json({
        email: school.email,
        password: 'Alpha@12',
        deviceName: 'browser',
      })

    await client.post(url).bearerToken(login.response.body.content.accessToken.token)
    const sut = await client.get(urlMe).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(401)
    sut.assertBodyContains({ message: 'Unauthorized' })
  })
})
