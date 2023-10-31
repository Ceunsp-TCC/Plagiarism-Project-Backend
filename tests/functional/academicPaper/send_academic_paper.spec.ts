import { test } from '@japa/runner'
import { basicCredentials, mockStudentCredentials, mockAdminCredentials } from '../../helpers'
import { file } from '@ioc:Adonis/Core/Helpers'
import ActivityFactory from 'Database/factories/ActivityFactory'
import Drive from '@ioc:Adonis/Core/Drive'

const url = '/v1/academic-paper/send'
const urlLogin = '/v1/auth/login'

test.group('Send academic paper', () => {
  test('Should be send academic paper', async ({ client }) => {
    await Drive.fake()
    const activity = await ActivityFactory.create()
    const fakePaper = await file.generatePdf('1mb')

    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockStudentCredentials)

    const sut = await client
      .post(`${url}/${activity.id}`)
      .bearerToken(login.response.body.content.accessToken.token)
      .file('paper', fakePaper.contents, { filename: fakePaper.name })
      .fields({
        comments: 'test',
      })

    sut.assertStatus(201)
    sut.assertBodyContains({
      statusCode: 201,
      message: 'Academic paper saved',
    })
  })
  test('Should be not found activity', async ({ client }) => {
    await Drive.fake()
    const fakePaper = await file.generatePdf('1mb')

    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockStudentCredentials)

    const activityId = 200
    const sut = await client
      .post(`${url}/${activityId}`)
      .bearerToken(login.response.body.content.accessToken.token)
      .file('paper', fakePaper.contents, { filename: fakePaper.name })
      .fields({
        comments: 'test',
      })
    sut.assertStatus(404)
  })
  test('Should be is empty fields', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockStudentCredentials)

    const activityId = 1
    const sut = await client
      .post(`${url}/${activityId}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(422)
  })
  test('Should be paper extension is invalid', async ({ client }) => {
    await Drive.fake()
    const fakePaper = await file.generateJpg('1mb')

    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockStudentCredentials)

    const activityId = 1
    const sut = await client
      .post(`${url}/${activityId}`)
      .bearerToken(login.response.body.content.accessToken.token)
      .file('paper', fakePaper.contents, { filename: fakePaper.name })
      .fields({
        comments: 'test',
      })

    sut.assertStatus(422)
  })
  test('Should be paper size is more than 1mb', async ({ client }) => {
    await Drive.fake()
    const fakePaper = await file.generatePdf('2mb')
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockStudentCredentials)

    const activityId = 1
    const sut = await client
      .post(`${url}/${activityId}`)
      .bearerToken(login.response.body.content.accessToken.token)
      .file('paper', fakePaper.contents, { filename: fakePaper.name })
      .fields({
        comments: 'test',
      })

    sut.assertStatus(422)
  })
  test('Should be resource is denied access', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockAdminCredentials)

    const activityId = 1
    const sut = await client
      .post(`${url}/${activityId}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(403)
  })
})
