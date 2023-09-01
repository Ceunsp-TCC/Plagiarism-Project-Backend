import Classes from 'App/Models/Classes'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Schools from 'App/Models/Schools'
import CourseFactory from 'Database/factories/CourseFactory'

export default Factory.define(Classes, async () => {
  const school = await Schools.query().where('CNPJ', '22232323').first()
  const course = await CourseFactory.create()
  return {
    schoolId: school!.id,
    name: course.name,
    courseId: course.id,
  }
}).build()
