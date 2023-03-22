<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { Button, Heading, Span } from 'flowbite-svelte';
</script>

<!-- <h1 class="text-3xl underline text-gray-500 font-black">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
<div class="flex flex-col h-screen justify-center items-center font-sans text-center">
	<Heading tag="h1" color="primary" class="m-5"><Span gradient>zwietess</Span></Heading>

	<div class="flex-1 bg-gray-200 w-full">
		<img src="/logo_jumelage.png" alt="Jumelage logo" />
	</div>
	<div class="m-5 space-y-4">
		{#if data.user}
			<Button href="/fr/home">
				<!-- TODO : handle redirection to correct home -->
				Welcome back, {data.user.username}<svg
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

			<form action="/auth/logout" method="POST">
				<!-- <button type="submit">Log out</button> -->
				<Button type="submit">Log out</Button>
			</form>
		{:else}
			<!-- <p><a href="/auth/register">Register</a></p> -->
			<Button href="/auth/register">
				C'est parti ! / Ich partish <svg
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
	</div>
</div>
