<script lang="ts">
	import { t } from '$lib/translations/translations';
	import { Card } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	export let data: PageData;
	const themeColorsText = ['text-bluejum', 'text-yellowjum', 'text-blackjum', 'text-redjum'];
</script>

<div class="space-y-5 h-screen flex flex-wrap items-center justify-center">
	<!-- todo: need better styling -->
	{#each data.invadersInfos as { img, alt, id }, i}
		<div class="mx-4 my-2">
			<Card {img} href="/{$page.params.lang}/context/{id}" horizontal>
				<h5
					class="mb-2 text-2xl font-bold tracking-tight {themeColorsText[i % 4] !== undefined
						? themeColorsText[i % 4]
						: 'text-slate-600'}"
				>
				<!-- TODO: Improve this styling, it looks awful. -->
					{$t(`common.zwt${id}.name`)}
				</h5>
				<!-- <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
				chronological order.
			</p> -->
			</Card>
		</div>
	{/each}
</div>
