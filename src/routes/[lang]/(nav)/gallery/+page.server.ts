import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { api } from '$lib/server/api';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { user } = await locals.validateUser();
	if (user === null) {
		throw redirect(307, `/${params.lang}/home`);
	}
	return { invadersInfos: await getInvaderFromState(user) };
};

async function getInvaderFromState(user: Lucia.UserAttributes): Promise<InvadersInfos[]> {
	const invadersInfos: InvadersInfos[] = [];
	for (let i = 0; i < 12; i++) {
		const invaderState = user[`zwt${i}` as keyof Lucia.UserAttributes] as number;
		if (invaderState > 0) {
			const invader = await api.invadersModel.getInvaderById(i);
			invadersInfos.push({
				id: invader.id,
				alt: invader.name,
				img: invader.imageUrl
			});
		} else {
			invadersInfos.push({
				id: 100,
				alt: 'placeholder',
				img: 'https://imagedelivery.net/6ZM0ENVQ5B1N8ekukm4aPw/59e8fbad-4fe0-422b-7fa3-ee5c31830400/public'
			});
		}
	}
	return invadersInfos;
}

type InvadersInfos = {
	id: number;
	alt: string;
	img: string;
};
