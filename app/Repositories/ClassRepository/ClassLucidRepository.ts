import Classes from 'App/Models/Classes'
import type { ClassRepositoryDto } from 'App/Dtos/Class/ClassDto'
import type ClassRepositoryInterface from 'App/Interfaces/Repositories/ClassRepositoryInterface'

export default class ClassLucidRepository implements ClassRepositoryInterface {
  constructor(private readonly model: typeof Classes) {}

  public async create(ClassRepositoryDto: ClassRepositoryDto) {
    const createClass = await this.model.create(ClassRepositoryDto)

    return createClass
  }
}
