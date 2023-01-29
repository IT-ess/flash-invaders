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
  redis: {
    url: string
    sessionSecret: string
    sessionExpiration: number
  }
  gameSettings: {
    areaOfDetection: number
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
    redis: {
      url: configLoader.getString("REDIS_URL"),
      sessionExpiration: configLoader.getInt("SESSION_EXPIRATION", 3),
      sessionSecret: configLoader.getString("SESSION_SECRET"),
    },
    gameSettings: {
      areaOfDetection: configLoader.getInt("SCAN_RADIUS", 10),
    },
  }
}
