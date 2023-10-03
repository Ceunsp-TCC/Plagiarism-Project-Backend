import AcademicPapers from 'App/Models/AcademicPapers'
import type AcademicPapersRepositoryInterface from 'App/Interfaces/Repositories/AcademicPapersRepositoryInterface'
import type { AcademicPaperDto } from 'App/Dtos/AcademicPapers/AcademicPaperDto'

export default class AcademicPapersLucidRepository implements AcademicPapersRepositoryInterface {
  constructor(private readonly model: typeof AcademicPapers) {}

  public async create(academicPaperDto: AcademicPaperDto) {
    const academicPaper = await this.model.create(academicPaperDto)

    return academicPaper
  }
}
