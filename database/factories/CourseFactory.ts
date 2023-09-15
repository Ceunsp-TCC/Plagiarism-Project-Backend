import Courses from 'App/Models/Courses'
import SemesterFactory from './SemesterFactory'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Schools from 'App/Models/Schools'
//@ts-ignore
export default Factory.define(Courses, async ({ faker }) => {
  const school = await Schools.query().where('CNPJ', '22232323').first()
  return {
    schoolId: school!.id,
    name: faker.company.name(),
    category: faker.person.jobDescriptor(),
    description: faker.person.jobDescriptor(),
    image: faker.image.url(),
    modality: 'HYBRID',
    price: 1.2,
  }
})
  .relation('semesters', () => SemesterFactory)
  .build()
