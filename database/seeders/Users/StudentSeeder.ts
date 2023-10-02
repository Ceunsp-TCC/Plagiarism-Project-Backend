import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Roles from 'App/Models/Roles'
import Users from 'App/Models/Users'
import Schools from 'App/Models/Schools'

export default class Student extends BaseSeeder {
  public async run() {
    const roleStudent = await Roles.query().where('name', 'STUDENT').first()
    const school = await Schools.query().where('CNPJ', '22232323').first()

    const createStudent = await Users.create({
      name: 'student',
      password: 'student@student',
      email: 'student@gmail.com',
      phoneNumber: '112333333',
      roleId: roleStudent?.id,
      roleName: 'STUDENT',
    })

    await createStudent.related('student').create({
      CPF: 'cpf-student-test',
      schoolId: school?.id,
      classId: 300,
    })
    const createStudentInactive = await Users.create({
      name: 'student-inactive',
      password: 'student-inactive@student',
      email: 'student-inactive@gmail.com',
      phoneNumber: '112333333',
      roleId: roleStudent?.id,
      roleName: 'STUDENT',
    })

    await createStudentInactive.related('student').create({
      CPF: 'cpf-student-test',
      status: 'INACTIVE',
      schoolId: school?.id,
      classId: 100,
    })
    const createStudentEmptyLessons = await Users.create({
      name: 'student-empty-lessons',
      password: 'student-empty-lessons@student',
      email: 'student-empty-lessons@gmail.com',
      phoneNumber: '112333333',
      roleId: roleStudent?.id,
      roleName: 'STUDENT',
    })

    await createStudentEmptyLessons.related('student').create({
      CPF: 'cpf-student-test',
      status: 'ACTIVE',
      schoolId: school?.id,
      classId: 100,
    })
  }
}
