import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permissions from 'App/Models/Permissions'
import Roles from 'App/Models/Roles'

export default class RolePermissionsTeacherSeeder extends BaseSeeder {
  public async run() {
    const permissionsTeacher = [
      'lessons',
      'getLessonsByTeacher',
      'activities',
      'createActivity',
      'getActivity',
      'getActivities',
      'academicPapers',
      'getAcademicPapers',
    ]

    const teacherPermissionsIds = (
      await Permissions.query().whereIn('name', permissionsTeacher)
    ).map((permission) => permission.id)
    const roleTeacher = await Roles.query().where('name', 'TEACHER').first()

    await roleTeacher?.related('permissions').attach(teacherPermissionsIds)
  }
}
