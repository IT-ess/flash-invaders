<script lang="ts">
	import { t } from '$lib/translations/translations';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { Label, Input, Button, Heading } from 'flowbite-svelte';
	import { page } from '$app/stores';
	export let form: ActionData;
</script>

<form method="POST" use:enhance class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md mx-auto mt-20">
	{#if form?.error}
		<div class="bg-red-200 border-red-400 border p-4 rounded-lg mb-6">
			<p class="text-red-600">{$t('auth.error')}: {form?.message}</p>
			<p class="text-red-600">{$t('auth.invalid_field')}: {form?.invalidField}</p>
		</div>
	{/if}

	<h1 class="text-3xl font-bold mb-6">{$t('auth.register')}</h1>
	<div class="space-y-20">
		<div class="space-y-6">
			<div>
				<Label for="firstname" class="block mb-2 font-semibold">{$t('auth.firstname.label')}</Label>
				<Input type="text" id="firstname" name="firstname" placeholder={$t('auth.firstname.placeholder')} required class="border border-gray-300 dark:border-gray-500 bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
					<svg
						slot="left"
						aria-hidden="true"
						class="w-5 h-5 text-gray-500 dark:text-gray-400"
						fill="currentColor"
						viewBox="0 0 448 512"
						xmlns="http://www.w3.org/2000/svg"
						><path d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z" />
						</svg
					>
				</Input>
			</div>
			<div>
				<Label for="lastname" class="block mb-2 font-semibold">{$t('auth.lastname.label')}</Label>
				<Input type="text" id="lastname" name="lastname" placeholder={$t('auth.lastname.placeholder')} required class="border border-gray-300 dark:border-gray-500 bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
					<svg
						slot="left"
						aria-hidden="true"
						class="w-5 h-5 text-gray-500 dark:text-gray-400"
						fill="currentColor"
						viewBox="0 0 448 512"
						xmlns="http://www.w3.org/2000/svg"
						><path d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z" />
						</svg
					>
				</Input>
			</div>
		</div>
		
		<input name="locale" type="hidden" value={$page.params.lang} />
		
		<Button gradient color="purpleToBlue" type="submit" class="w-full py-2 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">{$t('auth.register')}</Button>
	</div>
</form>

