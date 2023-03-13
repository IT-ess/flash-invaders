<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1 class="text-3xl underline text-gray-500 font-black">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<img src="/logo_jumelage.png" alt="Jumelage logo" />


{#if data.user}
	<p>Welcome back, {data.user.username}</p>
	<form action="/auth/logout" method="POST">
		<button type="submit">Log out</button>
	</form>
{:else}
	<p><a href="/auth/register">Register</a></p>
{/if}


