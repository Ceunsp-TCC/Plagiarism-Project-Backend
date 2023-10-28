import { test } from '@japa/runner'
import {
  basicCredentials,
  mockStudentEmptyOrtographyCorrectionsCredentials,
  mockAdminCredentials,
} from '../../../helpers'

const url = '/v1/ortography-corrections/get-all'
const urlLogin = '/v1/auth/login'

test.group('Get all corrections - NEGATIVE', () => {
  test('Should be not found corrections ', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockStudentEmptyOrtographyCorrectionsCredentials)

    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(404)
  })

  test('Should be resource denied ', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockAdminCredentials)

    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(403)
  })
})
