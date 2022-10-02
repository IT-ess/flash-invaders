import * as http from "http"
import * as dotenv from "dotenv"
import { app } from "./app"

dotenv.config()

const server = http.createServer(app)

async function startServer() {
  server.listen(process.env.PORT, () => {
    console.log(`Listening on port 3000...`)
  })
}

startServer().catch((error) => console.error(error))
