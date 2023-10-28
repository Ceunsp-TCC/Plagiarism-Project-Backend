import { test } from '@japa/runner'
import OrtographyReportFactory from 'Database/factories/OrtographyReportFactory'
import { basicCredentials, mockStudentCredentials } from '../../../helpers'

const url = '/v1/ortography-corrections/get-by-id'
const urlLogin = '/v1/auth/login'

test.group('Get correction by id - POSITIVE', () => {
  test('Should be get correction ', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockStudentCredentials)
    const ortographyCorrection = await OrtographyReportFactory.merge({
      requesterId: login.response.body.content.user.id,
    }).create()

    const sut = await client
      .get(`${url}/${ortographyCorrection.id}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(200)
  })
})
