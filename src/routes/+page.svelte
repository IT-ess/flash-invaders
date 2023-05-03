<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { Button, Heading, Span } from 'flowbite-svelte';
</script>

<div class="flex flex-col h-screen justify-center items-center font-sans text-center">
	<!-- <Heading tag="h1" color="primary" class="m-4" customSize="text-3xl"><Span>zwietess</Span></Heading> -->
	<div><img src="/bandeau.jpg" alt="bandeau"/></div>
	<div class="flex-grow bg-gray-200 w-full">
		<img
			src="/home.jpg"
			alt="zwietess"
			class="mx-auto"
		/>
	</div>
	<div class="m-5 space-y-4">
		{#if data.user}
			<Button href="/fr/home">
				<!-- TODO : handle redirection to correct home -->
				Salut, {data.user.username}<svg
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

			<form action="/fr/auth/logout" method="POST">
				<Button type="submit">Log out</Button>
			</form>
			<!-- This form is only for tests -->
		{:else}
			<div class="my-auto space-y-4">
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
