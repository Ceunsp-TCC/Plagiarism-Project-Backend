import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Roles from 'App/Models/Roles'
import Schools from 'App/Models/Schools'
import Users from 'App/Models/Users'

export default class TeacherSeeder extends BaseSeeder {
  public async run() {
    const roleTeacher = await Roles.query().where('name', 'TEACHER').first()
    const school = await Schools.query().where('CNPJ', '22232323').first()

    const createTeacher = await Users.create({
      name: 'teacher',
      password: 'teacher@teacher',
      email: 'teacher@gmail.com',
      phoneNumber: '112333333',
      roleId: roleTeacher?.id,
      roleName: 'TEACHER',
    })

    await createTeacher.related('teacher').create({
      CND: 'cnd-test',
      CPF: 'cpf-teacher-test',
      schoolId: school?.userId,
    })
  }
}
