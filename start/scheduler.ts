import Scheduler from '@ioc:Adonis/Addons/Scheduler'

Scheduler.command('plagiarism-search-invoice:cron-job').everyMinutes(3)
