import AcademicPapers from 'App/Models/AcademicPapers'
import { DefaultPaginateDtoResponse } from 'App/Dtos/Utils/DefaultPaginateDto'
import DefaultPaginate from '@ioc:Utils/DefaultPaginate'
import type AcademicPapersRepositoryInterface from 'App/Interfaces/Repositories/AcademicPapersRepositoryInterface'
import type {
  AcademicPaperDto,
  AcademicPaperDtoResponse,
} from 'App/Dtos/AcademicPapers/AcademicPaperDto'
import { AnalysisStatus } from 'App/Dtos/AcademicPapers/AcademicPaperDto'
import type { SimplePaginatorContract } from '@ioc:Adonis/Lucid/Database'

export default class AcademicPapersLucidRepository implements AcademicPapersRepositoryInterface {
  constructor(private readonly model: typeof AcademicPapers) {}

  public async create(academicPaperDto: AcademicPaperDto) {
    const academicPaper = await this.model.create(academicPaperDto)

    return academicPaper
  }

  public async getAll(
    activityId: number,
    currentPage: number,
    numberlinesPerPage: number
  ): Promise<DefaultPaginateDtoResponse<AcademicPaperDtoResponse>> {
    const academicPapers = await this.model
      .query()
      .where('activityId', activityId)
      .preload('student', (studentBuilder) => {
        studentBuilder.preload('user')
      })
      .orderBy('createdAt', 'desc')
      .paginate(currentPage!, numberlinesPerPage)

    return DefaultPaginate.formatToDefaultPaginate<AcademicPaperDtoResponse>({
      items: (await academicPapers.all()) as unknown as AcademicPaperDtoResponse[],
      paginateProperties:
        academicPapers as unknown as SimplePaginatorContract<AcademicPaperDtoResponse>,
    })
  }

  public async getByStudentIdAndActivityId(
    studentId: number,
    activityId: number
  ): Promise<AcademicPapers | null> {
    return await this.model
      .query()
      .where('studentId', studentId)
      .where('activityId', activityId)
      .first()
  }

  public async getById(academicPaperId: number): Promise<AcademicPapers | null> {
    return await this.model.query().where('id', academicPaperId).preload('report').first()
  }

  public async updateAnalyseStatus(
    academicPaperId: number,
    status: AnalysisStatus
  ): Promise<boolean> {
    const academicPaper = await this.model.query().where('id', academicPaperId).first()

    return !!(await academicPaper?.merge({ analysisStatus: status }))?.save()
  }
}
