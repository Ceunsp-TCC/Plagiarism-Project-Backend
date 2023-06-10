import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import RoleLucidRepository from 'App/Repositories/RoleRepository/RoleLucidRepository'
import sinon from 'sinon'
import Role from 'App/Models/Permissions'

test.group('Role repository', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be create a role', async ({ assert }) => {
    const mockModel = sinon.createStubInstance(Role) as unknown as typeof Role
    sinon.stub(RoleLucidRepository.prototype, 'create').resolves(true)
    const roleRepository = new RoleLucidRepository(mockModel)

    const result = await roleRepository.create('ADMIN')

    assert.equal(result, true)
  })

  test('Should be find a role by name', async ({ assert }) => {
    const mockModel = sinon.createStubInstance(Role) as unknown as typeof Role
    const role = new Role()
    sinon.stub(RoleLucidRepository.prototype, 'findByName').resolves(role)
    const roleRepository = new RoleLucidRepository(mockModel)

    const result = await roleRepository.findByName('ADMIN')

    assert.equal(result, role)
  })
})
