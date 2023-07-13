import DefaultResponse from '@ioc:Utils/DefaultResponse'
import UserRepository from '@ioc:Repositories/UserRepository'
import RoleRepository from '@ioc:Repositories/RoleRepository'
import type { CreateSchoolDto } from 'App/Dtos/Services/SchoolServices/CreateSchoolServiceDto'
import ViaCep from '@ioc:ExternalApis/ViaCep'
import Ntfy from '@ioc:ExternalApis/Ntfy'
import Env from '@ioc:Adonis/Core/Env'
import { base64 } from '@ioc:Adonis/Core/Helpers'
export default class CreateSchoolService {
  private notificationObject(user: any) {
    delete user.password

    const credentialsEncoded = base64.encode(
      `${Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME')}:${Env.get(
        'SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD'
      )}`
    )

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
            'Authorization': `Basic ${credentialsEncoded}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'COMPLETED' }),
        },
        {
          action: 'http' as any,
          label: 'review',
          url: `${Env.get('APP_URL')}/v1/schools/update-status/${user.schoolId} `,
          method: 'PUT' as any,
          headers: {
            'Authorization': `Basic ${credentialsEncoded}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'INREVIEW' }),
        },
        {
          action: 'http' as any,
          label: 'canceled',
          url: `${Env.get('APP_URL')}/v1/schools/update-status/${user.schoolId}`,
          method: 'PUT' as any,
          headers: {
            'Authorization': `Basic ${credentialsEncoded}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'CANCELED' }),
        },
      ],
    }
  }

  public async create({ name, email, CNPJ, address, password, phoneNumber }: CreateSchoolDto) {
    const roleSchool = await RoleRepository.findByName('SCHOOL')

    const getAddress = await ViaCep.getAddress(address.CEP)
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

    const createSchool = await UserRepository.createSchool(user, school)

    await Ntfy.sendNotification(
      this.notificationObject({ ...user, ...school, schoolId: createSchool.userId })
    )

    return await DefaultResponse.success('School created successfully', 201)
  }
}
