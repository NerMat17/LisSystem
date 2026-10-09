import bcrypt from 'bcrypt'
import { UnauthorizedError } from '../../shared/errors/AppError'
import { ROLES_WITH_PASSWORD } from '../../shared/types/roles'
import type { TokenService } from './token.service'
import type { AuthUser, IAuthRepository, LoginResponse } from './auth.types'
import type { LoginDto } from './auth.schemas'

const INVALID_CREDENTIALS = 'Número de empleado o contraseña incorrectos'

// Hash falso para comparar cuando el usuario no existe (ver explicación)
const DUMMY_HASH = bcrypt.hashSync('lissystem-dummy-password', 10)

export class AuthService {
  constructor(
    private readonly repository: IAuthRepository,
    private readonly tokens: TokenService,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponse> {
    const user = await this.repository.findByEmployeeNumberWithPassword(dto.employeeNumber)

    // Siempre se compara, exista o no el usuario
    const passwordOk = await bcrypt.compare(dto.password, user?.passwordHash ?? DUMMY_HASH)

    if (
      !user ||
      !passwordOk ||
      !user.isActive ||
      !user.passwordHash ||
      !ROLES_WITH_PASSWORD.includes(user.role)
    ) {
      throw new UnauthorizedError(INVALID_CREDENTIALS)
    }

    const authUser: AuthUser = {
      id: user.id,
      employeeNumber: user.employeeNumber,
      name: user.name,
      role: user.role,
    }

    return {
      accessToken: this.tokens.sign(authUser),
      user: authUser,
    }
  }

  async me(userId: number): Promise<AuthUser> {
    const user = await this.repository.findActiveUserById(userId)
    if (!user) throw new UnauthorizedError('La sesión ya no es válida')
    return user
  }
}