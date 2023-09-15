import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { basicCredentials, mockSchoolCredentials, mockAdminCredentials } from '../../helpers'
import ClassFactory from 'Database/factories/ClassFactory'
import CourseFactory from 'Database/factories/CourseFactory'

const url = '/v1/classes/get-by-id'
const urlLogin = '/v1/auth/login'

test.group('Get class', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be get classe', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)
    const schoolId = login.response.body.content.user.schoolData.id
    const courseId = await (await CourseFactory.create()).id
    const classe = await ClassFactory.merge({ schoolId, courseId }).create()
    const sut = await client
      .get(`${url}/${classe.id}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(200)
  })
  test('Should be not found class', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .get(`${url}/5`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(404)
  })

  test('Should be resource denied', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockAdminCredentials)

    const sut = await client
      .get(`${url}/5`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(403)
  })
})
