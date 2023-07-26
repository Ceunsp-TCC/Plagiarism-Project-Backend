import DefaultResponse from '@ioc:Utils/DefaultResponse'
import ViaCep from '@ioc:ExternalApis/ViaCep'

export default class ValidZipCodeService {
  public async validZipCode(zipCode: string) {
    await ViaCep.getAddress(zipCode)

    return await DefaultResponse.success('Zipcode is valid', 200)
  }
}
