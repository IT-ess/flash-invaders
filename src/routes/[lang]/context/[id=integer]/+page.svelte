<script lang="ts">
	import { t } from '$lib/translations/translations';
	import { Carousel, Heading, P, Button } from 'flowbite-svelte';
	import type { PageData } from './$types';
	const images = [
		{
			id: 0,
			name: 'Arrivée',
			imgurl:
				'https://imagedelivery.net/6ZM0ENVQ5B1N8ekukm4aPw/f95fdb92-e21e-46c8-9525-77276e37a300/public'
		},
		{
			id: 1,
			name: 'Emotions',
			imgurl:
				'https://imagedelivery.net/6ZM0ENVQ5B1N8ekukm4aPw/4795959e-115f-40f2-fdd4-af869a17f600/public'
		},
		{
			id: 2,
			name: 'Dom Mocquereau',
			imgurl:
				'https://imagedelivery.net/6ZM0ENVQ5B1N8ekukm4aPw/008f6a98-2e7b-4e75-7e50-b68e117a8900/public'
		},
		{
			id: 3,
			name: 'Coeur',
			imgurl:
				'https://imagedelivery.net/6ZM0ENVQ5B1N8ekukm4aPw/5eb0613b-274f-4694-9e96-4aac082f8200/public'
		}
	];

	let showThumbs = false;
	let showCaptions = false;
	let showIndicators = false;
	export let data: PageData;
</script>

<div class="relative min-h-screen bg-gray-100">
	<div class="sticky top-0 z-10 bg-slate-600">
		<Carousel {images} {showThumbs} {showCaptions} {showIndicators} />
	</div>
	<div class="pt-1/3 bg-white p-4">
		<Heading tag="h1">{$t(`context.zwt${data.id}.title`)}</Heading>
		<P class="text-gray-700">
			{$t(`context.zwt${data.id}.content`)}
		</P>
	</div>
	<Button href="./{data.id}/quiz">Passer au Quiz</Button>
</div>
