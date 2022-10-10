import { start } from "./builder"

start().catch((error) => {
  console.error("Fatal error in express server, Stopping the server.")
  console.error(error)
  process.exit(1)
})
