import { Client } from 'redis-om';
import { REDIS_URL } from '$env/static/private';

export async function getRedisOMClient(): Promise<Client> {
	/* create and open the Redis OM Client */
	return new Client().open(REDIS_URL);
}
