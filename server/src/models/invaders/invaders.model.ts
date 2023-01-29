import { Client, Repository, Schema } from "redis-om"
import { Config } from "../../config/Config"
import { Invader, InvaderItem } from "./invader.entity"

export class InvadersModel {
  #redis: Client
  #config: Config
  #repository: Repository<Invader>

  constructor(redis: Client, config: Config, invadersSchema: Schema<Invader>) {
    this.#redis = redis
    this.#config = config
    this.#repository = this.#redis.fetchRepository(invadersSchema)
    this.#repository.createIndex()
  }

  async postInvader(rawInvaders: InvaderItem[]) {
    rawInvaders.forEach((invader) => {
      this.#repository.createAndSave(invader).catch((err) => console.error(err))
    })
  }

  async getInvaderById(id: string): Promise<Invader> {
    return this.#repository.fetch(id)
  }

  async getInvaderByLocation(lat: number, long: number): Promise<Invader | null> {
    return this.#repository
      .search()
      .where("location")
      .inRadius(
        (circle) => circle.longitude(long).latitude(lat).radius(this.#config.gameSettings.areaOfDetection).meters
      )
      .return.first()
  }
}
