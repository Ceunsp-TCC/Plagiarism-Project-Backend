import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { basicCredentials, mockTeacherCredentials, mockAdminCredentials } from '../../helpers'
import AcademicPaperFactory from 'Database/factories/AcademicPaperFactory'
import ActivityFactory from 'Database/factories/ActivityFactory'

const url = '/v1/academic-paper/plagiarism-analyse'
const urlLogin = '/v1/auth/login'

test.group('Send to  analyse', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Send to analyse with success', async ({ client }) => {
    const activity = await ActivityFactory.create()
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockTeacherCredentials)

    const academicPaper = await AcademicPaperFactory.merge({ activityId: activity.id }).create()

    const sut = await client
      .post(`${url}/${academicPaper.id}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(200)
  })

  test('Should be resource is denied access', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockAdminCredentials)

    const academicPaperId = 1
    const sut = await client
      .post(`${url}/${academicPaperId}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(403)
  })
})
