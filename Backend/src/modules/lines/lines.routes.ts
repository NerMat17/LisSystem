import { Router } from 'express';
import { validateBody } from '../../shared/middlewares/validate.middleware';
import { LinesRepository } from './lines.repository';
import { LinesService } from './lines.service';
import { LinesController } from './lines.controller';
import { createLineSchema, updateLineSchema } from './lines.schemas';

// Armado: cada pieza recibe la que necesita
const repository = new LinesRepository();
const service = new LinesService(repository);
const controller = new LinesController(service);

export const linesRoutes = Router();

//                ruta        middlewares (en orden)              quién responde
linesRoutes.get(  '/',                                            controller.getAll);
linesRoutes.get(  '/:code',                                       controller.getByCode);
linesRoutes.post( '/',        validateBody(createLineSchema),     controller.create);
linesRoutes.patch('/:id',     validateBody(updateLineSchema),     controller.update);