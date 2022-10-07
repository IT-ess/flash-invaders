// Creates a readable stream to retrieve quizs and invaders. --> in the constructor
import { parse } from "csv-parse/."

class InvadersModel {
  path: string

  constructor(pathToInvaders: string) {
    this.path = pathToInvaders
  }

  public createReadStream() {
    const parser = parse({ delimiter: "," })
  }
}
