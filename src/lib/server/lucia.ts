import lucia from 'lucia-auth';
import prisma from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';
import { prismaClient } from '$lib/server/prisma';

export const auth = lucia({
	adapter: prisma(prismaClient),
	env: dev ? 'DEV' : 'PROD',
	transformUserData: (user) => {
		return {
			id: user.id,
			username: user.username,
			score: user.score,
			locale: user.locale,
			zwt1: user.zwt1,
			zwt2: user.zwt2
		};
	}
});

export type Auth = typeof auth;