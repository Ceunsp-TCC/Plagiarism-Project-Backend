import Courses from 'App/Models/Courses'
import type { DefaultPaginateDtoResponse } from 'App/Dtos/Utils/DefaultPaginateDto'
import type { CourseRepositoryDto, CourseDtoResponse } from 'App/Dtos/Courses/CourseDto'

export default interface CourseRepositoryInterface {
  create(courseData: CourseRepositoryDto): Promise<Courses>
  getAll(
    schoolId: number,
    currentPage?: number,
    numberlinesPerPage?: number,
    name?: string
  ): Promise<DefaultPaginateDtoResponse<CourseDtoResponse>>
  findById(courseId: number): Promise<Courses | null>
}
