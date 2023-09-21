import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permissions from 'App/Models/Permissions'
import Roles from 'App/Models/Roles'

export default class extends BaseSeeder {
  public async run() {
    const permissionsStudent = ['getLessonsByStudent']

    const studentPermissionsIds = (
      await Permissions.query().whereIn('name', permissionsStudent)
    ).map((permission) => permission.id)
    const roleStudent = await Roles.query().where('name', 'STUDENT').first()

    await roleStudent?.related('permissions').attach(studentPermissionsIds)
  }
}
