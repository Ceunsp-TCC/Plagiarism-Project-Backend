export interface TeacherDto {
  schoolId: number
  CPF: string
  CND: string
}

export interface TeacherDtoResponse {
  id: number
  name: string
  phoneNumber: string
  email: string
  cpf: string
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string
}
