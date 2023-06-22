import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Env from '@ioc:Adonis/Core/Env'

const url = '/v1/auth/me'
const urlLogin = '/v1/auth/login'

test.group('Me', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be is returned user school informations', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD')
      )
      .json({
        email: 'schoolCompleted@gmail.com',
        password: 'schoolCompleted@school',
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
    const login = await client
      .post(urlLogin)
      .basicAuth(
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD')
      )
      .json({
        email: 'admin@gmail.com',
        password: 'Admin@12',
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
