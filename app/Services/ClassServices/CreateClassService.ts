import DefaultResponse from '@ioc:Utils/DefaultResponse'
import ClassRepository from '@ioc:Repositories/ClassRepository'
import CourseRepository from '@ioc:Repositories/CourseRepository'
import LessonRepository from '@ioc:Repositories/LessonRepository'
import CustomException from 'App/Exceptions/CustomException'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import { DateTime } from 'luxon'
import Courses from 'App/Models/Courses'
import type { ClassServiceDto, CourseSemesterDto } from 'App/Dtos/Class/ClassDto'

export default class CreateClassService {
  private async searchCourse(courseId: number): Promise<Courses | null> {
    const course = await CourseRepository.findById(courseId)

    return course
  }
  private makeClassName(courseName: string): string {
    const className = `${courseName}-${cuid()}-${DateTime.now().year}`

    return className
  }

  private hasSemesterInCourse(semesters: CourseSemesterDto[]): boolean {
    const hasSemester = semesters.length > 0

    return hasSemester
  }

  private hasLessonInSemester(semesters: CourseSemesterDto[]): boolean {
    const hasLesson = semesters.every((semester) => semester.lessons.length > 0)

    return hasLesson
  }

  public async create({ courseId, schoolId }: ClassServiceDto) {
    const searchCourse = await this.searchCourse(courseId)

    if (!searchCourse) {
      throw new CustomException('Course not found', 404)
    }

    const className = this.makeClassName(searchCourse.name)

    const semesters = await Promise.all(
      searchCourse.semesters.map(async (semester) => {
        const lessons = await LessonRepository.findBySemesterId(semester.id)

        return {
          name: semester.name,
          description: semester.description,
          lessons: lessons.map((lesson) => ({
            name: lesson.name,
            description: lesson.description,
            place: lesson.place,
          })),
        }
      })
    )

    const hasSemester = this.hasSemesterInCourse(semesters)

    if (!hasSemester) {
      throw new CustomException('Not has semesters registered for this course', 400)
    }

    const hasLesson = this.hasLessonInSemester(semesters)

    if (!hasLesson) {
      throw new CustomException('Not has lessons registered for some semester', 400)
    }

    const classBody = {
      courseId,
      schoolId,
      name: className,
      semesters,
    }

    await ClassRepository.create(classBody)

    return await DefaultResponse.success('Class created successfully', 201)
  }
}
