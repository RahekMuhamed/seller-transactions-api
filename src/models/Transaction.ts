import { DataTypes,Model,  } from "sequelize";
import { sequelize } from "../config/database";
export class Transaction extends Model{
    public id!: number;
    public title!: string;
    public image!: string;
    public price!: number;
    public last_updated!: Date;
    public seller_id!: number;
}
Transaction.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      last_updated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      seller_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: 'transactions',
      timestamps: false,
    }
  );