import { User } from '../users/users.model'
import { Role } from '../users/roles.model'
import type { AuthUser, IAuthRepository, UserWithPassword } from './auth.types'

const includeRole = { model: Role, as: 'role' }

export class AuthRepository implements IAuthRepository {
  async findByEmployeeNumberWithPassword(employeeNumber: string): Promise<UserWithPassword | null> {
    const user = await User.findOne({ where: { employeeNumber }, include: includeRole })
    if (!user || !user.role) return null

    return {
      id: user.id,
      employeeNumber: user.employeeNumber,
      name: user.name,
      role: user.role.code,
      isActive: user.isActive,
      passwordHash: user.passwordHash,
    }
  }

  async findActiveUserById(id: number): Promise<AuthUser | null> {
    const user = await User.findOne({ where: { id, isActive: true }, include: includeRole })
    if (!user || !user.role) return null

    return {
      id: user.id,
      employeeNumber: user.employeeNumber,
      name: user.name,
      role: user.role.code,
    }
  }
}