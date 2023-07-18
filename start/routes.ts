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
    }).prefix('teachers')
    Route.group(() => {
      Route.get('/me', 'AuthController.me')
      Route.post('/logout', 'AuthController.logout')
    }).prefix('auth')
  }).middleware('auth')
}).prefix('v1')
