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
    }).prefix('lessons')

    Route.group(() => {
      Route.get('/me', 'AuthController.me')
      Route.post('/logout', 'AuthController.logout')
    }).prefix('auth')
  }).middleware('auth')
}).prefix('v1')
