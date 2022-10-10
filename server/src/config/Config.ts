import ConfigLoader from "../utils/ConfigLoader"
import * as dotenv from "dotenv"

export type Config = {
  env: string
  http: {
    port: number
    url: string
    cors: {
      accessControlAllowOrigin: string
    }
  }
  databaseClient: string
  mysql: {
    host: string
    port: number
    user: string
    password: string
    database: string
  }
}

export type LoggerConfig = {
  level: string
}

export function loadConfig(path: string): Config {
  dotenv.config() // shouldn't be necessary, but I have an error if I do not call it before loading config.
  const configLoader = new ConfigLoader(path)
  return {
    env: configLoader.getString("NODE_ENV", "development"),
    http: {
      port: configLoader.getInt("HTTP_PORT", 9000),
      url: configLoader.getString("HTTP_URL", "0.0.0.0"),
      cors: {
        accessControlAllowOrigin: configLoader.getString("CORS_ACCESS_CONTROL_ALLOW_ORIGIN", "*"),
      },
    },
    databaseClient: configLoader.getString("DB_DATABASE_CLIENT", "mysql"),
    mysql: {
      host: configLoader.getString("DB_HOST"),
      port: configLoader.getInt("DB_PORT"),
      user: configLoader.getString("DB_USERNAME"),
      password: configLoader.getString("DB_PASSWORD"),
      database: configLoader.getString("DB_NAME"),
    },
  }
}
