import { DataTypes, Sequelize } from "sequelize"

export async function loadSequelizeModels(sequelize: Sequelize) {
  const Invader = sequelize.define(
    "Invader",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      long: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "invaders",
    }
  )
  await sequelize.sync({ alter: true })
}
