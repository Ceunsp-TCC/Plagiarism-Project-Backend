import DefaultResponse from 'App/Utils/DefaultResponse'
import UserLucidRepository from 'App/Repositories/UserRepository/UserLucidRepository'
import type { CreateSchoolDto } from 'App/Dtos/Services/SchoolServices/CreateSchoolServiceDto'
import RoleLucidRepository from 'App/Repositories/RoleRepository/RoleLucidRepository'
import ViaCepServices from 'App/Services/Http/ViaCepServices/ViaCepServices'

export default class CreateSchoolService {
  constructor(
    private readonly defaultResponse: DefaultResponse,
    private readonly userRepository: UserLucidRepository,
    private readonly roleRepository: RoleLucidRepository,
    private readonly viaCepService: ViaCepServices
  ) {
    this.userRepository = userRepository
    this.roleRepository = roleRepository
    this.defaultResponse = defaultResponse
    this.viaCepService = viaCepService
  }

  public async create({ name, email, CNPJ, address, password, phoneNumber }: CreateSchoolDto) {
    const roleSchool = await this.roleRepository.findByName('SCHOOL')

    const getAddress = await this.viaCepService.getAddress(address.CEP)
    const user = {
      name,
      email,
      phoneNumber: phoneNumber.replace(/\D/g, ''),
      password,
      roleName: 'SCHOOL',
      roleId: roleSchool?.id!,
    }
    const school = {
      CNPJ: CNPJ.replace(/\D/g, ''),
      CEP: address.CEP.replace(/\D/g, ''),
      district: getAddress?.bairro!,
      street: getAddress?.logradouro!,
      city: getAddress?.localidade!,
      state: getAddress?.uf!,
      complement: address.complement,
      number: address.number,
    }

    await this.userRepository.createSchool(user, school)
    return await this.defaultResponse.success('School created successfully', 201)
  }
}
