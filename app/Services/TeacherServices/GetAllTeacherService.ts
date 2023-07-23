import DefaultResponse from '@ioc:Utils/DefaultResponse'
import TeacherRepository from '@ioc:Repositories/TeacherRepository'
import CustomException from 'App/Exceptions/CustomException'

export default class GetAllTeacherService {
  public async getAll(
    schoolId: number,
    currentPage?: number,
    numberlinesPerPage?: number,
    name?: string
  ) {
    const teachers = await TeacherRepository.getAll(schoolId, currentPage, numberlinesPerPage, name)
    const isEmptyList = teachers.items.length === 0

    if (isEmptyList) {
      throw new CustomException('Teachers not found', 404)
    }

    return await DefaultResponse.successWithContent('Teachers found', 200, teachers)
  }
}
