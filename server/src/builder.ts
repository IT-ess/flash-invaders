import express, { Express } from "express"
import { Config, loadConfig } from "./config/Config"
import { DataModel } from "./models/data.model"
import { invaderSchema } from "./models/invaders/invader.entity"
import { InvadersModel } from "./models/invaders/invaders.model"
import { ApiWrapper } from "./routes/api"
import { InvadersController } from "./routes/invaders/invaders.controller"
import { InvadersRouter } from "./routes/invaders/invaders.router"
import { getRedisOMClient } from "./utils/RedisLoader"

export type MainInstance = { app: Express; config: Config }

async function main(): Promise<MainInstance> {
  const config = loadConfig("../.env")
  const redis = await getRedisOMClient(config)

  // Create Models
  const dataModel = new DataModel()
  const invadersModel = new InvadersModel(redis, invaderSchema)
  //console.log(await invadersModel.getInvaderById("01GGMSGA2JWM86PX4RAC262X51"))

  // Create controllers
  const invadersController = new InvadersController(invadersModel, dataModel)
  await invadersController.loadInvadersOnstart() // needed to load invaders in DB

  // Create routers
  const invadersRouter = new InvadersRouter(invadersController)

  // API Wrapper
  const apiWrapper = new ApiWrapper(invadersRouter)

  // App
  const app: Express = express()
  app.use(express.json())
  app.use("/", apiWrapper.getRouter())

  return { app: app, config: config }
}

export async function start() {
  return main().then((instance: MainInstance) => {
    console.log(`Server starting on port ${instance.config.http.port}`)
    return instance.app.listen(instance.config.http.port, instance.config.http.url)
  })
}
