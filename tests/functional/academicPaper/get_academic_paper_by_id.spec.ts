import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { basicCredentials, mockTeacherCredentials, mockAdminCredentials } from '../../helpers'
import AcademicPaperFactory from 'Database/factories/AcademicPaperFactory'
import ActivityFactory from 'Database/factories/ActivityFactory'

const url = '/v1/academic-paper/get-by-id'
const urlLogin = '/v1/auth/login'

test.group('Get all academic papers by activity', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be get academic paper', async ({ client }) => {
    const activity = await ActivityFactory.create()
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockTeacherCredentials)

    const academicPaper = await AcademicPaperFactory.merge({ activityId: activity.id }).create()

    const sut = await client
      .get(`${url}/${academicPaper.id}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(200)
  })
  test('Should be not found get academic paper', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockTeacherCredentials)

    const sut = await client
      .get(`${url}/2`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(404)
  })

  test('Should be resource is denied access', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockAdminCredentials)

    const activityId = 1
    const sut = await client
      .get(`${url}/${activityId}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(403)
  })
})
