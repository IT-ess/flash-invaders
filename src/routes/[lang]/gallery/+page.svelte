<script lang="ts">
	import { t } from '$lib/translations/translations';
	import { Card } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="space-y-5 flex flex-wrap items-center justify-center my-6">
	<!-- todo: need better styling -->
	{#each data.invadersInfos as { img, alt, id }}
		<div class="mx-4 my-2">
			<Card {img} href="/{$page.params.lang}/context/{id}" horizontal padding="md" size="lg">
				<h5
					class="mb-2 text-3xl font-bold tracking-tight text-blackjum"
				>
					{$t(`common.zwt${id}.name`)}
				</h5>
			</Card>
		</div>
	{/each}
</div>
