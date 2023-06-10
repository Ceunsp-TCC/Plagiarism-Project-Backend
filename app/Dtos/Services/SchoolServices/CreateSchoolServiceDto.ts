export interface Address {
  CEP: string
  street: string
  district: string
  city: string
  state: string
  complement?: string
  number?: number
}

export interface CreateSchoolDto {
  name: string
  CNPJ: string
  phoneNumber: string
  email: string
  password: string
  address: Address
}
