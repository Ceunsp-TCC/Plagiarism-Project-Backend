import { test } from '@japa/runner'
import OrtographyReportFactory from 'Database/factories/OrtographyReportFactory'
import { basicCredentials, mockStudentCredentials } from '../../../helpers'

const url = '/v1/ortography-corrections/get-all'
const urlLogin = '/v1/auth/login'

test.group('Get all corrections - POSITIVE', () => {
  test('Should be get all corrections ', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockStudentCredentials)
    await OrtographyReportFactory.merge({
      requesterId: login.response.body.content.user.id,
    }).create()

    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(200)
  })

  test('Should be choice numberlines per page', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockStudentCredentials)

    const sut = await client
      .get(url)
      .qs({ numberlinesPerPage: 10 })
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertBodyContains({
      content: {
        registersPerPage: 10,
      },
    })
  })
})
