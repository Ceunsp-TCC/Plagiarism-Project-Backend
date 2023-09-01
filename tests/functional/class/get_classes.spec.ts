import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { basicCredentials, mockSchoolCredentials, mockAdminCredentials } from '../../helpers'
import ClassFactory from 'Database/factories/ClassFactory'
import CourseFactory from 'Database/factories/CourseFactory'

const url = '/v1/classes/get-all'
const urlLogin = '/v1/auth/login'

test.group('Get classes', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be get classes', async ({ client, assert }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)
    const schoolId = login.response.body.content.user.schoolData.id
    const courseId = await (await CourseFactory.create()).id
    await ClassFactory.merge({ schoolId, courseId }).createMany(3)
    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(200)
    assert.equal(sut.response.body.content.totalRegisters, 3)
  })

  test('Should be not found classes', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(404)
  })

  test('Should be choice numberlines per page', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const schoolId = login.response.body.content.user.schoolData.id
    const courseId = await (await CourseFactory.create()).id
    await ClassFactory.merge({ schoolId, courseId }).createMany(3)
    const sut = await client
      .get(url)
      .qs({ numberlinesPerPage: 10 })
      .bearerToken(login.response.body.content.accessToken.token)

    sut.assertBodyContains({
      content: {
        registersPerPage: 10,
      },
    })
  })
  test('Should be resource denied', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockAdminCredentials)
    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(403)
  })
})
