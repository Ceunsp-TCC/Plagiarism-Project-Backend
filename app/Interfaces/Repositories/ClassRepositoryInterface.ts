import { DefaultPaginateDtoResponse } from 'App/Dtos/Utils/DefaultPaginateDto'
import Classes from 'App/Models/Classes'
import type { ClassRepositoryDto, ClassDtoResponse } from 'App/Dtos/Class/ClassDto'

export default interface ClassRepositoryInterface {
  create(ClassRepositoryDto: ClassRepositoryDto)
  getAll(
    schoolId: number,
    currentPage?: number,
    numberlinesPerPage?: number,
    name?: string
  ): Promise<DefaultPaginateDtoResponse<ClassDtoResponse>>

  getById(classId: number): Promise<Classes | null>
  updateTeacherInLesson(lessonId: number, teacherId: number): Promise<boolean>
  getLessonById(lessonId: number)
}
