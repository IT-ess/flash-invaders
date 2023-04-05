<script lang="ts">
	import { t } from '$lib/translations/translations';
	import { Card } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="space-y-5 items-center">
	<!-- todo: need better styling -->
	{#each data.invadersInfos as { img, alt, id }}
		<Card {img} href="/{$page.params.lang}/context/{id}" horizontal>
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{$t(`common.zwt${id}.name`)}
			</h5>
			<!-- <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
				chronological order.
			</p> -->
		</Card>
	{/each}
</div>

