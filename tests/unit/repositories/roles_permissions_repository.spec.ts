import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import RolesPermissions from 'App/Models/RolesPermissions'
import RolesPermissionsLucidRepository from 'App/Repositories/RolesPermissionsRepository/RolesPermissionsLucidRepository'
import sinon from 'sinon'
import RoleFactory from 'Database/factories/RoleFactory'
import PermissionFactory from 'Database/factories/PermissionFactory'

test.group('Role Permissions repository', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('Should be create a link', async ({ assert }) => {
    const createRole = await RoleFactory.create()

    const createPermissions = await PermissionFactory.createMany(5)

    const links = createPermissions.map((permission) => ({
      idRole: createRole.id,
      idPermission: permission.id,
    }))
    const mockModel = sinon.createStubInstance(
      RolesPermissions
    ) as unknown as typeof RolesPermissions

    sinon.stub(RolesPermissionsLucidRepository.prototype, 'create').resolves(true)
    const rolePermissionRepository = new RolesPermissionsLucidRepository(mockModel)

    assert.equal(await rolePermissionRepository.create(links), true)
  })
})
