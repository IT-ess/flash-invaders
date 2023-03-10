import { invaderSchema } from './models/invaders/invader.entity';
import { InvadersModel } from './models/invaders/invaders.model';
import { getRedisOMClient } from './utils/RedisOMLoader';

type MainInstance = {
	invadersModel: InvadersModel;
};

export async function main(): Promise<MainInstance> {
	const redisOM = await getRedisOMClient();

	// Create Models
	const invadersModel = new InvadersModel(redisOM, invaderSchema);

	return { invadersModel: invadersModel };
}

// use handlers instead
