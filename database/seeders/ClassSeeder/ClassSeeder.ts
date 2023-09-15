import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Classes from 'App/Models/Classes'
import Courses from 'App/Models/Courses'
import Schools from 'App/Models/Schools'

export default class ClassSeeder extends BaseSeeder {
  public async run() {
    const school = await Schools.query().where('CNPJ', '22232323').first()

    const course = await Courses.create({
      name: 'test',
      description: 'test',
      modality: 'HYBRID',
      category: 'test',
      image: 'test',
      price: 1.2,
      schoolId: school?.id,
    })
    await Classes.create({ id: 300, courseId: course.id, name: 'test', schoolId: school?.id })
  }
}
