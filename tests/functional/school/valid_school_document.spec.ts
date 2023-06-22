import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Env from '@ioc:Adonis/Core/Env'
import { faker } from '@faker-js/faker'

const url = '/v1/schools/valid-document'
const mockDocument = faker.string.numeric(14)
test.group('Valid school document', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be document is valid', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD')
      )
      .json({
        document: mockDocument,
      })

    sut.assertStatus(200)
    sut.assertBodyContains({ message: 'Document is valid' })
  })
  test('Should be document is invalid', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD')
      )
      .json({
        document: '22232323',
      })

    sut.assertStatus(400)
    sut.assertBodyContains({ message: 'Document is invalid' })
  })
  test('Should be is empty field document', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD')
      )

    sut.assertStatus(422)
  })
})
