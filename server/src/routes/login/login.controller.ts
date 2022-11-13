import { NextFunction, Request, Response } from "express"

export class LoginController {
  async httpCreateSession(req: Request, res: Response) {
    const sess = req.session
    const { user } = req.body
    if (typeof user === "string") {
      sess.user = user
      sess.save()
      //add username and password validation logic here if you want.If user is authenticated send the response as success
      return res.end("success")
    } else {
      return res.status(400).json("bad request")
    }
  }
}
