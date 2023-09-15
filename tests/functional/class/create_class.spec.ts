import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { basicCredentials, mockSchoolCredentials, mockAdminCredentials } from '../../helpers'
import CourseFactory from 'Database/factories/CourseFactory'

const url = '/v1/classes/create'
const urlLogin = '/v1/auth/login'
test.group('Create class', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('Should be create class', async ({ client }) => {
    const course = await CourseFactory.create()
    const semester = await course.related('semesters').create({ name: 'test' })
    await semester.related('lessons').create({ name: 'test', place: 'campus test' })
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .post(`${url}/${course.id}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(201)
    sut.assertBodyContains({
      statusCode: 201,
      message: 'Class created successfully',
    })
  })
  test('Should be not found course', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .post(`${url}/10`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(404)
    sut.assertBodyContains({
      statusCode: 404,
      message: 'Course not found',
    })
  })
  test('Should be not has semester for this course', async ({ client }) => {
    const course = await CourseFactory.create()
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .post(`${url}/${course.id}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(400)
    sut.assertBodyContains({
      statusCode: 400,
      message: 'Not has semesters registered for this course',
    })
  })
  test('Should be not has lesson  for some semester', async ({ client }) => {
    const course = await CourseFactory.create()
    await course.related('semesters').create({ name: 'test' })
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .post(`${url}/${course.id}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(400)
    sut.assertBodyContains({
      statusCode: 400,
      message: 'Not has lessons registered for some semester',
    })
  })
  test('Should be not has permission', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockAdminCredentials)

    const sut = await client
      .post(`${url}/10`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(403)
  })
})
