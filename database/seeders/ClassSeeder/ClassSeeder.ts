import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Classes from 'App/Models/Classes'
import Courses from 'App/Models/Courses'
import Schools from 'App/Models/Schools'
import ClassSemesters from 'App/Models/ClassSemesters'
import ClassSemestersLessons from 'App/Models/ClassSemestersLessons'

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
    const classe = await Classes.create({
      id: 300,
      courseId: course.id,
      name: 'test',
      schoolId: school?.id,
    })

    const semester = await ClassSemesters.create({
      classId: classe.id,
      name: 'test',
      description: 'dd',
    })

    await ClassSemestersLessons.create({
      classSemesterId: semester.id,
      name: 'test',
      description: 'test',
      place: 'test',
      teacherId: 1,
    })

    await Classes.create({
      id: 100,
      courseId: course.id,
      name: 'test-empty-lessons',
      schoolId: school?.id,
    })
  }
}
