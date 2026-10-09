import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken'
import { env } from '../../config/env'
import { UnauthorizedError } from '../../shared/errors/AppError'
import type { AuthUser } from './auth.types'

interface TokenClaims {
  employeeNumber: string
  name: string
  role: string
}

export class TokenService {
  sign(user: AuthUser): string {
    const claims: TokenClaims = {
      employeeNumber: user.employeeNumber,
      name: user.name,
      role: user.role,
    }

    return jwt.sign(claims, env.JWT_SECRET, {
      subject: String(user.id),
      expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
      algorithm: 'HS256',
    })
  }

  verify(token: string): AuthUser {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET, { algorithms: ['HS256'] }) as JwtPayload & TokenClaims

      return {
        id: Number(decoded.sub),
        employeeNumber: decoded.employeeNumber,
        name: decoded.name,
        role: decoded.role,
      }
    } catch {
      throw new UnauthorizedError('Token inválido o expirado')
    }
  }
}