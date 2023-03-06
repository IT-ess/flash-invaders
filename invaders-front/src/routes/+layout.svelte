<script>
	import '../app.css';
	import { page } from "$app/stores";
	import { handleSession } from "@lucia-auth/sveltekit/client";

	handleSession(page);
</script>

<div class="bg-slate-900">
	<nav>
		<a href="/">home</a>
		<a href="/gallery">galerie</a>
	</nav>
</div>


<slot />