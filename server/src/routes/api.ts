import { Router } from "express"
import { InvadersRouter } from "./invaders/invaders.router"
import { LoginRouter } from "./login/login.router"

export class ApiWrapper {
  #invadersRouter: InvadersRouter
  #loginRouter: LoginRouter

  constructor(invadersRouter: InvadersRouter, loginRouter: LoginRouter) {
    this.#invadersRouter = invadersRouter
    this.#loginRouter = loginRouter
  }

  getRouter(): Router {
    const api = Router()
    api.use("/invaders", this.#invadersRouter.getInvadersRouter())
    api.use("/login", this.#loginRouter.getLoginRouter())
    return api
  }
}
