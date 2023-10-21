import AcademicPapers from 'App/Models/AcademicPapers'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(AcademicPapers, ({ faker }) => {
  return {
    studentId: 1,
    paper: faker.image.url(),
    comments: faker.person.bio(),
  }
}).build()
