<script lang="ts">
	import type { ActionData } from './$types';
	import { t } from '$lib/translations/translations';
	import { enhance } from "$app/forms";

	export let form: ActionData;
</script>

<form method="POST" use:enhance>
	{#if form?.error}
		<p>Error Message: {form?.message}</p>
		<p>Invalid Field: {form?.invalidField}</p>
	{/if}

	<h2>Register</h2>

	<label for="firstname">{$t('auth.firstname')}</label>
	<input type="text" id="firstname" name="firstname" required />

	<label for="lastname">{$t('auth.lastname')}</label>
	<input type="text" id="lastname" name="lastname" required />

	<label for="locale">Locale</label>
	<input type="text" id="locale" name="locale" required /> <!-- TODO : use a select -->
	
	<button type="submit">Register</button>
</form>