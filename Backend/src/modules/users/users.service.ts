import bcrypt from 'bcrypt'
import { AppError, ConflictError, NotFoundError } from '../../shared/errors/AppError'
import { ROLES_WITH_PASSWORD } from '../../shared/types/roles'
import type { IUsersRepository, UpdateUserData } from './users.types'
import type { CreateUserDto, UpdateUserDto } from './users.schemas'

const SALT_ROUNDS = 10

export class UsersService {
  constructor(private readonly repository: IUsersRepository) {}

  getAll() {
    return this.repository.findAll()
  }

  getRoles() {
    return this.repository.findAllRoles()
  }

  async getById(id: number) {
    const user = await this.repository.findById(id)
    if (!user) throw new NotFoundError(`El usuario con id ${id} no existe`)
    return user
  }

  async create(dto: CreateUserDto) {
    // Regla 1: el número de empleado no se repite
    const existing = await this.repository.findByEmployeeNumber(dto.employeeNumber)
    if (existing) {
      throw new ConflictError(`El número de empleado ${dto.employeeNumber} ya está registrado`)
    }

    // Regla 2: el rol debe existir
    const role = await this.getRoleOrFail(dto.roleId)

    // Regla 3: admin y supervisor necesitan contraseña
    if (ROLES_WITH_PASSWORD.includes(role.code) && !dto.password) {
      throw new AppError(400, `El rol ${role.name} requiere contraseña`)
    }

    // Hashear: la contraseña en texto plano nunca llega a la base de datos
    const passwordHash = dto.password ? await bcrypt.hash(dto.password, SALT_ROUNDS) : null

    return this.repository.create({
      employeeNumber: dto.employeeNumber,
      name: dto.name,
      roleId: dto.roleId,
      passwordHash,
    })
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.getById(id)

    // Si cambia el número de empleado, que no choque con otro
    if (dto.employeeNumber && dto.employeeNumber !== user.employeeNumber) {
      const other = await this.repository.findByEmployeeNumber(dto.employeeNumber)
      if (other) {
        throw new ConflictError(`El número de empleado ${dto.employeeNumber} ya está registrado`)
      }
    }

    // Si queda con un rol que requiere contraseña, debe tenerla o mandarla
    const role = await this.getRoleOrFail(dto.roleId ?? user.role.id)
    const willHavePassword = user.hasPassword || Boolean(dto.password)
    if (ROLES_WITH_PASSWORD.includes(role.code) && !willHavePassword) {
      throw new AppError(400, `El rol ${role.name} requiere contraseña`)
    }

    // Separar la contraseña del resto y hashearla si viene
    const { password, ...rest } = dto
    const data: UpdateUserData = { ...rest }
    if (password) {
      data.passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    }

    const updated = await this.repository.update(id, data)
    if (!updated) throw new NotFoundError(`El usuario con id ${id} no existe`)
    return updated
  }

  private async getRoleOrFail(roleId: number) {
    const role = await this.repository.findRoleById(roleId)
    if (!role) throw new AppError(400, `El rol con id ${roleId} no existe`)
    return role
  }
}