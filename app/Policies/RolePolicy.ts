import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import CheckPermissions from 'App/Utils/CheckPermissions'

export default class RolePolicy extends BasePolicy {
  public async createRole() {
    const checkPermission = new CheckPermissions()

    return await checkPermission.checkHasPermission('createRole')
  }
  public async updateRole() {
    const checkPermission = new CheckPermissions()

    return await checkPermission.checkHasPermission('updateRole')
  }
  public async viewRole() {
    const checkPermission = new CheckPermissions()

    return await checkPermission.checkHasPermission('viewRole')
  }
  public async deleteRoleRole() {
    const checkPermission = new CheckPermissions()

    return await checkPermission.checkHasPermission('viewRole')
  }
  public async syncRolesPermissions() {
    const checkPermission = new CheckPermissions()

    return await checkPermission.checkHasPermission('syncRolesPermissions')
  }
}
