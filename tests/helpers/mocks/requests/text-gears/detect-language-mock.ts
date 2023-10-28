import Env from '@ioc:Adonis/Core/Env'
import nock from 'nock'

export const detectLanguageMockValid = () => {
  nock(Env.get('TEXT_GEARS_URL'))
    .post('/detect')
    .reply(200, {
      status: true,
      response: {
        language: 'en',
        dialect: 'en-GB',
        probabilities: {
          en: 0.92,
          it: 0.871,
          fr: 0.863,
          es: 0.85,
          de: 0.845,
          pt: 0.84,
          zh: 0.688,
          el: 0.278,
          ru: 0.206,
          ko: 0.124,
          jp: 0.122,
          ar: 0.058,
        },
      },
    })
}
export const detectLanguageMockInvalid = () => {
  nock(Env.get('TEXT_GEARS_URL'))
    .post('/detect')
    .reply(200, {
      status: true,
      response: {
        language: 'pt',
        dialect: 'pt-BR',
        probabilities: {
          en: 0.92,
          it: 0.871,
          fr: 0.863,
          es: 0.85,
          de: 0.845,
          pt: 0.84,
          zh: 0.688,
          el: 0.278,
          ru: 0.206,
          ko: 0.124,
          jp: 0.122,
          ar: 0.058,
        },
      },
    })
}
