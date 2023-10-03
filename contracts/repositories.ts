declare module '@ioc:Repositories/UserRepository' {
  import type UserRepositoryInterface from 'App/Interfaces/Repositories/UserRepositoryInterface'
  const UserRepository: UserRepositoryInterface
  export default UserRepository
}

declare module '@ioc:Repositories/RoleRepository' {
  import type RoleRepositoryInterface from 'App/Interfaces/Repositories/RoleRepositoryInterface'
  const RoleRepository: RoleRepositoryInterface
  export default RoleRepository
}
declare module '@ioc:Repositories/PermissionRepository' {
  import type PermissionRepositoryInterface from 'App/Interfaces/Repositories/PermissionRepositoryInterface'
  const PermissionRepository: PermissionRepositoryInterface
  export default PermissionRepository
}

declare module '@ioc:Repositories/TeacherRepository' {
  import type TeacherRepositoryInterface from 'App/Interfaces/Repositories/TeacherRepositoryInterface'
  const TeacherRepository: TeacherRepositoryInterface
  export default TeacherRepository
}
declare module '@ioc:Repositories/StudentRepository' {
  import type StudentRepositoryInterface from 'App/Interfaces/Repositories/StudentRepositoryInterface'
  const StudentRepository: StudentRepositoryInterface
  export default StudentRepository
}

declare module '@ioc:Repositories/CourseRepository' {
  import type CourseRepositoryInterface from 'App/Interfaces/Repositories/CourseRepositoryInterface'
  const CourseRepository: CourseRepositoryInterface
  export default CourseRepository
}

declare module '@ioc:Repositories/SemesterRepository' {
  import type SemesterRepositoryInterface from 'App/Interfaces/Repositories/SemesterRepositoryInterface'
  const SemesterRepository: SemesterRepositoryInterface
  export default SemesterRepository
}

declare module '@ioc:Repositories/LessonRepository' {
  import type LessonRepositoryInterface from 'App/Interfaces/Repositories/LessonRepositoryInterface'
  const LessonRepository: LessonRepositoryInterface
  export default LessonRepository
}

declare module '@ioc:Repositories/ClassRepository' {
  import type ClassRepositoryInterface from 'App/Interfaces/Repositories/ClassRepositoryInterface'
  const ClassRepository: ClassRepositoryInterface
  export default ClassRepository
}

declare module '@ioc:Repositories/ActivityRepository' {
  import type ActivityRepositoryInterface from 'App/Interfaces/Repositories/ActivityRepositoryInterface'
  const ActivityRepository: ActivityRepositoryInterface
  export default ActivityRepository
}
declare module '@ioc:Repositories/AcademicPaperRepository' {
  import type AcademicPapersRepositoryInterface from 'App/Interfaces/Repositories/AcademicPapersRepositoryInterface'
  const AcademicPaperRepository: AcademicPapersRepositoryInterface
  export default AcademicPaperRepository
}
