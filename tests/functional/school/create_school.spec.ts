import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { faker } from '@faker-js/faker'
import Env from '@ioc:Adonis/Core/Env'
import nock from 'nock'

const url = '/v1/schools/create'

const passwordMock = 'Default@12'
test.group('Create school', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('Should create school success', async ({ client }) => {
    nock(Env.get('NTFY_API'))
      .post('/')
      .reply(200, {
        topic: Env.get('NTFY_TOPIC_NEW_SCHOOL'),
      })
    nock(Env.get('VIACEP_API')).get('/ws/13323389/json/').reply(200, {
      cep: '13323-389',
      logradouro: 'Rua Antonio Coelho de Carvalho',
      complemento: '',
      bairro: 'Jardim Santa Marta III',
      localidade: 'Salto',
      uf: 'SP',
      ibge: '3545209',
      gia: '6002',
      ddd: '11',
      siafi: '7005',
    })
    const sut = await client
      .post(url)
      .basicAuth(
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD')
      )
      .json({
        name: faker.company.name(),
        email: faker.internet.email(),
        password: passwordMock,
        confirmPassword: passwordMock,
        CNPJ: faker.string.numeric(14),
        phoneNumber: faker.phone.number('119########'),
        address: {
          CEP: '13323389',
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
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD')
      )

    sut.assertStatus(422)
  })

  test('Should generate error because has other school with same email', async ({ client }) => {
    nock(Env.get('NTFY_API'))
      .post('/')
      .reply(200, {
        topic: Env.get('NTFY_TOPIC_NEW_SCHOOL'),
      })
    nock(Env.get('VIACEP_API')).get('/ws/13323389/json/').reply(200, {
      cep: '13323-389',
      logradouro: 'Rua Antonio Coelho de Carvalho',
      complemento: '',
      bairro: 'Jardim Santa Marta III',
      localidade: 'Salto',
      uf: 'SP',
      ibge: '3545209',
      gia: '6002',
      ddd: '11',
      siafi: '7005',
    })
    const sut = await client
      .post(url)
      .basicAuth(
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD')
      )
      .json({
        name: faker.company.name(),
        email: 'schoolCompleted@gmail.com',
        password: passwordMock,
        confirmPassword: passwordMock,
        CNPJ: faker.string.numeric(14),
        phoneNumber: faker.phone.number('119########'),
        address: {
          CEP: faker.location.zipCode(),
          number: faker.number.int({
            max: 5,
          }),
          complement: faker.location.secondaryAddress(),
        },
      })

    sut.assertStatus(422)
  })
  test('Should generate error because has other school with same cnpj', async ({ client }) => {
    nock(Env.get('NTFY_API'))
      .post('/')
      .reply(200, {
        topic: Env.get('NTFY_TOPIC_NEW_SCHOOL'),
      })
    nock(Env.get('VIACEP_API')).get('/ws/13323389/json/').reply(200, {
      cep: '13323-389',
      logradouro: 'Rua Antonio Coelho de Carvalho',
      complemento: '',
      bairro: 'Jardim Santa Marta III',
      localidade: 'Salto',
      uf: 'SP',
      ibge: '3545209',
      gia: '6002',
      ddd: '11',
      siafi: '7005',
    })
    const sut = await client
      .post(url)
      .basicAuth(
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD')
      )
      .json({
        name: faker.company.name(),
        email: faker.internet.email(),
        password: passwordMock,
        confirmPassword: passwordMock,
        CNPJ: '22232323',
        phoneNumber: faker.phone.number('119########'),
        address: {
          CEP: '13323389',
          number: faker.number.int({
            max: 5,
          }),
          complement: faker.location.secondaryAddress(),
        },
      })

    sut.assertStatus(422)
  })
})
