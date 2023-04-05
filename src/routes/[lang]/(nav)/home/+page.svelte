<script lang="ts">
	import { t } from '$lib/translations/translations';
	import { applyAction, deserialize } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { Button, Modal, Heading, Span } from 'flowbite-svelte';
	import type { InvaderType } from '$lib/entities/invader';

	let accuracy = 0;
	let successModal = false;
	let failModal = false;
	let invader: InvaderType

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
		applyAction(result); // I should be able to get the data through the form action after this apply, but it doesn't work
		if (result.type === 'success') {
			invader = {
				id: result.data?.invader.id,
				name: result.data?.invader.name,
				imageUrl: result.data?.invader.imageUrl,
				location: {
					latitude: result.data?.invader.location.latitude,
					longitude: result.data?.invader.location.longitude
				}
			}
			successModal = true;
		}
		if (result.type === 'failure') {
			failModal = true;
		}

	}

</script>

<div class="h-screen overflow-hidden">
	<div
		class="flex flex-col h-screen w-screen justify-center items-center font-sans text-center pb-24"
	>
		<Heading tag="h1" color="primary" class="m-5"><Span gradient>zwietess</Span></Heading>
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
					Vous avez trouvé un Zwietess !
				</h2>
				<img src={invader.imageUrl} alt="invaderthumbnail" />
				<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{invader.name}</h3>
				<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
					lat :{invader.location.latitude}
					long: {invader.location.longitude}
					acc: {accuracy}
				</h3>
				<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{invader.id}</h3>

				<Button href="/fr/context/{invader.id}" color="red" class="mr-2">Voir le Zwietess</Button>
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
					Rien dans les parages...
				</h2>
				<Button color='alternative'>Retour</Button>
			</div>
		</Modal>
		<div class="flex-auto bg-gray-200 w-full mb-6">
			<svg
				class="my-10 max-w-full fill-current text-gray-400"
				viewBox="0 0 481 481"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M240.5 477C371.115 477 477 371.115 477 240.5C477 109.885 371.115 4 240.5 4C109.885 4 4 109.885 4 240.5C4 371.115 109.885 477 240.5 477Z"
					stroke="#0074CD"
					stroke-opacity="0.42"
					stroke-width="7"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M240.5 423C341.292 423 423 341.292 423 240.5C423 139.708 341.292 58 240.5 58C139.708 58 58 139.708 58 240.5C58 341.292 139.708 423 240.5 423Z"
					stroke="#0074CD"
					stroke-opacity="0.7"
					stroke-width="7"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M240.5 334C292.139 334 334 292.139 334 240.5C334 188.861 292.139 147 240.5 147C188.861 147 147 188.861 147 240.5C147 292.139 188.861 334 240.5 334Z"
					stroke="#F8DF64"
					stroke-width="8"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M272.381 215.62C271.554 214.793 270.21 214.793 269.383 215.62L230.701 254.313C229.872 255.14 228.53 255.14 227.7 254.313L210.619 237.228C209.792 236.398 208.45 236.398 207.62 237.228L204.622 240.227C203.793 241.054 203.793 242.399 204.622 243.226L226.148 264.757C227.804 266.414 230.485 266.414 232.143 264.761L275.378 221.621C276.207 220.792 276.207 219.449 275.38 218.62L272.381 215.62Z"
					fill="#F8DF64"
				/>
			</svg>
		</div>
		<div class="my-auto space-y-4">
			<form method="POST" on:submit|preventDefault={handleSubmit}>
				<Button type="submit">
					{$t('home.button.scan')} 🔍
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
			<!-- <Button
				href="https://www.google.com/maps/d/u/0/edit?mid=1qDy-Qcv9ScGx97vlB1Wy_9tvOIumt0I&usp=sharing"
				target="_blank"
			>
				Carte 🗺️
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
			</Button> -->
			<!-- Update the map to show aproximative locations -->
		</div>
	</div>
</div>


