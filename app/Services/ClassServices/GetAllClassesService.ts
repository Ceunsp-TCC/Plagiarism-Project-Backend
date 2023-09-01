import DefaultResponse from '@ioc:Utils/DefaultResponse'
import ClassRepository from '@ioc:Repositories/ClassRepository'
import CustomException from 'App/Exceptions/CustomException'

export default class GetAllClassesService {
  public async getAll(
    schoolId: number,
    currentPage?: number,
    numberlinesPerPage?: number,
    name?: string
  ) {
    const classes = await ClassRepository.getAll(schoolId, currentPage, numberlinesPerPage, name)

    const isEmptyList = classes.items.length === 0

    if (isEmptyList) {
      throw new CustomException('Classes not found', 404)
    }
    return await DefaultResponse.successWithContent('Classes found', 200, classes)
  }
}
