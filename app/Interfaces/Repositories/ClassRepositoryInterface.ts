import Classes from 'App/Models/Classes'
import type { ClassRepositoryDto } from 'App/Dtos/Class/ClassDto'

export default interface ClassRepositoryInterface {
  create(ClassRepositoryDto: ClassRepositoryDto): Promise<Classes>
}
