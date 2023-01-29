import { Router } from "express"
import { LoginController } from "./login.controller"

export class LoginRouter {
  #controller: LoginController
  constructor(controller: LoginController) {
    this.#controller = controller
  }

  getLoginRouter(): Router {
    const router = Router()
    router.post("/", this.#controller.httpCreateSession)
    return router
  }
}
