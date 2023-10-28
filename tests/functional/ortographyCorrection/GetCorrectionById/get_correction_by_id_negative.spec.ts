import { test } from '@japa/runner'
import { basicCredentials, mockStudentCredentials, mockAdminCredentials } from '../../../helpers'

const url = '/v1/ortography-corrections/get-by-id'
const urlLogin = '/v1/auth/login'

test.group('Get correction by id - NEGATIVE', () => {
  test('Should be not found', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockStudentCredentials)

    const sut = await client
      .get(`${url}/10`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(404)
  })

  test('Should be resource denied', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockAdminCredentials)

    const sut = await client
      .get(`${url}/10`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(403)
  })
})
