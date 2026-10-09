import type { Request, Response } from 'express'
import { parseId } from '../../shared/utils/parse-id'
import type { UsersService } from './users.service'

export class UsersController {
  constructor(private readonly service: UsersService) {}

  getAll = async (_req: Request, res: Response) => {
    res.json(await this.service.getAll())
  }

  getRoles = async (_req: Request, res: Response) => {
    res.json(await this.service.getRoles())
  }

  getById = async (req: Request<{ id: string }>, res: Response) => {
    res.json(await this.service.getById(parseId(req.params.id)))
  }

  create = async (req: Request, res: Response) => {
    const user = await this.service.create(req.body)
    res.status(201).json(user)
  }

  update = async (req: Request<{ id: string }>, res: Response) => {
    res.json(await this.service.update(parseId(req.params.id), req.body))
  }
}