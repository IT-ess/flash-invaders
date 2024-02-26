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

	const getCarousel = async () => {
		const res = await data.context;
		return res.carousel;
	};

	const getItems = async () => {
		const res = await data.context;
		return res.items;
	};
</script>

<div class="relative min-h-screen flex flex-col bg-gray-100">
	<div class="bg-white pt-4 px-8 flex-grow flex flex-col overflow-y-auto pb-6">
		{#await getCarousel()}
			Loading...
		{:then images}
			<Carousel {images} {showThumbs} {showCaptions} {showIndicators} />
		{/await}
		<div class="pb-4 mt-4">
			<Heading tag="h1">{$t(`common.zwt${$page.params.id}.name`)}</Heading>
		</div>
		{#await getItems()}
			Loading...
		{:then item}
			<div class="pr-2 flex-grow space-y-8">
				{#each item as { source, type, caption }}
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
		{/await}
	</div>
	<div class="w-full h-24 flex justify-center items-center bg-gray-200 space-x-4">
		<Button href="/{$page.params.lang}/gallery">{$t('context.gallery')}</Button>
		{#if !data.answered}
			<Button href="./{$page.params.id}/quiz">{$t(`context.quiz`)}</Button>
		{/if}
	</div>
</div>
