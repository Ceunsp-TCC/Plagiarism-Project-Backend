import Semesters from 'App/Models/Semesters'
import type SemesterRepositoryInterface from 'App/Interfaces/Repositories/SemesterRepositoryInterface'
import type { SemesterDto } from 'App/Dtos/Semesters/SemesterDto'

export default class SemesterLucidRepository implements SemesterRepositoryInterface {
  constructor(private readonly model: typeof Semesters) {}

  public async create(semesterDto: SemesterDto) {
    const semester = await this.model.create(semesterDto)

    return semester
  }

  public async findById(semesterId: number): Promise<Semesters | null> {
    const semester = await this.model.query().where('id', semesterId).first()

    return semester
  }
}
