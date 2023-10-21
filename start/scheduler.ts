import Scheduler from '@ioc:Adonis/Addons/Scheduler'

Scheduler.call(() => {
  console.log('Scheduler Work')
}).everySecond()
