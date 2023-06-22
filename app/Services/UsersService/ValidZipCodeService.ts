import DefaultResponse from 'App/Utils/DefaultResponse'
import ViaCepServices from 'App/Services/Http/ViaCepServices/ViaCepServices'

export default class ValidZipCodeService {
  constructor(
    private readonly defaultResponse: DefaultResponse,
    private readonly viaCepService: ViaCepServices
  ) {
    this.viaCepService = viaCepService
    this.defaultResponse = defaultResponse
  }

  public async validZipCode(zipCode: string) {
    await this.viaCepService.getAddress(zipCode)

    return await this.defaultResponse.success('Zipcode is valid', 200)
  }
}
