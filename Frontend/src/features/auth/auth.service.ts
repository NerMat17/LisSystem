import { ROLES, type Role } from '@/types/roles'
import type { AuthSession, LoginData } from './auth.types'

// TEMPORAL: usuarios de prueba hasta conectar el backend
const MOCK_USERS: Array<{
  id: number
  employeeNumber: string
  name: string
  role: Role
  password: string | null
}> = [
  { id: 1, employeeNumber: '1001', name: 'Abner Matías', role: ROLES.ADMIN, password: 'Admin12345' },
  { id: 2, employeeNumber: '1002', name: 'Laura Gómez', role: ROLES.SUPERVISOR, password: 'Super12345' },
  { id: 3, employeeNumber: '2001', name: 'Juan Pérez', role: ROLES.OPERADOR, password: null },
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const authService = {
  async login(data: LoginData): Promise<AuthSession> {
    await delay(800)

    const found = MOCK_USERS.find((u) => u.employeeNumber === data.employeeNumber)

    if (!found || found.password === null || found.password !== data.password) {
      throw new Error('Número de empleado o contraseña incorrectos')
    }

    return {
      accessToken: 'mock-token',
      user: {
        id: found.id,
        employeeNumber: found.employeeNumber,
        name: found.name,
        role: found.role,
      },
    }
  },
}