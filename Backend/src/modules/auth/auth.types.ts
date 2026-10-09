// El usuario autenticado: lo que va dentro del token y en req.user
export interface AuthUser {
  id: number
  employeeNumber: string
  name: string
  role: string
}

// Lo que responde el login
export interface LoginResponse {
  accessToken: string
  user: AuthUser
}

// Solo para uso interno del login: incluye el hash
export interface UserWithPassword extends AuthUser {
  isActive: boolean
  passwordHash: string | null
}

export interface IAuthRepository {
  findByEmployeeNumberWithPassword(employeeNumber: string): Promise<UserWithPassword | null>
  findActiveUserById(id: number): Promise<AuthUser | null>
}