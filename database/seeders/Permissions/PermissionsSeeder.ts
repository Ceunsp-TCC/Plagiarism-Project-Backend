import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permissions from 'App/Models/Permissions'

export default class PermissionsSeeder extends BaseSeeder {
  public async run() {
    await Permissions.query().delete()

    await Permissions.createMany([
      {
        name: 'CREATE-PERMISSION',
      },
      {
        name: 'DELETE-PERMISSION',
      },
      {
        name: 'UPDATE-PERMISSION',
      },
      {
        name: 'VIEW-PERMISSION',
      },
      {
        name: 'CREATE-ROLE',
      },
      {
        name: 'UPDATE-ROLE',
      },
      {
        name: 'VIEW-ROLE',
      },
      {
        name: 'DELETE-ROLE',
      },
      {
        name: 'SYNC-ROLES-PERMISSIONS',
      },
    ])
  }
}
