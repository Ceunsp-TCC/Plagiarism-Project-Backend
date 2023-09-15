import Lessons from 'App/Models/Lessons'
import type { LessonDto } from 'App/Dtos/Lessons/LessonDto'

export default interface LessonRepositoryInterface {
  create(lessonDto: LessonDto): Promise<Lessons>
  findBySemesterId(semesterId: number): Promise<Lessons[]>
}
