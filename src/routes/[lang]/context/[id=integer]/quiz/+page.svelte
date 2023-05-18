<script lang="ts">
	import { t } from '$lib/translations/translations';

	import type { PageData } from './$types';
	import { Button, Blockquote, Progressbar } from 'flowbite-svelte';

	export let data: PageData;

	const questions = data.questions ?? []; // Bof bof

	const themeColorsBg = ['bg-bluejum', 'bg-yellowjum', 'bg-blackjum', 'bg-redjum'];
	const themeColorsBgHover = [
		'hover:bg-bluejum-light',
		'hover:bg-yellowjum-light',
		'hover:bg-blackjum-light',
		'hover:bg-redjum-light'
	];

	let answers = new Array(questions.length).fill(null);
	let questionPointer = 0;
	let score = 0;
</script>

<div class="relative w-screen h-screen flex flex-col">
	{#if !(questionPointer > answers.length - 1)}
		<div class="w-full h-full flex flex-col">
			<div class="my-0">
				<Progressbar progress="+{(questionPointer / questions.length) * 100}" size="h-1.5" />
			</div>
			<div class="p-6 mt-9 bg-white min-h-1/4 flex-initial">
				<Blockquote>
					{questions[questionPointer].question}
				</Blockquote>
				<span class="text-bluejum" /><span class="text-redjum" /><span
					class="text-yellowjum"
				/><span class="text-blackjum" />
			</div>
			<div class="flex flex-col items-center justify-evenly flex-grow overflow-y-auto">
				{#each questions[questionPointer].options as opt, i}
					<Button
						btnClass="text-center font-medium focus:ring-4 focus:outline-none inline-flex items-center justify-center px-5 py-6 text-m text-white focus:ring-blue-300 rounded-lg w-full {themeColorsBg[
							i
						] !== undefined
							? themeColorsBg[i] + ' ' + themeColorsBgHover[i]
							: 'bg-blue-600 text-white'}"
						on:click={() => {
							answers[questionPointer] = i;
						}}
					>
						{opt}
					</Button>
				{/each}
			</div>
			<div class="w-full flex-shrink-0 basis-20 justify-center items-center bg-gray-200">
				<div class="w-full text-center">
					<Button
						on:click={() => {
							if (questions[questionPointer].correctIndex == answers[questionPointer]) {
								score += (questionPointer + 1) * 10; // the harder are the questions, the more points you get
							}
							questionPointer++;
						}}
					>
						{$t('quiz.next')}
						<svg
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
			</div>
		</div>
	{:else}
		<div class="w-full h-full flex flex-col justify-center items-center">
			<h1>{$t('quiz.submitted')}</h1>
			<form method="POST" action="?/submitScoreAndReturnHome">
				<input name="score" type="hidden" value={score} />
				<Button type="submit">
					{$t('quiz.home')}
					<svg
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
			</form>
		</div>
	{/if}
</div>
