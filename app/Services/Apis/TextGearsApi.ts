import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export const textGearsApi = axios.create({
  baseURL: Env.get('TEXT_GEARS_URL'),
})
