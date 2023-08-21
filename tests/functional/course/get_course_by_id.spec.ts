import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { basicCredentials, mockSchoolCredentials, mockAdminCredentials } from '../../helpers'
import CourseFactory from 'Database/factories/CourseFactory'

const url = '/v1/courses/get-by-id/'
const urlLogin = '/v1/auth/login'

test.group('Get course by id', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be get course', async ({ client }) => {
    const course = await CourseFactory.create()
    const semester = await course.related('semesters').create({ name: 'semester' })
    await semester.related('lessons').create({ name: 'lesson', place: 'local' })

    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .get(`${url}${course.id}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(200)
    sut.assertBodyContains({
      statusCode: 200,
      message: 'Course found',
    })
  })
  test('Should be not found ', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .get(`${url}4`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(404)
  })

  test('Should be resource denied', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockAdminCredentials)

    const sut = await client
      .get(`${url}4`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(403)
  })
})
