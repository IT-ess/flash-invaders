import { Router } from "express"
import { InvadersRouter } from "./invaders/invaders.router"

export class ApiWrapper {
  #invadersRouter: InvadersRouter

  constructor(invadersRouter: InvadersRouter) {
    this.#invadersRouter = invadersRouter
  }

  getRouter(): Router {
    const api = Router()
    api.use("/invaders", this.#invadersRouter.getInvadersRouter())
    return api
  }
}
