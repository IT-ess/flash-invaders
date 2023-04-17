<script lang="ts">
	import { t } from '$lib/translations/translations';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { Label, Input, Button, Heading } from 'flowbite-svelte';
	import { page } from '$app/stores';
	export let form: ActionData;
</script>

<form method="POST" use:enhance>
	{#if form?.error}
		<p>Erreur: {form?.message}</p>
		<p>Champ invalide: {form?.invalidField}</p>
	{/if}

	<Heading tag="h1">{$t('auth.register')}</Heading>
	<div class="mb6">
		<Label for="firstname" class="block mb-2">{$t('auth.firstname.label')}</Label>
		<Input type="text" id="firstname" name="firstname" placeholder={$t('auth.firstname.placeholder')} required>
			<svg
				slot="left"
				aria-hidden="true"
				class="w-5 h-5 text-gray-500 dark:text-gray-400"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path
					d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
				/></svg
			>
		</Input>
		<Label for="lastname" class="block mb-2">{$t('auth.lastname.label')}</Label>
		<Input type="text" id="lastname" name="lastname" placeholder={$t('auth.lastname.placeholder')} required>
			<svg
				slot="left"
				aria-hidden="true"
				class="w-5 h-5 text-gray-500 dark:text-gray-400"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path
					d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
				/></svg
			>
		</Input>
		<input name="locale" type="hidden" value={$page.params.lang} />
		
		<Button gradient color="purpleToBlue" type="submit">{$t('auth.register')}</Button>
	</div>
</form>
