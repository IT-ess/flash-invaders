import { Client, Repository, Schema } from "redis-om"
import { Invader, InvaderItem } from "./invader.entity"

export class InvadersModel {
  #redis: Client
  #repository: Repository<Invader>

  constructor(redis: Client, invadersSchema: Schema<Invader>) {
    this.#redis = redis
    this.#repository = this.#redis.fetchRepository(invadersSchema)
    this.#repository.createIndex()
  }

  async postInvader(rawInvaders: InvaderItem[]) {
    rawInvaders.forEach((invader) => {
      this.#repository.createAndSave(invader).catch((err) => console.log(err))
    })
  }

  async getInvaderById(id: string): Promise<Invader> {
    return this.#repository.fetch(id)
  }

  async getInvaderByLocation(lat: number, long: number): Promise<Invader | null> {
    return this.#repository
      .search()
      .where("location")
      .inRadius((circle) => circle.longitude(long).latitude(lat).radius(10).meters) // Put radius in dot env ?
      .return.first()
  }
}
