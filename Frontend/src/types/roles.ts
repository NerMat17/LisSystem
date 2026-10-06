export const ROLES = {
  ADMIN: 'ADMIN',
  SUPERVISOR: 'SUPERVISOR',
  TECNICO: 'TECNICO',
  OPERADOR: 'OPERADOR',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]