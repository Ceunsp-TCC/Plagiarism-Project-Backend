import Lessons from 'App/Models/Lessons'
import LessonRepositoryInterface from 'App/Interfaces/Repositories/LessonRepositoryInterface'
import type { LessonDto } from 'App/Dtos/Lessons/LessonDto'

export default class LessonLucidRepository implements LessonRepositoryInterface {
  constructor(private readonly model: typeof Lessons) {}

  public async create(lessonDto: LessonDto) {
    const lesson = await this.model.create(lessonDto)

    return lesson
  }

  public async findBySemesterId(semesterId: number): Promise<Lessons[]> {
    const lessons = await this.model.query().where('semesterId', semesterId)

    return lessons
  }
}
