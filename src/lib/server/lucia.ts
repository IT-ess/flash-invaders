import { lucia } from "lucia";
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const auth = lucia({
	middleware: sveltekit(),
	adapter: prisma(client),
	env: dev ? 'DEV' : 'PROD',
	csrfProtection: false,
	getUserAttributes: (user) => {
		return {
			// id: user.id,
			username: user.username,
			score: user.score,
			locale: user.locale,
			zwt0: user.zwt0,
			zwt1: user.zwt1,
			zwt2: user.zwt2,
			zwt3: user.zwt3,
			zwt4: user.zwt4,
			zwt5: user.zwt5,
			zwt6: user.zwt6,
			zwt7: user.zwt7,
			zwt8: user.zwt8,
			zwt9: user.zwt9,
			zwt10: user.zwt10,
			zwt11: user.zwt11
		};
	}
});

export type Auth = typeof auth;
