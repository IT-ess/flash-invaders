<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import screenfull from 'screenfull';
	import { ButtonGroup, Button } from 'flowbite-svelte';
	import MdFullscreen from 'svelte-icons/md/MdFullscreen.svelte';
	import MdFullscreenExit from 'svelte-icons/md/MdFullscreenExit.svelte';

	import { goto } from '$app/navigation';

	let newLang: string;
	let newUrl: string;

	// Reactive statement to watch for changes in $page.params.lang
	$: {
		newLang = $page.params.lang === 'fr' ? 'de' : 'fr';
		newUrl = $page.url.pathname.replace($page.params.lang, newLang);
		document.documentElement.lang = $page.params.lang;
	}
</script>

<div class="fixed top-0 right-0 mt-4 mr-4 z-10">
	<ButtonGroup class="space-x-px">
		<Button
			class="!p-2 inline-flex items-center justify-center w-10 h-10 font-medium group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
			outline={true}
			on:click={() => screenfull.toggle()}
		>
			{#if screenfull.isFullscreen}
				<MdFullscreenExit />
			{:else}
				<MdFullscreen />
			{/if}
		</Button>
		{#if $page.params.lang !== undefined}
			<Button class="!p-2" outline={true} on:click={() => goto(newUrl)}>
				{#if $page.params.lang === 'fr'}
					🇩🇪
				{:else}
					🇫🇷
				{/if}
			</Button>
		{/if}
	</ButtonGroup>
</div>

<slot />
