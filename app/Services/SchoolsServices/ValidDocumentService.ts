import DefaultResponse from '@ioc:Utils/DefaultResponse'
import UserRepository from '@ioc:Repositories/UserRepository'
import CustomException from 'App/Exceptions/CustomException'

export default class ValidDocumentService {
  public async validDocument(CNPJ: string) {
    const findSchoolByCNPJ = await UserRepository.findSchoolByCnpj(CNPJ)

    if (findSchoolByCNPJ) {
      throw new CustomException('Document is invalid', 400)
    }
    return await DefaultResponse.success('Document is valid', 200)
  }
}
