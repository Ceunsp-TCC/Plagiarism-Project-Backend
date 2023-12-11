import Route from '@ioc:Adonis/Core/Route'

Route.get('/health', 'HealthController.health')

Route.group(() => {
  //not logged routes
  Route.group(() => {
    Route.group(() => {
      Route.post('/login', 'AuthController.login')
    }).prefix('auth')

    Route.group(() => {
      Route.post('/create', 'SchoolsController.store')
      Route.post('/valid-document', 'SchoolsController.validDocument')
      Route.put('/update-status/:id', 'SchoolsController.updateStatus')
    }).prefix('schools')

    Route.group(() => {
      Route.post('/valid-email', 'UsersController.validEmail')
      Route.post('/valid-zipcode', 'UsersController.validZipCode')
      Route.put('/update-password/:id', 'UsersController.updatePassword')
    }).prefix('users')
  }).middleware('basicAuth')

  //Logged routes
  Route.group(() => {
    Route.group(() => {
      Route.post('/create', 'PermissionsController.store').middleware('permission:createPermission')
    }).prefix('permissions')

    Route.group(() => {
      Route.post('/create', 'RolesController.store').middleware('permission:createRole')
      Route.post('/sync-roles-permissions', 'RolesController.syncPermissionsAndRoles').middleware(
        'permission:syncRolesPermissions'
      )
    }).prefix('roles')

    Route.group(() => {
      Route.post('/create', 'TeachersController.store').middleware('permission:createTeacher')
      Route.get('/get-all', 'TeachersController.index').middleware('permission:getTeachers')
    }).prefix('teachers')

    Route.group(() => {
      Route.post('/create', 'StudentsController.store').middleware('permission:createStudent')
      Route.get('/get-all', 'StudentsController.index').middleware('permission:getStudents')
    }).prefix('students')

    Route.group(() => {
      Route.post('/create', 'CoursesController.store').middleware('permission:createCourse')
      Route.get('/get-all', 'CoursesController.index').middleware('permission:getCourses')
      Route.get('/get-by-id/:courseId', 'CoursesController.show').middleware('permission:getCourse')
    }).prefix('courses')

    Route.group(() => {
      Route.post('/create/:courseId', 'SemestersController.store').middleware(
        'permission:createSemester'
      )
    }).prefix('semesters')

    Route.group(() => {
      Route.post('/create/:semesterId', 'LessonsController.store').middleware(
        'permission:createLesson'
      )
      Route.get('/get-lessons-by-teacher', 'LessonsController.getLessonsByTeacher').middleware(
        'permission:getLessonsByTeacher'
      )
      Route.get('/get-lessons-by-student', 'LessonsController.getLessonsByStudent').middleware(
        'permission:getLessonsByStudent'
      )
    }).prefix('lessons')

    Route.group(() => {
      Route.post('/create/:courseId', 'ClassesController.store').middleware(
        'permission:createClass'
      )
      Route.get('/get-all', 'ClassesController.index').middleware('permission:getClasses')
      Route.get('/get-by-id/:classId', 'ClassesController.show').middleware('permission:getClass')
      Route.get('/get-students/:classId', 'ClassesController.getStudents').middleware(
        'permission:getStudentsByClass'
      )
      Route.put('/link-teacher-and-lesson', 'ClassesController.linkTeacherWithLesson').middleware(
        'permission:linkTeacherAndLessonInClass'
      )
    }).prefix('classes')

    Route.group(() => {
      Route.post('/create/:lessonId', 'ActivitiesController.store').middleware(
        'permission:createActivity'
      )
      Route.get('/get-all/:lessonId', 'ActivitiesController.index').middleware(
        'permission:getActivities'
      )

      Route.get('/get-by-id/:activityId', 'ActivitiesController.show').middleware(
        'permission:getActivity'
      )
    }).prefix('activities')

    Route.group(() => {
      Route.post('/send/:activityId', 'AcademicPapersController.store').middleware(
        'permission:sendAcademicPaper'
      )

      Route.get('/get-all/:activityId', 'AcademicPapersController.index').middleware(
        'permission:getAcademicPapers'
      )

      Route.get('/get-by-id/:academicPaperId', 'AcademicPapersController.show').middleware(
        'permission:getAcademicPaper'
      )

      Route.post(
        '/plagiarism-analyse/:academicPaperId',
        'AcademicPapersController.plagiarismAnalyse'
      ).middleware('permission:plagiarismAnalyse')

      Route.put('/send-note/:academicPaperId', 'AcademicPapersController.sendNote').middleware(
        'permission:sendNoteForAcademicPaper'
      )
    }).prefix('academic-paper')

    Route.group(() => {
      Route.post('/create', 'OrtographyCorrectionsController.store').middleware(
        'permission:createNewOrtographyCorrection'
      )

      Route.get('/get-all', 'OrtographyCorrectionsController.index').middleware(
        'permission:viewOrtographyCorrections'
      )

      Route.get(
        '/get-by-id/:ortographyCorrectionId',
        'OrtographyCorrectionsController.show'
      ).middleware('permission:viewOneOrtographyCorrection')
    }).prefix('ortography-corrections')

    Route.group(() => {
      Route.get('/get-current', 'NotificationsController.show')
    }).prefix('notifications')

    Route.group(() => {
      Route.get('/me', 'AuthController.me')
      Route.post('/logout', 'AuthController.logout')
    }).prefix('auth')
  }).middleware('auth')

  Route.group(() => {
    Route.post('/plagiarism', 'WebhooksController.plagiarism')
  }).prefix('webhooks')

  Route.get('/test', async (ctx) => {
    console.log(ctx)
  })
}).prefix('v1')
