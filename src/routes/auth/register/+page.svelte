<script lang="ts">
	import { t } from '$lib/translations/translations';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { Label, Input, Button} from 'flowbite-svelte';

	export let form: ActionData;
</script>

<form method="POST" use:enhance>
	{#if form?.error}
		<p>Error Message: {form?.message}</p>
		<p>Invalid Field: {form?.invalidField}</p>
	{/if}

	<h2>Register</h2>
	<div class="mb6">
		<Label for="firstname" class="block mb-2">{$t('auth.firstname')}Fristname</Label>
		<Input
			type="text"
			id="firstname"
			name="firstname"
			placeholder="Remplacer par un prénom français connu"
			required
		>
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
		<Label for="lastname" class="block mb-2">{$t('auth.lastname')}Lastname</Label>
		<Input
			type="text"
			id="lastname"
			name="lastname"
			placeholder="Remplacer par un nom français/allemand connu"
			required
		>
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

		<fieldset>
			<div class="flex items-center mb-4">
				<input
					id="country-option-1"
					type="radio"
					name="locale"
					value="fr"
					class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
					checked
				/>
				<label
					for="country-option-1"
					class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Français 🇫🇷
				</label>
			</div>

			<div class="flex items-center mb-4">
				<input
					id="country-option-2"
					type="radio"
					name="locale"
					value="de"
					class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
				/>
				<label
					for="country-option-2"
					class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Deutsch 🇩🇪
				</label>
			</div>
		</fieldset>
		<Button gradient color="purpleToBlue" type="submit">S'enregistrer /  </Button> 
		<!-- Changer le label en fonction du radio button -->
		<!-- <button type="submit">Register</button> -->
	</div>
</form>
