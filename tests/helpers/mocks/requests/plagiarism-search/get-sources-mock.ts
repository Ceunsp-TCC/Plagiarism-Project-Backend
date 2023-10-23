import Env from '@ioc:Adonis/Core/Env'
import nock from 'nock'

export const getSourcesMock = () => {
  nock(Env.get('PLAGIARISM_SEARCH_API_URL'))
    .get('/reports/sources/7495625')
    .reply(200, {
      status: true,
      code: 200,
      data: {
        sources: [
          {
            report_id: 7495625,
            rb_id: 311979258,
            file_id: 0,
            title: 'vestibulares.estrategia.com',
            url: 'https://vestibulares.estrategia.com/portal/materias/historia/historia-do-brasil/',
            view_url:
              'https://plagiarismsearch.com/sources/7495625?rb=311979258&url=https%3A%2F%2Fvestibulares.estrategia.com%2Fportal%2Fmaterias%2Fhistoria%2Fhistoria-do-brasil%2F',
            plagiat: 96.5,
            plagiarism: 96.5,
            plagiat_quote: null,
            plagiarism_quote: null,
            matches: 57,
            matches_quote: 0,
            status: 3,
            status_label: 'checked',
            type: 1,
            type_label: 'web',
            skipped: 0,
            count: 5,
            length: 100,
            matched_words: 59,
          },
          {
            report_id: 7495625,
            rb_id: 311979258,
            file_id: 0,
            title: 'passeidireto.com',
            url: 'https://www.passeidireto.com/arquivo/128754777/resumo-historia-do-brasil',
            view_url:
              'https://plagiarismsearch.com/sources/7495625?rb=311979258&url=https%3A%2F%2Fwww.passeidireto.com%2Farquivo%2F128754777%2Fresumo-historia-do-brasil',
            plagiat: 96.5,
            plagiarism: 96.5,
            plagiat_quote: null,
            plagiarism_quote: null,
            matches: 57,
            matches_quote: 0,
            status: 3,
            status_label: 'checked',
            type: 1,
            type_label: 'web',
            skipped: 0,
            count: 5,
            length: 100,
            matched_words: 59,
          },
        ],
      },
    })
}
