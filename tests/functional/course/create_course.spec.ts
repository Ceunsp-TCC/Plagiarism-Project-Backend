import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { basicCredentials, mockSchoolCredentials, mockAdminCredentials } from '../../helpers'
import { file } from '@ioc:Adonis/Core/Helpers'
import Drive from '@ioc:Adonis/Core/Drive'
import CourseFactory from 'Database/factories/CourseFactory'

const url = '/v1/courses/create'
const urlLogin = '/v1/auth/login'

test.group('Create course', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be create course', async ({ client }) => {
    await Drive.fake()
    const fakeImage = await file.generateJpg('1mb')
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .post(url)
      .bearerToken(login.response.body.content.accessToken.token)
      .file('image', fakeImage.contents, { filename: fakeImage.name })
      .fields({
        name: 'Ciências da Computação',
        description: 'Curso para ciencias da computação',
        modality: 'HYBRID',
        category: 'TECNOLOGY',
        price: 1.2,
      })

    sut.assertStatus(201)
    sut.assertBodyContains({
      statusCode: 201,
      message: 'Course created successfully',
    })
  })
  test('Should be create course with name already exists', async ({ client }) => {
    const courseMock = await CourseFactory.create()
    await Drive.fake()
    const fakeImage = await file.generateJpg('1mb')
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .post(url)
      .bearerToken(login.response.body.content.accessToken.token)
      .file('image', fakeImage.contents, { filename: fakeImage.name })
      .fields({
        name: courseMock.name,
        description: 'Curso para ciencias da computação',
        modality: 'HYBRID',
        category: 'TECNOLOGY',
        price: 1.2,
      })

    sut.assertStatus(400)
  })
  test('Should be fields is empty', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client.post(url).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(422)
  })
  test('Should be image size is more than 5mb', async ({ client }) => {
    await Drive.fake()
    const fakeImage = await file.generateJpg('6mb')
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .post(url)
      .bearerToken(login.response.body.content.accessToken.token)
      .file('image', fakeImage.contents, { filename: fakeImage.name })
      .fields({
        name: 'Ciências da Computação',
        description: 'Curso para ciencias da computação',
        modality: 'HYBRID',
        category: 'TECNOLOGY',
        price: 1.2,
      })

    sut.assertStatus(422)
  })
  test('Should be image extension is invalid', async ({ client }) => {
    await Drive.fake()
    const fakeImage = await file.generatePdf('4mb')
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockSchoolCredentials)

    const sut = await client
      .post(url)
      .bearerToken(login.response.body.content.accessToken.token)
      .file('image', fakeImage.contents, { filename: fakeImage.name })
      .fields({
        name: 'Ciências da Computação',
        description: 'Curso para ciencias da computação',
        modality: 'HYBRID',
        category: 'TECNOLOGY',
        price: 1.2,
      })

    sut.assertStatus(422)
  })
  test('Should be not has permission for create course', async ({ client }) => {
    await Drive.fake()
    const fakeImage = await file.generateJpg('4mb')
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockAdminCredentials)

    const sut = await client
      .post(url)
      .bearerToken(login.response.body.content.accessToken.token)
      .file('image', fakeImage.contents, { filename: fakeImage.name })
      .fields({
        name: 'Ciências da Computação',
        description: 'Curso para ciencias da computação',
        modality: 'HYBRID',
        category: 'TECNOLOGY',
        price: 1.2,
      })

    sut.assertStatus(403)
  })
})
