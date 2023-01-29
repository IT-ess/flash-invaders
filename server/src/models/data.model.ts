import { parse } from "csv-parse"
import * as fs from "fs"
import * as path from "path"
import { Readable } from "stream"

export type RawData = {
  id: number
  name: string
  coord_lat: number
  coord_long: number
  question1: string
  res1_1: string
  res1_2: string
  res1_3: string
  res1_4: string
  sol1: string
  question2: string
  res2_1: string
  res2_2: string
  res2_3: string
  res2_4: string
  sol2: string
  question3: string
  res3_1: string
  res3_2: string
  res3_3: string
  res3_4: string
  sol3: string
  question4: string
  res4_1: string
  res4_2: string
  res4_3: string
  res4_4: string
  sol4: string
}
export class DataModel {
  private pathCSV = path.join(__dirname, "..", "..", "data", "/data.csv")

  async fetchPlanetsFromCSV(): Promise<RawData[]> {
    const parser = parse({ columns: true, delimiter: ";" }, function (err, records: RawData[]) {
      if (err) throw err
      console.log(`${records.length} invaders found`)
      console.log(records)
    })
    const stream = fs.createReadStream(this.pathCSV).pipe(parser)
    return this.streamToRawData(stream)
  }

  private async streamToRawData(stream: Readable): Promise<RawData[]> {
    const chunks: RawData[] = []
    return new Promise((resolve, reject) => {
      stream.on("data", (rawData) => chunks.push(rawData))
      stream.on("error", (err) => reject(err))
      stream.on("end", () => resolve(chunks))
    })
  }
}
