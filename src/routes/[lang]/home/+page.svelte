<script lang="ts">
	import { t } from '$lib/translations/translations';
	import type { InvaderType } from '$lib/entities/invader';
	import { applyAction, deserialize } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import type { ActionData } from './$types';
	import { Button, Modal } from 'flowbite-svelte';


	let accuracy = 0;
	let invader: InvaderType;
	let popupModal = false;

	function getCurrentLocation(): Promise<GeolocationPosition> {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				(position: GeolocationPosition) => {
					resolve(position);
				},
				(error: GeolocationPositionError) => {
					reject(error);
				},
				{
					enableHighAccuracy: true,
					timeout: 15000, // TODO : handle error if timeout
					maximumAge: 10000
				}
			);
		});
	}

	async function handleSubmit() {
		const loc = await getCurrentLocation(); // TODO : handle error
		accuracy = loc.coords.accuracy;
		const data = new FormData();
		data.append('lat', loc.coords.latitude.toString());
		data.append('long', loc.coords.longitude.toString());
		const response = await fetch('?/searchInvader', {
			method: 'POST',
			body: data
		});

		const result: ActionResult = deserialize(await response.text());
		if (result.type === 'success') {
			invader = {
				id: result.data?.data.id,
				name: result.data?.data.name,
				location: {
					latitude: result.data?.data.location.latitude,
					longitude: result.data?.data.location.longitude
				}
			};
			popupModal = true;
		}

		applyAction(result);
	}

	// export let form: ActionData;
</script>

<p>{$t('home.button.map')}</p>
<p>{$t('home.content')}</p>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<button class="delete" type="submit">{$t('home.button.scan')} 🔍</button>
</form>

<Modal bind:open={popupModal} size="xs" autoclose>
	<div class="text-center">
		<svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
		<h2 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">You've found an invader !</h2>
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{invader.name}</h3>
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{invader.location.latitude} {invader.location.longitude}</h3>
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{invader.id}</h3>

		<Button color="red" class="mr-2">Yes, I'm sure</Button>
		<Button color='alternative'>No, cancel</Button>
	</div>
  </Modal>



