import { ConflictError, NotFoundError } from '../../shared/errors/AppError';
import type { ILinesRepository } from './lines.types';
import type { CreateLineDto, UpdateLineDto } from './lines.schemas';

export class LinesService {
  // Recibe el repositorio desde fuera (no lo crea él)
  constructor(private readonly repository: ILinesRepository) {}

  getAll() {
    return this.repository.findAll();
  }

  async getByCode(code: string) {
    const line = await this.repository.findByCode(code);
    if (!line) throw new NotFoundError(`The line "${code}" does not exist`);
    return line;
  }

  async create(data: CreateLineDto) {
    // Regla: no puede haber dos líneas con el mismo código
    const existing = await this.repository.findByCode(data.code);
    if (existing) throw new ConflictError(`Already exists a line with the code "${data.code}"`);

    return this.repository.create(data);
  }

  async update(id: number, data: UpdateLineDto) {
    // Regla: si cambia el código, que no choque con otra línea
    if (data.code) {
      const other = await this.repository.findByCode(data.code);
      if (other && other.id !== id) {
        throw new ConflictError(`Already exists a line with the code "${data.code}"`);
      }
    }

    const updated = await this.repository.update(id, data);
    if (!updated) throw new NotFoundError(`The line with id ${id} does not exist`);
    return updated;
  }
}