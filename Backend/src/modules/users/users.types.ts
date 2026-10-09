export interface RoleEntity {
  id: number
  code: string
  name: string
}

// Lo que tu app ve de un usuario. NO incluye el hash
export interface UserEntity {
  id: number
  employeeNumber: string
  name: string
  isActive: boolean
  hasPassword: boolean
  role: RoleEntity
}

// Lo que el repositorio necesita para guardar (con el hash ya calculado)
export interface CreateUserData {
  employeeNumber: string
  name: string
  roleId: number
  passwordHash: string | null
}

export type UpdateUserData = Partial<CreateUserData> & { isActive?: boolean }

export interface IUsersRepository {
  findAll(): Promise<UserEntity[]>
  findById(id: number): Promise<UserEntity | null>
  findByEmployeeNumber(employeeNumber: string): Promise<UserEntity | null>
  create(data: CreateUserData): Promise<UserEntity>
  update(id: number, data: UpdateUserData): Promise<UserEntity | null>
  findRoleById(id: number): Promise<RoleEntity | null>
  findAllRoles(): Promise<RoleEntity[]>
}