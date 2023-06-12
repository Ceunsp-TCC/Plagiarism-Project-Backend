import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import Env from '@ioc:Adonis/Core/Env'

const url = '/v1/auth/me'
const urlLogin = '/v1/auth/login'

test.group('Me', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be is returned user school informations', async ({ client }) => {
    const user = await UserFactory.with('school', 1, (school) => school.apply('schoolCompleted'))
      .apply('school')
      .apply('defaultPassword')
      .create()

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

    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)
    sut.assertStatus(200)
    sut.assertBodyContains({ message: 'User information successfully returned' })
    sut.assertBodyContains({
      content: {
        permissions: [],
      },
    })
    sut.assertBodyContains({
      content: {
        roleName: 'SCHOOL',
      },
    })
  })
  test('Should be is returned user admin informations', async ({ client }) => {
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

    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)
    sut.assertStatus(200)
    sut.assertBodyContains({ message: 'User information successfully returned' })
    sut.assertBodyContains({
      content: {
        permissions: [
          'createPermission',
          'deletePermission',
          'updatePermission',
          'viewPermission',
          'createRole',
          'updateRole',
          'viewRole',
          'deleteRole',
          'syncRolesPermissions',
        ],
      },
    })
    sut.assertBodyContains({
      content: {
        roleName: 'ADMIN',
      },
    })
  })
  test('Should be is unathorized', async ({ client }) => {
    const sut = await client.get(url)

    sut.assertStatus(401)
    sut.assertBodyContains({ message: 'Unauthorized' })
  })
})
