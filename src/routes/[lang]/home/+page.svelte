<script lang="ts">
	import { t } from '$lib/translations/translations';

	import type { InvaderType } from '$lib/entities/invader';

	const options = {
		enableHighAccuracy: true,
		timeout: 15000, // TODO : handle error if timeout
		maximumAge: 10000
	};

	let lat = 0;
	let long = 0;
	let test: InvaderType = {
		entityId: 'yeah',
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

<!-- <div>
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
</div> -->


<p>{$t('home.button.scan')}</p>

<p>{$t('home.button.map')}</p>

<p>Latitude : {lat}</p>
<p>Longitude : {long}</p>
<p>Test : {test.name} {test.entityId}</p>
{#if accuracy > 0}
	<p>Accuracy : {accuracy}</p>
{/if}

<button on:click={returnInvaderOrNot}>Chercher</button>
