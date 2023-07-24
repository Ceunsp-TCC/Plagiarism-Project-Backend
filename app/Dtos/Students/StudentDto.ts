export interface StudentDto {
  schoolId: number
  CPF: string
}

export interface StudentDtoResponse {
  id: number
  name: string
  phoneNumber: string
  email: string
  cpf: string
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string
}
