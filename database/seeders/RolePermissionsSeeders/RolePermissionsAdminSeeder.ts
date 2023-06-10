import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permissions from 'App/Models/Permissions'
import Roles from 'App/Models/Roles'
import RolesPermissions from 'App/Models/RolesPermissions'

export default class RolePermissionsAdminSeeder extends BaseSeeder {
  public async run() {
    await RolesPermissions.query().delete()
    const permissionsAdmin = [
      'CREATE-PERMISSION',
      'DELETE-PERMISSION',
      'UPDATE-PERMISSION',
      'VIEW-PERMISSION',
      'REATE-ROLE',
      'UPDATE-ROLE',
      'VIEW-ROLE',
      'DELETE-ROLE',
      'SYNC-ROLES-PERMISSIONS',
    ]

    const idsPermissionsAdmin = (await Permissions.query().whereIn('name', permissionsAdmin)).map(
      (permission) => permission.id
    )
    const roleAdmin = await Roles.query().where('name', 'ADMIN').first()

    const idAdmin = await roleAdmin?.id

    const linkAdminMap = await idsPermissionsAdmin.map((id) => ({
      idRole: idAdmin,
      idPermission: id,
    }))

    await RolesPermissions.createMany(linkAdminMap)
  }
}
