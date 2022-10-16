// Creates a readable stream to retrieve quizs and invaders. --> in the constructor
import { parse } from "csv-parse"
import * as fs from "fs"
import * as path from "path"

export type RawData = {
  id: number
  name?: string
  coord_lat: number
  coord_long: number
  question1: string
  res1_1: string
  res1_2: string
  res1_3: string
  res1_4: string
  sol1: number
}
export class DataModel {
  pathCSV = path.join(__dirname, "..", "..", "data", "/data.csv")

  constructor() {
    this.fetchPlanetsFromCSV()
  }

  fetchPlanetsFromCSV() {
    const parser = parse({ columns: true, delimiter: ";" }, function (err, records) {
      if (err) throw err
      console.log(records)
    })
    fs.createReadStream(this.pathCSV).pipe(parser)
  }
}
