import { test } from '@japa/runner'

import PlagiarismReportFactory from 'Database/factories/PlagiarismReportFactory'
import ActivityFactory from 'Database/factories/ActivityFactory'
import AcademicPaperFactory from 'Database/factories/AcademicPaperFactory'
import { getSourcesMock } from '../../helpers/mocks'

const url = '/v1/webhooks/plagiarism'

test.group('Webhook plagiarism', () => {
  test('Should be receive webhook with success', async ({ client }) => {
    getSourcesMock()
    const activity = await ActivityFactory.create()
    const academicPaper = await AcademicPaperFactory.merge({ activityId: activity.id }).create()
    await PlagiarismReportFactory.merge({ academicPaperId: academicPaper.id }).create()

    const body = {
      id: 7495625,
      plagiarism: 32.46,
      ai_probability: 32.46,
      status: 2,
    }
    const sut = await client.post(url).json(body)

    sut.assertStatus(200)
    sut.assertBodyContains({ message: 'Webhook received and processed successfully' })
  })
})
