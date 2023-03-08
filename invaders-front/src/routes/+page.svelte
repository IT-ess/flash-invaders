<script lang="ts">
	import { t } from '$lib/translations/translations';
	import type { InvaderType } from '$lib/entities/invader';
	import type { PageData } from './$types';

	export let data: PageData;

	const options = {
		enableHighAccuracy: true,
		timeout: 15000, // TODO : handle error if timeout
		maximumAge: 10000
	};

	let lat = 0;
	let long = 0;
	let test: InvaderType = {
		entityId: "yeah",
		name: 'non',
		location: { latitude: 0, longitude: 0 },
		question1: 'hey',
		question2: 'hoy',
		question3: 'ey',
		question4: 'hiya',
		answers1: [''],
		answers2: [''],
		answers3: [''],
		answers4: [''],
		solution1: 1,
		solution2: 1,
		solution3: 1,
		solution4: 1
	};
	let accuracy = 0;

	function getCurrentLocation(): Promise<GeolocationPosition> {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				(position: GeolocationPosition) => {
					resolve(position);
				},
				(error: GeolocationPositionError) => {
					reject(error);
				},
				options
			);
		});
	}

	function returnInvaderOrNot() {
		getCurrentLocation()
			.then(async (position: GeolocationPosition) => {
				lat = position.coords.latitude;
				long = position.coords.longitude;
				accuracy = position.coords.accuracy;

				const response = await fetch('/api/geo', {
					method: 'POST',
					body: JSON.stringify({ lat, long }),
					headers: {
						'content-type': 'application/json'
					}
				});

				test = await response.json();
			})
			.catch((error: GeolocationPositionError) => {
				// can handle different cases based on error type (not authorized, not available, timeout)
				console.log(error);
			});
	}
	
</script>

<h1 class="text-3xl underline text-gray-500 font-black">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<img src="/logo_jumelage.png" alt="Jumelage logo" />


{#if data.user}
	<p>Welcome back, {data.user.username}</p>
	<form action="/auth/logout" method="POST">
		<button type="submit">Log out</button>
	</form>
{:else}
	<p><a href="/auth/register">Register</a></p>
{/if}

<div>
	<button>
		<a href="/scan" target="_blank" rel="noopener noreferrer">
			{$t('home.button.scan')}
		</a>
	</button>
	<button>
		<a href="/map" target="_blank" rel="noopener noreferrer">
			{$t('home.button.map')}
		</a>
	</button>
	<p>{$t('home.content')}</p>
</div>

<p>Latitude : {lat}</p>
<p>Longitude : {long}</p>
<p>Test : {test.name} {test.entityId}</p>
{#if accuracy > 0}
	<p>Accuracy : {accuracy}</p>
{/if}

<button on:click={returnInvaderOrNot}>Chercher</button>
