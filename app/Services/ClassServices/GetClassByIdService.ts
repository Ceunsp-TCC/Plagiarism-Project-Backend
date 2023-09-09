import DefaultResponse from '@ioc:Utils/DefaultResponse'
import ClassRepository from '@ioc:Repositories/ClassRepository'
import CustomException from 'App/Exceptions/CustomException'

export default class GetClassByIdService {
  public async getById(classId: number) {
    const classe = await ClassRepository.getById(classId)

    if (!classe) {
      throw new CustomException('Class not found', 404)
    }

    return await DefaultResponse.successWithContent('Class found', 200, classe)
  }
}
