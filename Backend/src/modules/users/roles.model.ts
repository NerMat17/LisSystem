import {
  DataTypes, Model,
  type InferAttributes, type InferCreationAttributes, type CreationOptional,
} from 'sequelize'
import { sequelize } from '../../infrastructure/database/sequelize'

export class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare id: CreationOptional<number>
  declare code: string
  declare name: string
}

Role.init(
  {
    id:   { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'Id_R' },
    code: { type: DataTypes.STRING(20), allowNull: false, unique: true, field: 'Code_R' },
    name: { type: DataTypes.STRING(50), allowNull: false, field: 'Name_R' },
  },
  { sequelize, tableName: 'Roles', timestamps: false },
)