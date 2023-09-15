import DefaultResponse from '@ioc:Utils/DefaultResponse'
import CustomException from 'App/Exceptions/CustomException'
import StudentRepository from '@ioc:Repositories/StudentRepository'

export default class GetStudentsByClassService {
  public async getStudents(
    classId: number,
    currentPage?: number,
    numberlinesPerPage?: number,
    name?: string
  ) {
    const students = await StudentRepository.getByClass(
      classId,
      currentPage,
      numberlinesPerPage,
      name
    )
    const isEmptyList = students.items.length === 0

    if (isEmptyList) {
      throw new CustomException('Students not found', 404)
    }

    return await DefaultResponse.successWithContent('Students found', 200, students)
  }
}
