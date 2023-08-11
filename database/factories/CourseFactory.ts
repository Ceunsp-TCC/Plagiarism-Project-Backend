import Courses from 'App/Models/Courses'
import SemesterFactory from './SemesterFactory'
import Factory from '@ioc:Adonis/Lucid/Factory'
//@ts-ignore
export default Factory.define(Courses, ({ faker }) => {
  return {
    schoolId: 4,
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
