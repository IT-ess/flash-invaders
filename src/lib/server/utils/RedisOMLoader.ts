import { Client } from 'redis-om';
import { REDIS_URL } from '$env/static/private';

export const redisOMClient = await new Client().open(REDIS_URL);
