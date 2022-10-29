import { DataModel, RawData } from "../../models/data.model"
import { InvadersModel } from "../../models/invaders.model"

class InvadersService {
  dataModel: DataModel
  invadersModel: InvadersModel

  constructor(dataModel: DataModel, invadersModel: InvadersModel) {
    this.dataModel = dataModel
    this.invadersModel = invadersModel
  }

  private onStart() {}
  private invadersMapper(records: RawData[]) {}
}
