import type { Request, Response } from 'express'
import { UnauthorizedError } from '../../shared/errors/AppError'
import type { AuthService } from './auth.service'

export class AuthController {
  constructor(private readonly service: AuthService) {}

  // POST /api/auth/login
  login = async (req: Request, res: Response) => {
    res.json(await this.service.login(req.body))
  }

  // GET /api/auth/me
  me = async (req: Request, res: Response) => {
    if (!req.user) throw new UnauthorizedError()
    res.json(await this.service.me(req.user.id))
  }
}