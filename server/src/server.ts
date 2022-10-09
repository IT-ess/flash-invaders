import * as http from "http"
import { app } from "./app"
import { loadConfig } from "./config/Config"

const config = loadConfig("./.env")
const server = http.createServer(app)

async function startServer() {
  server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`)
  })
}

startServer().catch((error) => console.error(error))
