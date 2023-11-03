import { AnalysisStatus } from 'App/Dtos/AcademicPapers/AcademicPaperDto'
import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeFind,
  beforeFetch,
  BelongsTo,
  belongsTo,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Students from 'App/Models/Students'
import Activities from 'App/Models/Activities'
import PlagiarismReport from 'App/Models/PlagiarismReport'
import type { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

export default class AcademicPapers extends BaseModel {
  public static table = 'academicPapers'
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'activityId', serializeAs: null })
  public activityId: number

  @column({ columnName: 'studentId', serializeAs: null })
  public studentId: number

  @column()
  public paper: string

  @column()
  public comments?: string

  @column({ serialize: (value) => (value !== null ? Number(value) : null) })
  public note?: number

  @column({ columnName: 'analysisStatus', serializeAs: 'analysisStatus' })
  public analysisStatus?: AnalysisStatus

  @column.dateTime({
    autoCreate: true,
    columnName: 'createdAt',
    serializeAs: 'createdAt',
    serialize: (value) => value.toFormat('dd/MM/yyyy HH:mm:ss'),
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: null,
    columnName: 'updatedAt',
  })
  public updatedAt: DateTime

  @column.dateTime({ columnName: 'deletedAt', serializeAs: null })
  public deletedAt: DateTime

  @beforeFind()
  public static async ignoreDeletedFind(query: ModelQueryBuilderContract<typeof AcademicPapers>) {
    query.whereNull('deletedAt')
  }
  @beforeFetch()
  public static async ignoreDeletedFetch(query: ModelQueryBuilderContract<typeof AcademicPapers>) {
    query.whereNull('deletedAt')
  }

  public async delete() {
    this.deletedAt = DateTime.local()
    await this.save()
  }

  @belongsTo(() => Activities, {
    localKey: 'activityId',
    foreignKey: 'id',
  })
  public activity: BelongsTo<typeof Activities>

  @hasOne(() => Students, {
    localKey: 'studentId',
    foreignKey: 'id',
  })
  public student: HasOne<typeof Students>

  @hasOne(() => PlagiarismReport, {
    localKey: 'id',
    foreignKey: 'academicPaperId',
  })
  public report: HasOne<typeof PlagiarismReport>
}
