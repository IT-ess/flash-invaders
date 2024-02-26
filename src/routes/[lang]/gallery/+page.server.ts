import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { api } from '$lib/server/api';
import { auth } from '$lib/server/lucia';

export const load: PageServerLoad = async (event) => {
	const authRequest = auth.handleRequest(event);
	const session = await authRequest.validate();
	if (!session) {
		redirect(302, '/');
	}
	const { user } = session;

	const { params } = event;
	if (user === null) {
		redirect(307, `/${params.lang}/home`);
	}
	return { invadersInfos: await getInvaderFromState(user), nav: true, header: true };
};

async function getInvaderFromState(user: Lucia.DatabaseUserAttributes): Promise<InvadersInfos[]> {
	const invadersInfos: InvadersInfos[] = [];
	for (let i = 0; i < 12; i++) {
		const invaderState = user[`zwt${i}` as keyof Lucia.DatabaseUserAttributes] as number;
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
