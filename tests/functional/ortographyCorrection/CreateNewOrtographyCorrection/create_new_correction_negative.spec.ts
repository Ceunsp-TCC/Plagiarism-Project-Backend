import { test } from '@japa/runner'
import {
  basicCredentials,
  mockStudentCredentials,
  mockAdminCredentials,
  detectLanguageMockInvalid,
} from '../../../helpers'
import { file } from '@ioc:Adonis/Core/Helpers'
import OrtographyReportFactory from 'Database/factories/OrtographyReportFactory'
import Drive from '@ioc:Adonis/Core/Drive'

const url = '/v1/ortography-corrections/create'
const urlLogin = '/v1/auth/login'

test.group('Create new correction - NEGATIVE', () => {
  test('Should be find with same identifier', async ({ client }) => {
    await Drive.fake()
    const fakeOriginal = await file.generatePdf('1mb')
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockStudentCredentials)

    await OrtographyReportFactory.merge({
      requesterId: login.response.body.content.user.id,
    }).create()

    const sut = await client
      .post(url)
      .bearerToken(login.response.body.content.accessToken.token)
      .file('original', fakeOriginal.contents, { filename: fakeOriginal.name })
      .fields({
        userProvidedIdentifier: 'test',
      })

    sut.assertStatus(400)
  })

  test('Should be language invalid', async ({ client }) => {
    detectLanguageMockInvalid()
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
        userProvidedIdentifier: 'ortografia3',
      })

    sut.assertStatus(400)
  })
  test('Should be is empty fields', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockStudentCredentials)

    const sut = await client.post(url).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(422)
  })
  test('Should be original extension is invalid', async ({ client }) => {
    await Drive.fake()
    const fakeOriginal = await file.generateJpg('1mb')

    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockStudentCredentials)

    const sut = await client
      .post(url)
      .bearerToken(login.response.body.content.accessToken.token)
      .file('original', fakeOriginal.contents, { filename: fakeOriginal.name })
      .fields({
        userProvidedIdentifier: 'test',
      })

    sut.assertStatus(422)
  })
  test('Should be original size is more than 1mb', async ({ client }) => {
    await Drive.fake()
    const fakeOriginal = await file.generatePdf('2mb')
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockStudentCredentials)

    const sut = await client
      .post(url)
      .bearerToken(login.response.body.content.accessToken.token)
      .file('original', fakeOriginal.contents, { filename: fakeOriginal.name })
      .fields({
        userProvidedIdentifier: 'test',
      })

    sut.assertStatus(422)
  })
  test('Should be resource is denied access', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockAdminCredentials)

    const sut = await client.post(url).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(403)
  })
})
