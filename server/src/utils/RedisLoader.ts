import { Client } from "redis-om"
import { Config } from "../config/Config"

export async function getRedisOMClient(config: Config): Promise<Client> {
  const url = config.redis.url
  /* create and open the Redis OM Client */
  return new Client().open(url)
}
