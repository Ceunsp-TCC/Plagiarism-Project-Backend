import type {AuthConfig} from '@ioc:Adonis/Addons/Auth'

const authConfig: AuthConfig = {
  guard: 'api',
  guards: {
    api: {
      driver: 'oat',
      tokenProvider: {
        type: 'api',
        driver: 'database',
        table: 'apiTokens',
        foreignKey: 'idSchool',
      },

      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],

        model: () => import('App/Models/Schools'),
      },
    },
  },
}

export default authConfig
