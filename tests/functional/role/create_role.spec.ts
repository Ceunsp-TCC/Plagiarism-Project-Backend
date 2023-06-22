import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import RoleFactory from 'Database/factories/RoleFactory'
import Env from '@ioc:Adonis/Core/Env'
import { faker } from '@faker-js/faker'

const url = '/v1/roles/create'
const urlLogin = '/v1/auth/login'
test.group('Create roles', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be create a role', async ({ client }) => {
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
    const sut = await client
      .post(url)
      .bearerToken(login.response.body.content.accessToken.token)
      .json({
        name: faker.person.middleName(),
      })

    sut.assertStatus(201)
    sut.assertBodyContains({ message: 'Role created successfully' })
  })
  test('Should be a unathorized action', async ({ client }) => {
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
    const sut = await client
      .post(url)
      .bearerToken(login.response.body.content.accessToken.token)
      .json({
        name: faker.person.middleName(),
      })

    sut.assertStatus(403)
    sut.assertBodyContains({ message: 'Access to this resource is denied' })
  })

  test('Should be already exists name role', async ({ client }) => {
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

    const role = await RoleFactory.create()
    const sut = await client
      .post(url)
      .bearerToken(login.response.body.content.accessToken.token)
      .json({
        name: role.name,
      })

    sut.assertStatus(422)
    sut.assertBody({ name: ['unique validation failure'] })
  })
})
