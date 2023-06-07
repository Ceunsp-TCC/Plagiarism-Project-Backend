import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import SchoolFactory from 'Database/factories/SchoolFactory'

const url = '/v1/auth/login'
test.group('Login', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('Should login successfully', async ({ client }) => {
    const school = await SchoolFactory.create()
    await school.merge({ password: 'Alpha@12' }).save()

    const sut = await client.post(url).json({
      email: school.email,
      password: 'Alpha@12',
      deviceName: 'browser',
    })

    sut.assertStatus(200)
    sut.assertBodyContains({
      content: {
        accessToken: {
          token: sut.response.body.content.accessToken.token,
        },
      },
    })
  })
  test('Should is invalid credentials if user doest exists', async ({ client }) => {
    const sut = await client.post(url).json({
      email: 'diretoria@estererafaelapadarialtda.com.br',
      password: '12345',
      deviceName: 'browser',
    })

    sut.assertStatus(401)
    sut.assertBody({ statusCode: 401, message: 'Invalid Credentials' })
  })

  test('Should is invalid credentials if password is incorrect', async ({ client }) => {
    const school = await SchoolFactory.create()
    const sut = await client.post(url).json({
      email: school.email,
      password: '12345',
      deviceName: 'browser',
    })

    sut.assertStatus(401)
    sut.assertBody({ statusCode: 401, message: 'Invalid Credentials' })
  })
  test('Should email is empty', async ({ client }) => {
    const school = await SchoolFactory.create()
    const sut = await client.post(url).json({
      email: null,
      password: school.password,
      deviceName: 'browser',
    })

    sut.assertStatus(422)
    sut.assertBody({ email: ['required validation failed'] })
  })
  test('Should password is empty', async ({ client }) => {
    const school = await SchoolFactory.create()
    const sut = await client.post(url).json({
      email: school.email,
      password: null,
      deviceName: 'browser',
    })

    sut.assertStatus(422)
    sut.assertBody({ password: ['required validation failed'] })
  })
  test('Should device name is empty', async ({ client }) => {
    const school = await SchoolFactory.create()
    const sut = await client.post(url).json({
      email: school.email,
      password: school.password,
      deviceName: null,
    })

    sut.assertStatus(422)
    sut.assertBody({ deviceName: ['required validation failed'] })
  })
})
