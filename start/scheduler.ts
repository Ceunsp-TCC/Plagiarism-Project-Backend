import Scheduler from '@ioc:Adonis/Addons/Scheduler'

Scheduler.command('plagiarism-search-invoice:cron-job').everyTwoHours()
Scheduler.command('text-gears-invoice:cron-job').everyThreeHours()
