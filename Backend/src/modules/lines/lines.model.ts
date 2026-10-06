import {
  DataTypes, Model,
  type InferAttributes, type InferCreationAttributes, type CreationOptional,
} from 'sequelize';
import { sequelize } from '../../infrastructure/database/sequelize';


export class Line extends Model<InferAttributes<Line>, InferCreationAttributes<Line>> {
  declare id: CreationOptional<number>;        
  declare code: string;
  declare name: string;
  declare hourlyTarget: number;
  declare machineTag: string;
  declare isActive: CreationOptional<boolean>; 
}

Line.init(
  {
    id:           { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'Id_L' },
    code:         { type: DataTypes.STRING(50), allowNull: false, unique: true, field: 'Code_L' },
    name:         { type: DataTypes.STRING(100), allowNull: false, field: 'Name_L' },
    hourlyTarget: { type: DataTypes.INTEGER, allowNull: false, field: 'HourlyTarget_L' },
    machineTag:   { type: DataTypes.STRING(50), allowNull: false, field: 'MachineTag_L' },
    isActive:     { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'IsActive_L' },
  },
  {
    sequelize,
    tableName: 'Lines',  
    timestamps: false,   
  },
);