import type { Role } from '@/types/roles'

export interface LoginData {
  employeeNumber: string
  password: string
}

export interface AuthUser {
  id: number
  employeeNumber: string
  name: string
  role: Role
}

export interface AuthSession {
  accessToken: string
  user: AuthUser
}