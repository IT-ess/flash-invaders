import { Request, Response } from "express"
import { DataModel, RawData } from "../../models/data.model"
import { InvaderItem } from "../../models/invaders/invader.entity"
import { InvadersModel } from "../../models/invaders/invaders.model"

export class InvadersController {
  #invadersModel: InvadersModel
  #dataModel: DataModel

  constructor(invadersModel: InvadersModel, dataModel: DataModel) {
    this.#invadersModel = invadersModel
    this.#dataModel = dataModel
    this.httpGetInvaderById = this.httpGetInvaderById.bind(this)
    this.httpGetInvaderByLocation = this.httpGetInvaderByLocation.bind(this)
  }
  async loadInvadersOnstart() {
    const rawData = await this.#dataModel.fetchPlanetsFromCSV()
    const invaders = this.mapInvaders(rawData)
    this.#invadersModel.postInvader(invaders)
  }

  async httpGetInvaderById(req: Request, res: Response): Promise<Response> {
    try {
      const invader = await this.#invadersModel.getInvaderById(req.params.id)
      if (invader === undefined) {
        return res.status(404).json("No invader found")
      } else {
        return res.status(200).json(invader)
      }
    } catch (err) {
      throw err
    }
  }

  async httpGetInvaderByLocation(req: Request, res: Response): Promise<Response> {
    try {
      if (req.query.lat === undefined || req.query.long === undefined) {
        return res.status(400).json("Bad request")
      }
      const invader = await this.#invadersModel.getInvaderByLocation(+req.query.lat, +req.query.long)
      if (invader === null) {
        return res.status(404).json("No invader there")
      } else {
        return res.status(200).json(invader)
      }
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  private mapInvaders(rawData: RawData[]): InvaderItem[] {
    // TODO : handle case where they aren't exactly 4 questions
    return rawData.map(function (raw) {
      return {
        name: raw.name,
        location: {
          latitude: +raw.coord_lat,
          longitude: +raw.coord_long,
        },
        question1: raw.question1,
        answers1: [raw.res1_1, raw.res1_2, raw.res1_3, raw.res1_4],
        solution1: +raw.sol1,
        question2: raw.question2,
        answers2: [raw.res2_1, raw.res2_2, raw.res2_3, raw.res2_4],
        solution2: +raw.sol2,
        question3: raw.question3,
        answers3: [raw.res3_1, raw.res3_2, raw.res3_3, raw.res3_4],
        solution3: +raw.sol3,
        question4: raw.question4,
        answers4: [raw.res4_1, raw.res4_2, raw.res4_3, raw.res4_4],
        solution4: +raw.sol4,
      }
    })
  }
}
