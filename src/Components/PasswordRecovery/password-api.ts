import axios from 'axios'
import { PasswordRecoveryInitialStateType } from './passwordRecovery-reducer'

const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/'
})

export const authAPI = {
  createNewPassword(data: PasswordRecoveryInitialStateType) {
    return instance.post<RequestResponeType>('auth/forgot', data)
  }
}

export type RequestResponeType = {
  info: string
  error: string
}