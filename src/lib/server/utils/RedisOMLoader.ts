import { Client } from 'redis-om';
import { REDIS_URL } from '$env/static/private';

const urlOrDefault = REDIS_URL === '' ? undefined : REDIS_URL;

export const redisOMClient = await new Client().open(urlOrDefault);
