import { DataTypes,Model } from "sequelize";
import { sequelize } from "../config/database";
export class Seller extends Model{
    public id!: number;
    name!: string;
  }
  Seller.init({
    id: {
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    }, {
    sequelize,
    modelName: "Seller",
    tableName: "sellers",
    timestamps: false,
  })
  