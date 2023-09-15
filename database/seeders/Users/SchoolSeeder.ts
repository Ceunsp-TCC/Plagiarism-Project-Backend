import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Roles from 'App/Models/Roles'
import Users from 'App/Models/Users'
import { faker } from '@faker-js/faker'

export default class SchoolSeeder extends BaseSeeder {
  public async run() {
    const roleSchool = await Roles.query().where('name', 'SCHOOL').first()

    const createSchoolInReview = await Users.create({
      name: 'SchoolInReview',
      password: 'schoolInReview@school',
      email: 'schoolInReview@gmail.com',
      phoneNumber: '112333333',
      roleId: roleSchool?.id,
      roleName: 'SCHOOL',
    })

    await createSchoolInReview.related('school').create({
      CEP: 'test',
      city: 'test',
      CNPJ: faker.string.numeric(14),
      street: 'test',
      complement: 'test',
      number: 102,
      district: 'test',
      state: 'test',
      status: 'INREVIEW',
    })
    const createSchoolCanceled = await Users.create({
      name: 'SchoolCanceled',
      password: 'schoolCanceled@school',
      email: 'schoolCanceled@gmail.com',
      phoneNumber: '112333333',
      roleId: roleSchool?.id,
      roleName: 'SCHOOL',
    })

    await createSchoolCanceled.related('school').create({
      CEP: 'test',
      city: 'test',
      CNPJ: faker.string.numeric(14),
      street: 'test',
      complement: 'test',
      number: 102,
      district: 'test',
      state: 'test',
      status: 'INREVIEW',
    })
    const createSchoolCompleted = await Users.create({
      name: 'SchoolCompleted',
      password: 'schoolCompleted@school',
      email: 'schoolCompleted@gmail.com',
      phoneNumber: '112333333',
      roleId: roleSchool?.id,
      roleName: 'SCHOOL',
    })

    await createSchoolCompleted.related('school').create({
      CEP: 'test',
      city: 'test',
      CNPJ: '22232323',
      street: 'test',
      complement: 'test',
      number: 102,
      district: 'test',
      state: 'test',
      status: 'COMPLETED',
    })

    const createSchoolEmptyTeachers = await Users.create({
      name: 'Schoolemptyteachers',
      password: 'schoolemptyteachers@school',
      email: 'schoolemptyteachers@gmail.com',
      phoneNumber: '112333333',
      roleId: roleSchool?.id,
      roleName: 'SCHOOL',
    })

    await createSchoolEmptyTeachers.related('school').create({
      CEP: 'test',
      city: 'test',
      CNPJ: faker.string.numeric(14),
      street: 'test',
      complement: 'test',
      number: 102,
      district: 'test',
      state: 'test',
      status: 'COMPLETED',
    })
    const createSchoolEmptyCourses = await Users.create({
      name: 'Schoolemptycourses',
      password: 'schoolemptycourses@school',
      email: 'schoolemptycourses@gmail.com',
      phoneNumber: '112333333',
      roleId: roleSchool?.id,
      roleName: 'SCHOOL',
    })

    await createSchoolEmptyCourses.related('school').create({
      CEP: 'test',
      city: 'test',
      CNPJ: faker.string.numeric(14),
      street: 'test',
      complement: 'test',
      number: 102,
      district: 'test',
      state: 'test',
      status: 'COMPLETED',
    })

    const createSchoolEmptyClasses = await Users.create({
      name: 'Schoolemptyclasses',
      password: 'schoolemptyclasses@school',
      email: 'schoolemptyclasses@gmail.com',
      phoneNumber: '112333333',
      roleId: roleSchool?.id,
      roleName: 'SCHOOL',
    })

    await createSchoolEmptyClasses.related('school').create({
      CEP: 'test',
      city: 'test',
      CNPJ: faker.string.numeric(14),
      street: 'test',
      complement: 'test',
      number: 102,
      district: 'test',
      state: 'test',
      status: 'COMPLETED',
    })
  }
}
