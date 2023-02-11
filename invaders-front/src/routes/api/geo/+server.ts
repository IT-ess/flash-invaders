import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { main } from '$lib/server/api';

const { invadersModel } = await main();

export const POST = (async ({ request }) => {
	const { lat, long } = await request.json();
	if (lat === undefined || long === undefined) {
		throw error(400, 'Bad request');
	}
	const invader = await invadersModel.getInvaderByLocation(+lat, +long);
	console.log(invader);
	if (invader === null) {
		throw error(204, 'No invader there');
	} else {
		return json(invader, { status: 200 });
	}
}) satisfies RequestHandler;

// must convert this to a form action

// function testRoute(lat: number, long: number): Invader | null {
// 	if (lat === undefined || long === undefined) {
// 		return null;
// 	} else {
// 		return {
// 			name: REDIS_URL,
// 			location: {
// 				latitude: lat,
// 				longitude: long
// 			}
// 		};
// 	}
// }
