import { Router } from 'express'
import { validateBody } from '../../shared/middlewares/validate.middleware'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { createUserSchema, updateUserSchema } from './users.schemas'
import { authenticate } from '../../shared/middlewares/authenticate.middleware'
import { authorize } from '../../shared/middlewares/authorize.middleware'
import { ROLES } from '../../shared/types/roles'

const repository = new UsersRepository()
const service = new UsersService(repository)
const controller = new UsersController(service)

export const usersRoutes = Router()

usersRoutes.use(authenticate, authorize(ROLES.ADMIN))

usersRoutes.get('/', controller.getAll)
usersRoutes.get('/roles', controller.getRoles)   // ← ANTES de /:id
usersRoutes.get('/:id', controller.getById)
usersRoutes.post('/', validateBody(createUserSchema), controller.create)
usersRoutes.patch('/:id', validateBody(updateUserSchema), controller.update)