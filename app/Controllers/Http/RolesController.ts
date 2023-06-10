import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Roles from 'App/Models/Roles'
import CreateRoleService from 'App/Services/RoleServices/CreateRoleService'
import RoleLucidRepository from 'App/Repositories/RoleRepository/RoleLucidRepository'
import DefaultResponse from 'App/Utils/DefaultResponse'
import RoleValidator from 'App/Validators/RoleValidator'
import SyncRolesPermissionService from 'App/Services/RolesPermissionsServices/SyncRolesPermissionService'
import SyncPermissionsAndRoleValidator from 'App/Validators/SyncPermissionsAndRoleValidator'
import RolesPermissionsLucidRepository from 'App/Repositories/RolesPermissionsRepository/RolesPermissionsLucidRepository'
import PermissionLucidRepository from 'App/Repositories/PermissionRepository/PermissionLucidRepository'
import Permissions from 'App/Models/Permissions'
import RolesPermissions from 'App/Models/RolesPermissions'

export default class RolesController {
  private createRoleService: CreateRoleService
  private syncRolesPermissionService: SyncRolesPermissionService

  constructor() {
    this.createRoleService = new CreateRoleService(
      new DefaultResponse(),
      new RoleLucidRepository(Roles)
    )
    this.syncRolesPermissionService = new SyncRolesPermissionService(
      new DefaultResponse(),
      new RoleLucidRepository(Roles),
      new PermissionLucidRepository(Permissions),
      new RolesPermissionsLucidRepository(RolesPermissions)
    )
  }
  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(RoleValidator)

    return await this.createRoleService.create(payload.name)
  }

  public async scyncPermissionsAndRoles({ request }: HttpContextContract) {
    const payload = await request.validate(SyncPermissionsAndRoleValidator)

    return this.syncRolesPermissionService.links(payload.roleName, payload.permissions)
  }
}
