import { test } from '@japa/runner'
import { basicCredentials, mockTeacherCredentials, mockAdminCredentials } from '../../helpers'
import ActivityFactory from 'Database/factories/ActivityFactory'
import AcademicPaperFactory from 'Database/factories/AcademicPaperFactory'

const url = '/v1/academic-paper/send-note'
const urlLogin = '/v1/auth/login'

test.group('Send note', () => {
  test('Should be send note', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockTeacherCredentials)

    const activity = await ActivityFactory.create()
    const academicPaper = await AcademicPaperFactory.merge({ activityId: activity.id }).create()

    const sut = await client
      .put(`${url}/${academicPaper.id}`)
      .bearerToken(login.response.body.content.accessToken.token)
      .json({ note: 10 })

    sut.assertStatus(200)
    sut.assertBodyContains({
      statusCode: 200,
      message: 'Note sent successfully',
    })
  })
  test('Should be not found academic paper', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockTeacherCredentials)

    const academicPaperId = 200
    const sut = await client
      .put(`${url}/${academicPaperId}`)
      .bearerToken(login.response.body.content.accessToken.token)
      .json({ note: 10 })

    sut.assertStatus(404)
  })
  test('Should be is empty fields', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockTeacherCredentials)

    const academicPaperId = 200
    const sut = await client
      .put(`${url}/${academicPaperId}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(422)
  })

  test('Should be resource is denied access', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockAdminCredentials)

    const academicPaperId = 1
    const sut = await client
      .put(`${url}/${academicPaperId}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(403)
  })
})
