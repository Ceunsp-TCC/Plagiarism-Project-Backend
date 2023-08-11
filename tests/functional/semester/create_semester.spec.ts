import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import CourseFactory from 'Database/factories/CourseFactory'
import { basicCredentials, mockSchoolCredentials, mockAdminCredentials } from '../../helpers'

const url = '/v1/semesters/create/'
const urlLogin = '/v1/auth/login'

const body = {
  name: 'semester test',
  description: 'semester test',
}

test.group('Create Semester', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('Should be create semester', async ({ client }) => {
    const course = await CourseFactory.create()

    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .post(`${url}${course.id}`)
      .bearerToken(login.response.body.content.accessToken.token)
      .json(body)

    sut.assertStatus(201)
    sut.assertBodyContains({
      statusCode: 201,
      message: 'Semester created successfully',
    })
  })
  test('Should be not found course', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .post(`${url}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(404)
  })
  test('Should be empty fields', async ({ client }) => {
    const course = await CourseFactory.create()

    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .post(`${url}${course.id}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(422)
  })
  test('Should be resource denied', async ({ client }) => {
    const course = await CourseFactory.create()

    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockAdminCredentials)

    const sut = await client
      .post(`${url}${course.id}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(403)
  })
})
