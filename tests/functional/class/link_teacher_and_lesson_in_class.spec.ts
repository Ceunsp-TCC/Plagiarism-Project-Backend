import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import CourseFactory from 'Database/factories/CourseFactory'
import { basicCredentials, mockSchoolCredentials, mockAdminCredentials } from '../../helpers'

const url = '/v1/classes/link-teacher-and-lesson'
const urlLogin = '/v1/auth/login'

test.group('Link teacher and lesson in class', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('Should be link teacher and lesson', async ({ client }) => {
    const course = await CourseFactory.create()
    const semester = await course.related('semesters').create({ name: 'test' })
    await semester.related('lessons').create({ name: 'test', place: 'campus test' })
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .put(url)
      .json({
        lessonId: 1,
        teacherId: 1,
      })
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(200)
  })
  test('Should be empty fields', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client.put(url).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(422)
  })
  test('Should be resource denied', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockAdminCredentials)

    const sut = await client.put(url).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(403)
  })
})
