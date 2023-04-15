<script lang="ts">
	import { t } from '$lib/translations/translations';
	import { Carousel, Heading, P, Button } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	let showThumbs = false;
	let showCaptions = false;
	let showIndicators = false;
	export let data: PageData;
	const images = data.context.carousel;
</script>

<div class="relative min-h-screen bg-gray-100">
	<div class="sticky top-0 z-0 bg-slate-600">
		<Carousel {images} {showThumbs} {showCaptions} {showIndicators} />
	</div>
	<div class="pt-1/3 bg-white p-4">
		<Heading tag="h1">{$t(`context.zwt${$page.params.id}.title`)}</Heading>
		<P class="text-gray-700">
			{$t(`context.zwt${$page.params.id}.content`)}
		</P>
	</div>
	{#if !data.answered}
	<Button href="./{$page.params.id}/quiz">Passer au Quiz</Button>
	{:else}
	<Button href="../gallery">Retourner à la galerie</Button>
	{/if}
</div>
