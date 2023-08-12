import DefaultResponse from '@ioc:Utils/DefaultResponse'
// import CourseRepository from '@ioc:Repositories/CourseRepository'
import { translate } from 'google-translate-api-browser'
import * as tf from '@tensorflow/tfjs-node'
import * as qna from '@tensorflow-models/qna'

export default class GetCourseByIdService {
  public async getById(questionParam: string, passageParam: string) {
    try {
      await tf.ready()
      const model = await qna.load()

      const answers = await model.findAnswers(questionParam, passageParam)

      return DefaultResponse.successWithContent('IA OK', 200, answers)
    } catch (error) {
      console.error('Erro:', error)
    }
  }
}
