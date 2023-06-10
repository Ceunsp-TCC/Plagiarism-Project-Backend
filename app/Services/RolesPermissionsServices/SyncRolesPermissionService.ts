import DefaultResponse from 'App/Utils/DefaultResponse'
import RoleLucidRepository from 'App/Repositories/RoleRepository/RoleLucidRepository'
import PermissionLucidRepository from 'App/Repositories/PermissionRepository/PermissionLucidRepository'
import RolesPermissionsLucidRepository from 'App/Repositories/RolesPermissionsRepository/RolesPermissionsLucidRepository'
import CustomException from 'App/Exceptions/CustomException'
export default class SyncRolesPermissionService {
  constructor(
    private readonly defaultResponse: DefaultResponse,
    private readonly roleRepository: RoleLucidRepository,
    private readonly permissionRepository: PermissionLucidRepository,
    private readonly rolesPermissionRepository: RolesPermissionsLucidRepository
  ) {
    this.roleRepository = roleRepository
    this.defaultResponse = defaultResponse
    this.permissionRepository = permissionRepository
    this.rolesPermissionRepository = rolesPermissionRepository
  }

  public async links(role: string, permissions: string[]) {
    const getRole = await this.roleRepository.findByName(role)
    if (!getRole) {
      throw new CustomException('Role not found', 404)
    }
    const idRole = getRole?.id
    const permission = await this.permissionRepository.getPermissionsByNames(permissions)
    const permissionsIds = permission.map((permission) => permission.id)
    const nonExistentPermissions = permissions.filter(
      (permissionName) => !permission.find((p) => p.name === permissionName)
    )
    const hasNonExistPermissions = nonExistentPermissions.length > 0

    if (hasNonExistPermissions)
      throw new CustomException(`These permissions do not exist: ${nonExistentPermissions}`, 404)

    const uniquePermissions = new Set(permissions)
    const hasDuplicates = uniquePermissions.size !== permissions.length
    const duplicatePermissions = permissions.filter(
      (permissionName, index) => permissions.indexOf(permissionName) !== index
    )
    if (hasDuplicates)
      throw new CustomException(`There are duplicate permissions: ${duplicatePermissions}`, 404)
    const links = permissionsIds.map((permission) => ({
      idRole,
      idPermission: permission,
    }))
    await this.rolesPermissionRepository.create(links)
    return await this.defaultResponse.success(
      'Synchronized permissions with the role successfully',
      200
    )
  }
}
