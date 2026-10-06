import type { CreateLineDto, UpdateLineDto } from './lines.schemas';


export interface LineEntity {
  id: number;
  code: string;
  name: string;
  hourlyTarget: number;
  machineTag: string;
  isActive: boolean;
}

export interface ILinesRepository {
  findAll(): Promise<LineEntity[]>;
  findByCode(code: string): Promise<LineEntity | null>;
  create(data: CreateLineDto): Promise<LineEntity>;
  update(id: number, data: UpdateLineDto): Promise<LineEntity | null>;
}