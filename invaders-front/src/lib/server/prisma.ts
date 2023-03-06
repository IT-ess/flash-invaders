import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

const globalForPrisma = global as unknown as { prismaClient: PrismaClient };

const prismaClient = globalForPrisma.prismaClient || new PrismaClient();

if (env.NODE_ENV === 'development') {
	globalForPrisma.prismaClient = prismaClient;
}

export { prismaClient };
