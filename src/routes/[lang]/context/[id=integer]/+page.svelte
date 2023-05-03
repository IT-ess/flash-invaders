<script lang="ts">
	import { t } from '$lib/translations/translations';
	import { Heading, P, Button, Video } from 'flowbite-svelte';
	import Carousel from '../../../../components/FlowbiteCustomCarousel/Carousel.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	let showThumbs = false;
	let showCaptions = false;
	let showIndicators = false;
	export let data: PageData;
	const images = data.context.carousel;
	const content = data.context.items;
</script>

<div class="relative min-h-screen flex flex-col bg-gray-100">
	<div class="sticky top-0 z-0 bg-slate-600 max-w-4xl">
		<Carousel {images} {showThumbs} {showCaptions} {showIndicators} />
	</div>
	<div class="bg-white pt-4 pb-24 px-8 flex-grow flex flex-col overflow-y-scroll mb-6">
		<div class="pb-4">
			<Heading tag="h1">{$t(`common.zwt${$page.params.id}.name`)}</Heading>
		</div>

		<div class="pr-2 flex-grow space-y-8">
			{#each content as { source, type, caption }}
				{#if type === 'text'}
					<div>
						<P size="xl" justify>
							{$t(source)}
						</P>
					</div>
				{:else if type === 'video'}
					<div>
						{#if caption}
							<P size="lg" italic>{caption}</P>
						{/if}
						<Video src={source} controls />
					</div>
				{:else if type === 'audio'}
					<div>
						{#if caption}
							<P size="lg" italic>{caption}</P>
						{/if}
						<audio controls src={source} />
					</div>
				{:else}
					<p>Wrong type of content</p>
				{/if}
			{/each}
		</div>
	</div>
	{#if !data.answered}
		<div class="left-0 w-full h-24 flex justify-center items-center bg-gray-200 fixed bottom-0">
			<Button href="./{$page.params.id}/quiz">{$t(`context.quiz`)}</Button>
		</div>
	{:else}
		<div class="left-0 w-full h-24 flex justify-center items-center bg-gray-200 fixed bottom-0">
			<Button href="../gallery">{$t(`context.gallery`)}</Button>
		</div>
	{/if}
</div>
