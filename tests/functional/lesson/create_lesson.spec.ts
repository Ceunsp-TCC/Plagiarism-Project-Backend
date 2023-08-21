import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import CourseFactory from 'Database/factories/CourseFactory'
import SemesterFactory from 'Database/factories/SemesterFactory'
import { basicCredentials, mockSchoolCredentials, mockAdminCredentials } from '../../helpers'

const url = '/v1/lessons/create/'
const urlLogin = '/v1/auth/login'

const body = {
  name: 'lesson test',
  description: 'lesson test',
  place: 'lesson place',
}

test.group('Create lesson', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('Should be create lesson', async ({ client }) => {
    const course = await CourseFactory.create()
    const semester = await SemesterFactory.merge({ courseId: course.id }).create()

    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .post(`${url}${semester.id}`)
      .bearerToken(login.response.body.content.accessToken.token)
      .json(body)

    sut.assertStatus(201)
    sut.assertBodyContains({
      statusCode: 201,
      message: 'Lesson created successfully',
    })
  })
  test('Should be fields empty', async ({ client }) => {
    const course = await CourseFactory.create()
    const semester = await SemesterFactory.merge({ courseId: course.id }).create()

    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .post(`${url}${semester.id}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(422)
  })
  test('Should be not found semester', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .post(`${url}0`)
      .bearerToken(login.response.body.content.accessToken.token)
      .json(body)

    sut.assertStatus(404)
  })
  test('Should be resource denied', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockAdminCredentials)

    const sut = await client
      .post(`${url}2`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(403)
  })
})
