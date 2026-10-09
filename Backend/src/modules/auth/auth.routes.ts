import { Router } from 'express'
import { validateBody } from '../../shared/middlewares/validate.middleware'
import { authenticate } from '../../shared/middlewares/authenticate.middleware'
import { AuthRepository } from './auth.repository'
import { TokenService } from './token.service'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { loginSchema } from './auth.schemas'

const service = new AuthService(new AuthRepository(), new TokenService())
const controller = new AuthController(service)

export const authRoutes = Router()

authRoutes.post('/login', validateBody(loginSchema), controller.login)   // pública
authRoutes.get('/me', authenticate, controller.me)                       // requiere token