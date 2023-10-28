import { test } from '@japa/runner'
import Env from '@ioc:Adonis/Core/Env'

const url = '/v1/schools/update-status'
test.group('Update status school', () => {
  test('Should update status School', async ({ client }) => {
    const sut = await client
      .put(`${url}/${2}`)
      .basicAuth(
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD')
      )
      .json({
        status: 'COMPLETED',
      })

    sut.assertStatus(200)
    sut.assertBody({
      statusCode: 200,
      message: 'School status updated',
    })
  })
  test('Should not found school', async ({ client }) => {
    const sut = await client
      .put(`${url}/${200}`)
      .basicAuth(
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD')
      )
      .json({
        status: 'COMPLETED',
      })
    sut.assertStatus(404)
    sut.assertBody({
      statusCode: 404,
      message: 'School not found',
    })
  })
  test('Should be status is empty', async ({ client }) => {
    const sut = await client
      .put(`${url}/${200}`)
      .basicAuth(
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD')
      )

    sut.assertStatus(422)
  })
  test('Should be wrong status', async ({ client }) => {
    const sut = await client
      .put(`${url}/${200}`)
      .basicAuth(
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD')
      )
      .json({
        status: 'WRONG',
      })

    sut.assertStatus(422)
  })
})
