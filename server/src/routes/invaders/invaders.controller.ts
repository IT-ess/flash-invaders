import { Request, Response, Router } from "express"
import { Readable } from "stream"
import { DataModel, RawData } from "../../models/data.model"
import { InvaderItem } from "../../models/invaders/invader.entity"
import { InvadersModel } from "../../models/invaders/invaders.model"

export class InvadersController {
  #invadersModel: InvadersModel
  #dataModel: DataModel

  constructor(invadersModel: InvadersModel, dataModel: DataModel) {
    this.#invadersModel = invadersModel
    this.#dataModel = dataModel
  }
  async loadInvadersOnstart() {
    const rawData = await this.#dataModel.fetchPlanetsFromCSV()
    const invaders = this.mapInvaders(rawData)
    this.#invadersModel.postInvader(invaders)
  }

  //   async httpGetInvader(req: Request, res: Response): Promise<Response> {
  //     try {
  //       const invader = await this.#invadersModel.getInvaderById(req.params.id)
  //       console.log(invader)
  //       if (invader === undefined) {
  //         return res.status(404).json("No invader found")
  //       } else {
  //         return res.status(200).json(invader)
  //       }
  //     } catch (err) {
  //       throw err
  //     }
  //   } not working now --> error :  TypeError: Cannot read property '#invadersModel' of undefined

  private mapInvaders(rawData: RawData[]): InvaderItem[] {
    return rawData.map(function (raw) {
      return {
        name: raw.name,
        location: {
          latitude: +raw.coord_lat,
          longitude: +raw.coord_long,
        },
      }
    })
  }
}
