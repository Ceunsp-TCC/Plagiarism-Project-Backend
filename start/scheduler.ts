import Scheduler from '@ioc:Adonis/Addons/Scheduler'

Scheduler.call(() => console.log('test')).everySeconds(5)
