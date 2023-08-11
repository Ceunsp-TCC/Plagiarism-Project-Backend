import Semesters from 'App/Models/Semesters'
import type { SemesterDto } from 'App/Dtos/Semesters/SemesterDto'

export default interface SemesterRepositoryInterface {
  create(semesterDto: SemesterDto): Promise<Semesters>
  findById(semesterId: number): Promise<Semesters | null>
}
