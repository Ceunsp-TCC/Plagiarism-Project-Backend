import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import PermissionLucidRepository from 'App/Repositories/PermissionRepository/PermissionLucidRepository'
import sinon from 'sinon'
import { faker } from '@faker-js/faker'
import Permissions from 'App/Models/Permissions'

test.group('Permission repository', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('Should be create a permission', async ({ assert }) => {
    const mockModel = sinon.createStubInstance(Permissions) as unknown as typeof Permissions

    sinon.stub(PermissionLucidRepository.prototype, 'create').resolves(true)
    const permissionRepository = new PermissionLucidRepository(mockModel)

    assert.equal(await permissionRepository.create(faker.person.jobTitle()), true)
  })
  test('Should get permissions by names', async ({ assert }) => {
    const mockModel = sinon.createStubInstance(Permissions) as unknown as typeof Permissions

    const permissions = new Permissions()
    sinon
      .stub(PermissionLucidRepository.prototype, 'getPermissionsByNames')
      .resolves(permissions as unknown as Permissions[])
    const permissionRepository = new PermissionLucidRepository(mockModel)

    const result = await permissionRepository.getPermissionsByNames(['viewRoles'])
    assert.equal(result, permissions)
  })
})
