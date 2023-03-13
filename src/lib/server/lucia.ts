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
			progression: user.progression,
			locale: user.locale
		};
	}
});

export type Auth = typeof auth;
