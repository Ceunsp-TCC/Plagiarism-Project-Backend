import { test } from '@japa/runner'
import { basicCredentials, mockStudentCredentials, detectLanguageMockValid } from '../../../helpers'
import { file } from '@ioc:Adonis/Core/Helpers'
import Drive from '@ioc:Adonis/Core/Drive'

const url = '/v1/ortography-corrections/create'
const urlLogin = '/v1/auth/login'

test.group('Create new correction - POSITIVE', () => {
  test('Should be create new correction', async ({ client }) => {
    detectLanguageMockValid()
    await Drive.fake()
    const fakeOriginal = await file.generatePdf('1mb')

    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockStudentCredentials)

    const sut = await client
      .post(url)
      .bearerToken(login.response.body.content.accessToken.token)
      .file('original', fakeOriginal.contents, { filename: fakeOriginal.name })
      .fields({
        userProvidedIdentifier: 'ortografia1',
      })

    sut.assertStatus(201)
    sut.assertBodyContains({
      statusCode: 201,
      message: 'Your file has been submitted for spelling correction',
    })
  })
})
