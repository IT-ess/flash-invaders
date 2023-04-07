<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from 'flowbite-svelte';
	import { goto, invalidateAll } from '$app/navigation';

    let newLang: string;
	let newUrl: string;

	// Reactive statement to watch for changes in $page.params.lang
	$: {
		newLang = $page.params.lang === 'fr' ? 'de' : 'fr';
		newUrl = $page.url.pathname.replace($page.params.lang, newLang);
		document.documentElement.lang = $page.params.lang;
	}
	const switchLocale = async () => {
		await goto(newUrl);
		await invalidateAll();
	};
</script>

<div class="fixed top-0 right-0 mt-4 mr-4">
    <Button class="!p-2" outline={true} on:click={switchLocale}>
        {#if $page.params.lang === 'fr'}
            🇩🇪
        {:else}
            🇫🇷
        {/if}
    </Button>
</div>


<slot />
