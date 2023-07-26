import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { basicCredentials } from '../../helpers'
import Users from 'App/Models/Users'

const url = '/v1/users/update-password/'
const urlLogin = '/v1/auth/login'
test.group('Update password', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('Should be password is updated', async ({ client }) => {
    const user = await Users.findBy('email', 'student@gmail.com')
    const sut = await client
      .put(`${url}${user!.id}`)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json({
        password: 'Mogi@12',
        confirmPassword: 'Mogi@12',
      })
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json({
        email: 'student@gmail.com',
        password: 'Mogi@12',
        deviceName: 'browser',
      })
    sut.assertStatus(200)
    sut.assertBodyContains({ message: 'Password updated' })
    login.assertStatus(200)
  })
  test('Should be user not found', async ({ client }) => {
    const sut = await client
      .put(`${url}2323232`)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json({
        password: 'Mogi@12',
        confirmPassword: 'Mogi@12',
      })

    sut.assertStatus(404)
    sut.assertBodyContains({ message: 'User not found' })
  })
  test('Should be fields is empty', async ({ client }) => {
    const sut = await client
      .put(`${url}22`)
      .basicAuth(basicCredentials.username, basicCredentials.password)

    sut.assertStatus(422)
  })
  test('Should be not confirm password', async ({ client }) => {
    const sut = await client
      .put(`${url}32322323`)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json({
        password: 'Mogi@12',
        confirmPassword: 'Mogi@1223',
      })
    sut.assertStatus(422)
  })
  test('Should be invalid basic', async ({ client }) => {
    const sut = await client.put(`${url}32322323`)

    sut.assertStatus(401)
  })
})
