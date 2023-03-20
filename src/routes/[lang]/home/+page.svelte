<script lang="ts">
	import { t } from '$lib/translations/translations';
	import type { InvaderType } from '$lib/entities/invader';
	import { applyAction, deserialize } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import type { ActionData } from './$types';

	let accuracy = 0;
	let invader: InvaderType;

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
		}

		applyAction(result);
	}

	export let form: ActionData;
</script>

<p>{$t('home.button.map')}</p>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<button class="delete" type="submit">{$t('home.button.scan')} 🔍</button>
</form>

{#if form?.success}
	<p>Latitude : {invader.location.latitude}</p>
	<p>Longitude : {invader.location.longitude}</p>
	<p>Test : {invader.name} {invader.id}</p>
	<p>Accuracy : {accuracy}</p>
{/if}
