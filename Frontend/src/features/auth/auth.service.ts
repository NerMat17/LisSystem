import { api } from '@/lib/api'
import type { AuthSession, LoginData } from './auth.types'

export const authService = {
  login: (data: LoginData) => api.post<AuthSession>('/auth/login', data),
}