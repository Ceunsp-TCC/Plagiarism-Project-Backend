import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import CheckPermissions from 'App/Utils/CheckPermissions'

export default class PermissionPolicy extends BasePolicy {
  public async createPermission() {
    const checkPermission = new CheckPermissions()

    return await checkPermission.checkHasPermission('createPermission')
  }
  public async updatePermission() {
    const checkPermission = new CheckPermissions()

    return await checkPermission.checkHasPermission('updatePermission')
  }
  public async deletePermission() {
    const checkPermission = new CheckPermissions()

    return await checkPermission.checkHasPermission('deletePermission')
  }
  public async viewPermission() {
    const checkPermission = new CheckPermissions()

    return await checkPermission.checkHasPermission('viewPermission')
  }
}
