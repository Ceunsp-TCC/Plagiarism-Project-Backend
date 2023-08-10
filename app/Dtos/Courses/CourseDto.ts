import type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'

export interface CourseRepositoryDto {
  name: string
  description?: string
  modality: 'HYBRID' | 'INPERSON' | 'ONLINE'
  category: string
  price: number
  image: string
  schoolId: number
}

export interface CourseServiceDto {
  name: string
  description?: string
  modality: 'HYBRID' | 'INPERSON' | 'ONLINE'
  category: string
  price: number
  image: MultipartFileContract
  schoolId: number
}
export interface CourseDtoResponse {
  id: number
  name: string
  description: string
  modality: string
  category: string
  price: number
  image: string
  createdAt: string
}
