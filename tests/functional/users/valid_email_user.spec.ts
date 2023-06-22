import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Env from '@ioc:Adonis/Core/Env'
import { faker } from '@faker-js/faker'

const url = '/v1/users/valid-email'
const mockEmail = faker.internet.email()
test.group('Valid email user', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be email is valid', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD')
      )
      .json({
        email: mockEmail,
      })

    sut.assertStatus(200)
    sut.assertBodyContains({ message: 'Email is valid' })
  })
  test('Should be email is invalid', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD')
      )
      .json({
        email: 'schoolCompleted@gmail.com',
      })

    sut.assertStatus(400)
    sut.assertBodyContains({ message: 'Email is invalid' })
  })
  test('Should be is empty field email', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD')
      )

    sut.assertStatus(422)
  })
})
