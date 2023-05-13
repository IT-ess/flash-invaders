<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { Button } from 'flowbite-svelte';
	let capitalized = '';
	if (data.user) {
		const firstname = data.user.username.split('.')[0];
		capitalized = firstname.charAt(0).toUpperCase() + firstname.slice(1);
	}
</script>

<div class="flex flex-col h-full w-full justify-center items-center font-sans text-center">
	<div class="flex-grow align-middle">
		<img src="/home.webp" alt="zwietess" class="w-full h-full object-cover" />
	</div>
	<div class="m-5 space-y-4">
		{#if data.user}
			<Button href="/fr/home">
				<!-- TODO : handle redirection to correct home -->
				Salut {capitalized}<svg
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
			<!-- 
			<form action="/fr/auth/logout" method="POST">
				<Button type="submit">Log out</Button>
			</form>
			This form is only for tests -->
		{:else}
			<div class="my-auto space-y-4 flex-grow">
				<Button href="/fr/tutorial" lang="fr">
					C'est parti ! 🇫🇷 <svg
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
				<Button href="/de/tutorial" lang="de">
					Lass uns gehen ! 🇩🇪 <svg
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
			</div>
		{/if}
	</div>
</div>
