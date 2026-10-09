import type { RequestHandler } from 'express'
import { UnauthorizedError } from '../errors/AppError'
import { TokenService } from '../../modules/auth/token.service'

const tokenService = new TokenService()

export const authenticate: RequestHandler = (req, _res, next) => {
  const header = req.headers.authorization

  // El formato estándar es: "Authorization: Bearer <token>"
  if (!header?.startsWith('Bearer ')) {
    throw new UnauthorizedError('Falta el token de autenticación')
  }

  const token = header.slice('Bearer '.length)
  req.user = tokenService.verify(token) // si es inválido, lanza 401
  next()
}