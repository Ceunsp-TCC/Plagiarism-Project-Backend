import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permissions from 'App/Models/Permissions'
import Roles from 'App/Models/Roles'

export default class RolePermissionsSchoolSeeder extends BaseSeeder {
  public async run() {
    const permissionsSchool = [
      'teachers',
      'createTeacher',
      'getTeachers',
      'students',
      'createStudent',
      'getStudents',
      'courses',
      'createCourse',
      'getCourses',
    ]

    const schoolPermissionsIds = (await Permissions.query().whereIn('name', permissionsSchool)).map(
      (permission) => permission.id
    )
    const roleAdmin = await Roles.query().where('name', 'SCHOOL').first()

    await roleAdmin?.related('permissions').attach(schoolPermissionsIds)
  }
}
