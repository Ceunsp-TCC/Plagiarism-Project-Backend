import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { faker } from '@faker-js/faker'
import UserFactory from 'Database/factories/UserFactory'
import Env from '@ioc:Adonis/Core/Env'
const url = '/v1/schools/create'

test.group('Create school', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('Should create school success', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(
        Env.get('PLAGIARISM_PLATFORM_AUTHENTICATOR_USERNAME'),
        Env.get('PLAGIARISM_PLATFORM_AUTHENTICATOR_PASSWORD')
      )
      .json({
        name: faker.company.name(),
        email: faker.internet.email(),
        password: faker.internet.password({
          length: 10,
        }),
        CNPJ: faker.string.numeric(14),
        phoneNumber: faker.phone.number('119########'),
        address: {
          street: faker.location.street(),
          city: faker.location.city(),
          state: faker.location.state({ abbreviated: true }),
          CEP: faker.location.zipCode(),
          district: faker.location.country(),
          number: faker.number.int({
            max: 5,
          }),
          complement: faker.location.secondaryAddress(),
        },
      })

    sut.assertStatus(201)
    sut.assertBody({
      statusCode: 201,
      message: 'School created successfully',
    })
  })

  test('Should fields empty', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(
        Env.get('PLAGIARISM_PLATFORM_AUTHENTICATOR_USERNAME'),
        Env.get('PLAGIARISM_PLATFORM_AUTHENTICATOR_PASSWORD')
      )

    sut.assertStatus(422)
  })

  test('Should generate error because has other school with same email', async ({ client }) => {
    const user = await UserFactory.apply('school').apply('defaultPassword').with('school').create()
    const sut = await client
      .post(url)
      .basicAuth(
        Env.get('PLAGIARISM_PLATFORM_AUTHENTICATOR_USERNAME'),
        Env.get('PLAGIARISM_PLATFORM_AUTHENTICATOR_PASSWORD')
      )
      .json({
        name: faker.company.name(),
        email: user.email,
        password: faker.internet.password({
          length: 10,
        }),
        CNPJ: faker.string.numeric(14),
        phoneNumber: faker.phone.number('119########'),
        address: {
          street: faker.location.street(),
          city: faker.location.city(),
          state: faker.location.state({ abbreviated: true }),
          CEP: faker.location.zipCode(),
          district: faker.location.country(),
          number: faker.number.int({
            max: 5,
          }),
          complement: faker.location.secondaryAddress(),
        },
      })

    sut.assertStatus(422)
  })
  test('Should generate error because has other school with same cnpj', async ({ client }) => {
    const user = await UserFactory.apply('school').apply('defaultPassword').with('school').create()
    const sut = await client
      .post(url)
      .basicAuth(
        Env.get('PLAGIARISM_PLATFORM_AUTHENTICATOR_USERNAME'),
        Env.get('PLAGIARISM_PLATFORM_AUTHENTICATOR_PASSWORD')
      )
      .json({
        name: faker.company.name(),
        email: faker.internet.email(),
        password: faker.internet.password({
          length: 10,
        }),
        CNPJ: user.school.CNPJ,
        phoneNumber: faker.phone.number('119########'),
        address: {
          street: faker.location.street(),
          city: faker.location.city(),
          state: faker.location.state({ abbreviated: true }),
          CEP: faker.location.zipCode(),
          district: faker.location.country(),
          number: faker.number.int({
            max: 5,
          }),
          complement: faker.location.secondaryAddress(),
        },
      })

    sut.assertStatus(422)
  })
})
