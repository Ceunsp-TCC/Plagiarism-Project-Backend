import DefaultResponse from '@ioc:Utils/DefaultResponse'
import UserRepository from '@ioc:Repositories/UserRepository'
import CustomException from 'App/Exceptions/CustomException'

export default class UpdateStatusSchoolService {
  public async updateStatus(status: 'INREVIEW' | 'CANCELED' | 'COMPLETED', id: number) {
    const findSchoolById = await UserRepository.findUserById(id)

    if (!findSchoolById) {
      throw new CustomException('School not found', 404)
    }

    await UserRepository.updateSchoolStatus(status, id)
    return await DefaultResponse.success('School status updated', 200)
  }
}
