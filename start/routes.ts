import Route from '@ioc:Adonis/Core/Route'

Route.get('/health', 'HealthController.health')

Route.group(() => {
  Route.group(() => {
    Route.post('/login', 'AuthController.login')
  }).prefix('auth')
  Route.group(() => {
    Route.post('/send-work-analyse', 'WorkAnalysesController.analyseWork')
  }).prefix('works')
  Route.group(() => {
    Route.post('/create', 'SchoolsController.store')
  }).prefix('schools')
  Route.group(() => {
    //Logged routes
    Route.group(() => {
      Route.get('/me', 'AuthController.me')
      Route.post('/logout', 'AuthController.logout')
    }).prefix('auth')
  }).middleware('auth')
}).prefix('v1')
