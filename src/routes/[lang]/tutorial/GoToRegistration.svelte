<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/translations/translations';
	import { Button, Toast } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
    import GoAlert from 'svelte-icons/go/GoAlert.svelte'

	let buttonDisabled = true;

	onMount(() => {
		setTimeout(() => {
			buttonDisabled = false;
		}, 15000);
	});

	let showToast = false;
	let counter = 0;

	function trigger(): void {
		showToast = true;
		counter = 5;
		timeout();
	}

	function timeout(): any {
		if (--counter > 0) return setTimeout(timeout, 1000);
		showToast = false;
	}
</script>

<div class="flex gap-10 fixed top-4 z-50">
	<Toast simple transition={slide} bind:open={showToast} color="red">
		<svelte:fragment slot="icon">
			<GoAlert/>
		</svelte:fragment>
		<p class="text-redjum">{$t('tutorial.warning')}</p>
	</Toast>
</div>

{#if buttonDisabled}
	<Button on:click={() => trigger()} btnClass="text-center font-medium focus:ring-4 focus:outline-none inline-flex items-center justify-center px-5 py-2.5 text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-lg cursor-not-allowed opacity-50">
		{$t('tutorial.register')}
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
{:else}
	<Button href="/{$page.params.lang}/auth/register">
		{$t('tutorial.register')}
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
{/if}
