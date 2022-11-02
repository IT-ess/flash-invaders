import { InvadersController } from "./invaders.controller"
import { Router } from "express"

export class InvadersRouter {
  #controller: InvadersController

  constructor(invadersController: InvadersController) {
    this.#controller = invadersController
  }
  getInvadersRouter(): Router {
    const invadersRouter = Router()
    invadersRouter.get("/:id", this.#controller.httpGetInvader)
    return invadersRouter
  }
}
