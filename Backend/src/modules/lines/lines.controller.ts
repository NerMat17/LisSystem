import type { Request, Response } from 'express';
import { AppError } from '../../shared/errors/AppError';
import type { LinesService } from './lines.service';

export class LinesController {
  constructor(private readonly service: LinesService) {}

  // GET /api/lines
  getAll = async (_req: Request, res: Response) => {
    const lines = await this.service.getAll();
    res.json(lines);
  };

  // GET /api/lines/:code
  getByCode = async (req: Request<{ code: string }>, res: Response) => {
    const line = await this.service.getByCode(req.params.code);
    res.json(line);
  };

  // POST /api/lines
  create = async (req: Request, res: Response) => {
    const line = await this.service.create(req.body);
    res.status(201).json(line);  // 201 = creado
  };

  // PATCH /api/lines/:id
  update = async (req: Request<{ id: string }>, res: Response) => {
    const id = Number(req.params.id);  // los params siempre llegan como texto
    if (!Number.isInteger(id)) throw new AppError(400, 'Id inválido');

    const line = await this.service.update(id, req.body);
    res.json(line);
  };
}