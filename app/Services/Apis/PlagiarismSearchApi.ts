import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export const plagiarismSearchApi = axios.create({
  baseURL: Env.get('PLAGIARISM_SEARCH_API_URL'),
  headers: {
    Authorization: Env.get('PLAGIARISM_SEARCH_API_TOKEN'),
  },
})
