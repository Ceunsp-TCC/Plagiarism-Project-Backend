import DefaultResponse from 'App/Utils/DefaultResponse'
import UserLucidRepository from 'App/Repositories/UserRepository/UserLucidRepository'
import CustomException from 'App/Exceptions/CustomException'

export default class UpdateStatusSchoolService {
  constructor(
    private readonly defaultResponse: DefaultResponse,
    private readonly userRepository: UserLucidRepository
  ) {
    this.userRepository = userRepository
    this.defaultResponse = defaultResponse
  }

  public async updateStatus(status: 'INREVIEW' | 'CANCELED' | 'COMPLETED', id: number) {
    const findSchoolById = await this.userRepository.findUserById(id)

    if (!findSchoolById) {
      throw new CustomException('School not found', 404)
    }

    await this.userRepository.updateSchoolStatus(status, id)
    return await this.defaultResponse.success('School status updated', 200)
  }
}
