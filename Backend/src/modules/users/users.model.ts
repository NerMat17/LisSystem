import {
  DataTypes, Model,
  type InferAttributes, type InferCreationAttributes,
  type CreationOptional, type NonAttribute,
} from 'sequelize'
import { sequelize } from '../../infrastructure/database/sequelize'
import { Role } from './roles.model'

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>
  declare employeeNumber: string
  declare name: string
  declare roleId: number
  declare passwordHash: CreationOptional<string | null>
  declare isActive: CreationOptional<boolean>

  // No es una columna: es el rol completo que trae la relación
  declare role?: NonAttribute<Role>
}

User.init(
  {
    id:             { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'Id_U' },
    employeeNumber: { type: DataTypes.STRING(20), allowNull: false, unique: true, field: 'EmployeeNumber_U' },
    name:           { type: DataTypes.STRING(100), allowNull: false, field: 'Name_U' },
    roleId:         { type: DataTypes.INTEGER, allowNull: false, field: 'RoleId_U' },
    passwordHash:   { type: DataTypes.STRING(100), allowNull: true, field: 'PasswordHash_U' },
    isActive:       { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'IsActive_U' },
  },
  { sequelize, tableName: 'Users', timestamps: false },
)

// La relación: cada usuario pertenece a un rol
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' })