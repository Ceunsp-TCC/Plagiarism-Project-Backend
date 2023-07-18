import Env from '@ioc:Adonis/Core/Env'

export const basicCredentials = {
  username: Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_USERNAME'),
  password: Env.get('SCHOOL_GUARDIAN_AUTHENTICATOR_PASSWORD'),
}
