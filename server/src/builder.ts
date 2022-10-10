import express, { Express } from "express"
import { Config, loadConfig } from "./config/Config"

export type MainInstance = { app: Express; config: Config }

async function main(): Promise<MainInstance> {
  const config = loadConfig("../.env")
  const app: Express = express()

  return { app: app, config: config }
}

export async function start() {
  return main().then((instance: MainInstance) => {
    console.log(`Server starting on port ${instance.config.http.port}`)
    return instance.app.listen(instance.config.http.port, instance.config.http.url)
  })
}
