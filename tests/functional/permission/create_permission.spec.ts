import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import PermissionFactory from 'Database/factories/PermissionFactory'
import Env from '@ioc:Adonis/Core/Env'
import { faker } from '@faker-js/faker'

const url = '/v1/permissions/create'
const urlLogin = '/v1/auth/login'
test.group('Create permissions', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be create a permission', async ({ client }) => {
    const user = await UserFactory.apply('admin').apply('defaultPassword').create()

    const login = await client
      .post(urlLogin)
      .basicAuth(
        Env.get('PLAGIARISM_PLATFORM_AUTHENTICATOR_USERNAME'),
        Env.get('PLAGIARISM_PLATFORM_AUTHENTICATOR_PASSWORD')
      )
      .json({
        email: user.email,
        password: 'Alpha@12',
        deviceName: 'browser',
      })
    const sut = await client
      .post(url)
      .bearerToken(login.response.body.content.accessToken.token)
      .json({
        name: faker.person.middleName(),
      })

    sut.assertStatus(201)
    sut.assertBodyContains({ message: 'Permission created successfully' })
  })

  test('Should be already exists name permission', async ({ client }) => {
    const user = await UserFactory.apply('admin').apply('defaultPassword').create()

    const login = await client
      .post(urlLogin)
      .basicAuth(
        Env.get('PLAGIARISM_PLATFORM_AUTHENTICATOR_USERNAME'),
        Env.get('PLAGIARISM_PLATFORM_AUTHENTICATOR_PASSWORD')
      )
      .json({
        email: user.email,
        password: 'Alpha@12',
        deviceName: 'browser',
      })
    const permission = await PermissionFactory.create()
    const sut = await client
      .post(url)
      .bearerToken(login.response.body.content.accessToken.token)
      .json({
        name: permission.name,
      })

    sut.assertStatus(422)
    sut.assertBody({ name: ['unique validation failure'] })
  })
})
