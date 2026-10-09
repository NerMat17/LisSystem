import type { Request, Response } from 'express';
import { parseId } from '../../shared/utils/parse-id';
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
    res.status(201).json(line);
  };

  // PATCH /api/lines/:id
  update = async (req: Request<{ id: string }>, res: Response) => {
    const line = await this.service.update(parseId(req.params.id), req.body);
    res.json(line);
  };
}