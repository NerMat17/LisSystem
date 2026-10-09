import { Router } from 'express';
import { validateBody } from '../../shared/middlewares/validate.middleware';
import { LinesRepository } from './lines.repository';
import { LinesService } from './lines.service';
import { LinesController } from './lines.controller';
import { createLineSchema, updateLineSchema } from './lines.schemas';
import { authenticate } from '../../shared/middlewares/authenticate.middleware'
import { authorize } from '../../shared/middlewares/authorize.middleware'
import { ROLES } from '../../shared/types/roles'

const canManage = authorize(ROLES.ADMIN, ROLES.SUPERVISOR);

// Armado: cada pieza recibe la que necesita
const repository = new LinesRepository();
const service = new LinesService(repository);
const controller = new LinesController(service);

export const linesRoutes = Router();

linesRoutes.use(authenticate);

//                ruta        middlewares (en orden)              quién responde
linesRoutes.get(  '/',canManage,                                            controller.getAll);
linesRoutes.get(  '/:code',                                       controller.getByCode);
linesRoutes.post( '/',canManage,        validateBody(createLineSchema),     controller.create);
linesRoutes.patch('/:id',canManage,     validateBody(updateLineSchema),     controller.update);