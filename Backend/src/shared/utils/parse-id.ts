import { AppError } from '../errors/AppError'

export function parseId(value: string): number {
  const id = Number(value)
  if (!Number.isInteger(id) || id <= 0) throw new AppError(400, 'Id inválido')
  return id
}