import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Env from '@ioc:Adonis/Core/Env'
import nock from 'nock'

const url = '/v1/users/valid-zipcode'
const mockZipCode = '13323389'
test.group('Valid Zip code user', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be zipcode is valid', async ({ client }) => {
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
        zipcode: mockZipCode,
      })

    sut.assertStatus(200)
    sut.assertBodyContains({ message: 'Zipcode is valid' })
  })
  test('Should be zipcode is invalid by error 400 from api via cep', async ({ client }) => {
    nock(Env.get('VIACEP_API')).get('/ws/123232323/json/').reply(400)
    const sut = await client
      .post(url)
      .basicAuth(
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD')
      )
      .json({
        zipcode: '123232323',
      })

    sut.assertStatus(400)
    sut.assertBodyContains({ message: 'Zipcode is invalid' })
  })
  test('Should be zipcode is invalid by error true from api via cep', async ({ client }) => {
    nock(Env.get('VIACEP_API')).get('/ws/32232332/json/').reply(200, {
      erro: true,
    })
    const sut = await client
      .post(url)
      .basicAuth(
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD')
      )
      .json({
        zipcode: '32232332',
      })

    sut.assertStatus(400)
    sut.assertBodyContains({ message: 'Zipcode is invalid' })
  })

  test('Should be is empty field zipcode', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
        Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD')
      )

    sut.assertStatus(422)
  })
})
