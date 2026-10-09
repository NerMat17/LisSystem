import type { RequestHandler } from 'express'
import { ForbiddenError, UnauthorizedError } from '../errors/AppError'

export const authorize = (...allowedRoles: string[]): RequestHandler => (req, _res, next) => {
  if (!req.user) throw new UnauthorizedError()
  if (!allowedRoles.includes(req.user.role)) throw new ForbiddenError()
  next()
}