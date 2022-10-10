import { Config } from "../config/Config"
import { Sequelize } from "sequelize"

export async function createSequelizeInstance(config: Config): Promise<Sequelize> {
  const sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    host: config.mysql.host,
    port: config.mysql.port,
    dialect: "mysql",
  })

  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
    await sequelize.sync({ force: false })
    console.log("All models were synchronized")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
  return sequelize
}
