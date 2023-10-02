import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { ActivityType } from 'App/Dtos/Activities/ActivityDto'

import { basicCredentials, mockTeacherCredentials, mockAdminCredentials } from '../../helpers'

const url = '/v1/activities/create'
const urlLogin = '/v1/auth/login'

const body = {
  title: 'test',
  comments: 'test',
  type: ActivityType.NOTICE,
}
test.group('Create activity', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('Should be create a activity', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockTeacherCredentials)

    const lessonId = 1
    const sut = await client
      .post(`${url}/${lessonId}`)
      .bearerToken(login.response.body.content.accessToken.token)
      .json(body)

    sut.assertStatus(201)
    sut.assertBodyContains({
      statusCode: 201,
      message: 'Activity created successfully',
    })
  })
  test('Should be not found lesson', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockTeacherCredentials)

    const lessonId = 200
    const sut = await client
      .post(`${url}/${lessonId}`)
      .bearerToken(login.response.body.content.accessToken.token)
      .json(body)

    sut.assertStatus(404)
  })
  test('Should be is empty fields', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockTeacherCredentials)

    const lessonId = 1
    const sut = await client
      .post(`${url}/${lessonId}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(422)
  })
  test('Should be resource is denied access', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockAdminCredentials)

    const lessonId = 1
    const sut = await client
      .post(`${url}/${lessonId}`)
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(403)
  })
})
