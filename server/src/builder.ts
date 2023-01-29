import express, { Express } from "express"
import { Config, loadConfig } from "./config/Config"
import { DataModel } from "./models/data.model"
import { invaderSchema } from "./models/invaders/invader.entity"
import { InvadersModel } from "./models/invaders/invaders.model"
import { ApiWrapper } from "./routes/api"
import { InvadersController } from "./routes/invaders/invaders.controller"
import { InvadersRouter } from "./routes/invaders/invaders.router"
import { LoginController } from "./routes/login/login.controller"
import { LoginRouter } from "./routes/login/login.router"
import { getRedisOMClient } from "./utils/RedisLoader"
import { createClient } from "redis"
import connectRedis from "connect-redis"
import session from "express-session"

export type MainInstance = { app: Express; config: Config }

async function main(): Promise<MainInstance> {
  const config = loadConfig("../.env")
  const redisOM = await getRedisOMClient(config)

  // Create Models
  const dataModel = new DataModel()
  const invadersModel = new InvadersModel(redisOM, config, invaderSchema)

  // Create controllers
  const invadersController = new InvadersController(invadersModel, dataModel)
  const loginController = new LoginController()
  await invadersController.loadInvadersOnstart()

  // Create routers
  const invadersRouter = new InvadersRouter(invadersController)
  const loginRouter = new LoginRouter(loginController)

  // API Wrapper
  const apiWrapper = new ApiWrapper(invadersRouter, loginRouter)

  // App
  const app: Express = express()

  app.use(express.json())
  // Session Store
  const RedisStore = connectRedis(session)
  const redisSessionClient = createClient({ legacyMode: true })
  redisSessionClient.on("error", (err) => console.log("Redis Client Error", err))
  await redisSessionClient.connect()
  app.use(
    session({
      store: new RedisStore({ client: redisSessionClient }),
      saveUninitialized: false,
      secret: config.redis.sessionSecret,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * config.redis.sessionExpiration,
      },
    })
  )
  app.use("/", apiWrapper.getRouter())

  return { app: app, config: config }
}

export async function start() {
  return main().then((instance: MainInstance) => {
    console.log(`Server starting on port ${instance.config.http.port}`)
    return instance.app.listen(instance.config.http.port, instance.config.http.url)
  })
}
