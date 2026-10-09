import { User } from './users.model'
import { Role } from './roles.model'
import type {
  IUsersRepository, UserEntity, RoleEntity, CreateUserData, UpdateUserData,
} from './users.types'

// Se reutiliza en todas las consultas que necesitan el rol
const includeRole = { model: Role, as: 'role' }

// Mapper: convierte el modelo de Sequelize en un objeto seguro, sin el hash
function toEntity(user: User): UserEntity {
  if (!user.role) throw new Error('El rol no fue cargado')
  return {
    id: user.id,
    employeeNumber: user.employeeNumber,
    name: user.name,
    isActive: user.isActive,
    hasPassword: user.passwordHash !== null,
    role: { id: user.role.id, code: user.role.code, name: user.role.name },
  }
}

export class UsersRepository implements IUsersRepository {
  async findAll(): Promise<UserEntity[]> {
    const users = await User.findAll({ include: includeRole, order: [['name', 'ASC']] })
    return users.map(toEntity)
  }

  async findById(id: number): Promise<UserEntity | null> {
    const user = await User.findByPk(id, { include: includeRole })
    return user ? toEntity(user) : null
  }

  async findByEmployeeNumber(employeeNumber: string): Promise<UserEntity | null> {
    const user = await User.findOne({ where: { employeeNumber }, include: includeRole })
    return user ? toEntity(user) : null
  }

  async create(data: CreateUserData): Promise<UserEntity> {
    const user = await User.create(data)
    await user.reload({ include: includeRole })
    return toEntity(user)
  }

  async update(id: number, data: UpdateUserData): Promise<UserEntity | null> {
    const user = await User.findByPk(id)
    if (!user) return null
    await user.update(data)
    await user.reload({ include: includeRole })
    return toEntity(user)
  }

  async findRoleById(id: number): Promise<RoleEntity | null> {
    return Role.findByPk(id, { raw: true })
  }

  async findAllRoles(): Promise<RoleEntity[]> {
    return Role.findAll({ order: [['id', 'ASC']], raw: true })
  }
}