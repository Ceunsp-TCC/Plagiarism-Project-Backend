import DefaultResponse from 'App/Utils/DefaultResponse'
import UserLucidRepository from 'App/Repositories/UserRepository/UserLucidRepository'
import type { CreateSchoolDto } from 'App/Dtos/Services/SchoolServices/CreateSchoolServiceDto'
import RoleLucidRepository from 'App/Repositories/RoleRepository/RoleLucidRepository'
import ViaCepServices from 'App/Services/Http/ViaCepServices/ViaCepServices'
import NtfyServices from 'App/Services/Http/NtfyServices/NtfyServices'
import Application from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'
import { base64 } from '@ioc:Adonis/Core/Helpers'
export default class CreateSchoolService {
  constructor(
    private readonly defaultResponse: DefaultResponse,
    private readonly userRepository: UserLucidRepository,
    private readonly roleRepository: RoleLucidRepository,
    private readonly viaCepService: ViaCepServices,
    private readonly ntfyServices: NtfyServices
  ) {
    this.userRepository = userRepository
    this.roleRepository = roleRepository
    this.defaultResponse = defaultResponse
    this.viaCepService = viaCepService
    this.ntfyServices = ntfyServices
  }

  private notificationObject(user: any) {
    delete user.password

    const credentialsEncoded = base64.encode(
      `${Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME')}:${Env.get(
        'SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD'
      )}`
    )
    console.log(credentialsEncoded)
    return {
      topic: Env.get('NTFY_TOPIC_NEW_SCHOOL'),
      title: 'New school created at School Guardian',
      message: `Please, take a look at the school information : ${JSON.stringify(user)}`,
      actions: [
        {
          action: 'http' as any,
          label: 'approve',
          url: `${Env.get('APP_URL')}/v1/schools/update-status/${user.schoolId}`,
          method: 'PUT' as any,
          headers: {
            Authorization: `Basic ${credentialsEncoded}`,
          },
          body: '{"status": "COMPLETED"}',
        },
        {
          action: 'http' as any,
          label: 'review',
          url: `${Env.get('APP_URL')}/v1/schools/update-status/${user.schoolId} `,
          method: 'PUT' as any,
          headers: {
            Authorization: `Basic ${credentialsEncoded}`,
          },
          body: '{"status": "INREVIEW"}',
        },
        {
          action: 'http' as any,
          label: 'canceled',
          url: `${Env.get('APP_URL')}/v1/schools/update-status/${user.schoolId}`,
          method: 'PUT' as any,
          headers: {
            Authorization: `Basic ${credentialsEncoded}`,
          },
          body: '{"status": "CANCELED"}',
        },
      ],
    }
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

    const createSchool = await this.userRepository.createSchool(user, school)

    const enabledNotification = Application.inTest || Application.inProduction
    if (enabledNotification) {
      await this.ntfyServices.sendNotification(
        this.notificationObject({ ...user, ...school, schoolId: createSchool.userId })
      )
    }

    return await this.defaultResponse.success('School created successfully', 201)
  }
}
