import DefaultResponse from '@ioc:Utils/DefaultResponse'
import ViaCepServices from 'App/Services/Http/ViaCepServices/ViaCepServices'

export default class ValidZipCodeService {
  constructor(private readonly viaCepService: ViaCepServices) {
    this.viaCepService = viaCepService
  }

  public async validZipCode(zipCode: string) {
    await this.viaCepService.getAddress(zipCode)

    return await DefaultResponse.success('Zipcode is valid', 200)
  }
}
