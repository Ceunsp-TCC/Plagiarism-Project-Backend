import DefaultResponse from 'App/Utils/DefaultResponse'
import UserLucidRepository from 'App/Repositories/UserRepository/UserLucidRepository'
import CustomException from 'App/Exceptions/CustomException'

export default class ValidDocumentService {
  constructor(
    private readonly defaultResponse: DefaultResponse,
    private readonly userRepository: UserLucidRepository
  ) {
    this.userRepository = userRepository
    this.defaultResponse = defaultResponse
  }

  public async validDocument(CNPJ: string) {
    const findSchoolByCNPJ = await this.userRepository.findSchoolByCnpj(CNPJ)

    if (findSchoolByCNPJ) {
      throw new CustomException('Document is invalid', 400)
    }
    return await this.defaultResponse.success('Document is valid', 200)
  }
}
