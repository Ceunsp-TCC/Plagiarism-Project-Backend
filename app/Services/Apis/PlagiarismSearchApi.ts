import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export const plagiarismSearchApi = axios.create({
  baseURL: Env.get('PLAGIARISM_SEARCH_API_URL'),
  auth: {
    username: Env.get('PLAGIARISM_SEARCH_API_USER'),
    password: Env.get('PLAGIARISM_SEARCH_API_KEY'),
  },
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
