<script lang="ts">
	import { t } from '$lib/translations/translations';
	import { applyAction, deserialize } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { Button, Modal, Heading, Span, Spinner } from 'flowbite-svelte';
	import type { InvaderType } from '$lib/entities/Invader';
	import GoRadioTower from 'svelte-icons/go/GoRadioTower.svelte';
	// import type { PageData } from './$types';

	let accuracy = 0;
	let successModal = false;
	let failModal = false;
	let loading = false;
	let invader: InvaderType;
	// export let data: PageData;

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
					maximumAge: 0
				}
			);
		});
	}

	async function handleSubmit() {
		loading = true;
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
		applyAction(result); // I should be able to get the data through the form action after this apply, but it doesn't work
		if (result.type === 'success') {
			invader = {
				id: result.data?.id,
				name: result.data?.name,
				imageUrl: result.data?.imageUrl,
				location: {
					latitude: result.data?.location.latitude,
					longitude: result.data?.location.longitude
				}
			};
			successModal = true;
		}
		if (result.type === 'failure') {
			failModal = true;
		}
		loading = false;
	}
</script>

<div
	class="flex flex-col justify-center items-center font-sans text-center"
>
	<Modal bind:open={successModal} size="m" autoclose>
		<div class="text-center">
			<svg
				aria-hidden="true"
				class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<h2 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
				{$t('home.success_modal.message')}
			</h2>
			<img src={invader.imageUrl} alt="invaderthumbnail" />
			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{invader.name}</h3>
			<h4 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
				lat :{invader.location.latitude}
				long: {invader.location.longitude}
				acc: {accuracy}
			</h4>
			<Button href="/fr/context/{invader.id}" color="red" class="mr-2"
				>{$t('home.success_modal.button')}</Button
			>
		</div>
	</Modal>
	<Modal bind:open={failModal} size="m" autoclose>
		<div class="text-center">
			<svg
				aria-hidden="true"
				class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<h2 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
				{$t('home.fail_modal.message')}
			</h2>
			<Button color="alternative">{$t('home.fail_modal.button')}</Button>
		</div>
	</Modal>
	<div class="flex-grow bg-gray-200 w-full mb-6">
		<!-- <div class="my-10"> -->
			{#if loading}
				<Spinner color="yellow" size="20" />
			{:else}
				<GoRadioTower />
			{/if}
		<!-- </div> -->
	</div>
	<div class="bg-gray-200 p-4 w-full h-24 flex justify-center items-center">
		<form method="POST" on:submit|preventDefault={handleSubmit}>
			<Button type="submit">
				{$t('home.button.scan')}
				<svg
					aria-hidden="true"
					class="ml-2 -mr-1 w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/></svg
				>
			</Button>
		</form>
	</div>
</div>
