import Classes from 'App/Models/Classes'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Schools from 'App/Models/Schools'
import Courses from 'App/Models/Courses'

export default Factory.define(Classes, async ({ faker }) => {
  const school = await Schools.query().where('CNPJ', '22232323').first()
  const course = await Courses.create({
    schoolId: school!.id,
    name: faker.company.name(),
    category: faker.person.jobDescriptor(),
    description: faker.person.jobDescriptor(),
    image: faker.image.url(),
    modality: 'HYBRID',
    price: 1.2,
  })

  return {
    schoolId: school!.id,
    courseId: course.id,
    name: faker.company.name(),
  }
}).build()
