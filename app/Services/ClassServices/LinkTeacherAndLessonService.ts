import ClassRepository from '@ioc:Repositories/ClassRepository'
import DefaultResponse from '@ioc:Utils/DefaultResponse'

export default class LinkTeacherAndLessonService {
  public async linkTeacherAndLesson(lessonId: number, teacherId: number) {
    await ClassRepository.updateTeacherInLesson(lessonId, teacherId)

    return await DefaultResponse.success(
      'Teacher connection with the lesson successfully established',
      200
    )
  }
}
