import DefaultResponse from 'App/Utils/DefaultResponse'
import UserLucidRepository from 'App/Repositories/UserRepository/UserLucidRepository'
import type { CreateSchoolDto } from 'App/Dtos/Services/SchoolServices/CreateSchoolServiceDto'
import RoleLucidRepository from 'App/Repositories/RoleRepository/RoleLucidRepository'

export default class CreateSchoolService {
  constructor(
    private readonly defaultResponse: DefaultResponse,
    private readonly userRepository: UserLucidRepository,
    private readonly roleRepository: RoleLucidRepository
  ) {
    this.userRepository = userRepository
    this.roleRepository = roleRepository
    this.defaultResponse = defaultResponse
  }

  public async create({ name, email, CNPJ, address, password, phoneNumber }: CreateSchoolDto) {
    const roleSchool = await this.roleRepository.findByName('SCHOOL')
    const user = {
      name,
      email,
      phoneNumber,
      password,
      roleName: 'SCHOOL',
      roleId: roleSchool?.id!,
    }
    const school = {
      CNPJ,
      CEP: address.CEP,
      district: address.district,
      street: address.street,
      city: address.city,
      state: address.state,
      complement: address.complement,
      number: address.number,
    }

    await this.userRepository.createSchool(user, school)
    return await this.defaultResponse.success('School created successfully', 201)
  }
}
