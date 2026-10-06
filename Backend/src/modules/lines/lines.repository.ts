import { Line } from './lines.model';
import type { ILinesRepository, LineEntity } from './lines.types';
import type { CreateLineDto, UpdateLineDto } from './lines.schemas';

export class LinesRepository implements ILinesRepository {
  async findAll(): Promise<LineEntity[]> {

    return Line.findAll({ order: [['name', 'ASC']], raw: true });
  }

  async findByCode(code: string): Promise<LineEntity | null> {

    return Line.findOne({ where: { code }, raw: true });
  }

  async create(data: CreateLineDto): Promise<LineEntity> {

    const line = await Line.create(data);
    return line.get({ plain: true });
  }

  async update(id: number, data: UpdateLineDto): Promise<LineEntity | null> {
    const line = await Line.findByPk(id);  
    if (!line) return null;
    await line.update(data);               
    return line.get({ plain: true });
  }
}