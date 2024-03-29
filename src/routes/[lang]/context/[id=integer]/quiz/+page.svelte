<script lang="ts">
	import type { QuizItem } from '$lib/entities/Quiz';
	import { t } from '$lib/translations/translations';

	import type { PageData } from './$types';
	import { Button, Blockquote, Progressbar, P } from 'flowbite-svelte';

	export let data: PageData;

	// const questions = data.questions ?? []; // Bof bof
	// const getQuestions = async () => {
	// 	const res = await data.questions
	// }

	const themeColorsBg = ['bg-bluejum', 'bg-yellowjum', 'bg-blackjum', 'bg-redjum'];
	const themeColorsBgHover = [
		'hover:bg-bluejum-light',
		'hover:bg-yellowjum-light',
		'hover:bg-blackjum-light',
		'hover:bg-redjum-light'
	];
	const themeColorsBgFocus = [
		'focus:bg-bluejum-lighter',
		'focus:bg-yellowjum-lighter',
		'focus:bg-blackjum-lighter',
		'focus:bg-redjum-lighter'
	];
	let answers = new Array(4);

	function getRingClassFromAnswer(
		questions: QuizItem[],
		questionPointer: number,
		answerIndex: number
	): string {
		if (questions[questionPointer].correctIndex === answerIndex) {
			return 'ring-4 ring-green-600';
		}
		if (answers[questionPointer] === answerIndex) {
			return 'ring-4 ring-red-600';
		}
		return '';
	}

	let questionPointer = 0;
	let score = 0;
	let showAnswer: boolean;
	$: {
		showAnswer = false;
	}
</script>

{#await data.questions}
	Loading...
{:then questions}
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

				{#if showAnswer}
					<div class="flex flex-col items-center justify-evenly flex-grow overflow-y-auto">
						{#each questions[questionPointer].options as opt, i}
							<Button
								btnClass="text-center font-medium inline-flex items-center justify-center px-5 py-6 text-m text-white {getRingClassFromAnswer(
									questions,
									questionPointer,
									i
								)} rounded-lg w-full {themeColorsBg[i] !== undefined
									? themeColorsBg[i]
									: 'bg-blue-600 text-white'}"
							>
								{opt}
							</Button>
						{/each}
					</div>
					<div
						class="w-full flex flex-shrink-0 basis-20 justify-center items-center bg-gray-200 space-x-5"
					>
						<Button
							on:click={() => {
								if (questions[questionPointer].correctIndex === answers[questionPointer]) {
									score += (questionPointer + 1) * 10; // the harder are the questions, the more points you get
								}
								questionPointer++;
								showAnswer = false;
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
						{#if questions[questionPointer].correctIndex === answers[questionPointer]}
							<P color="text-green-700" size="lg" weight="extrabold">
								+{(questionPointer + 1) * 10}
							</P>
						{/if}
					</div>
				{:else}
					<div class="flex flex-col items-center justify-evenly flex-grow overflow-y-auto">
						{#each questions[questionPointer].options as opt, i}
							<Button
								btnClass="text-center font-medium focus:ring-4 inline-flex items-center justify-center px-5 py-6 text-m text-white focus:ring-blue-300 rounded-lg w-full {themeColorsBg[
									i
								] !== undefined
									? themeColorsBg[i] + ' ' + themeColorsBgHover[i] + ' ' + themeColorsBgFocus[i]
									: 'bg-blue-600 text-white'}"
								on:click={() => {
									answers[questionPointer] = i;
								}}
							>
								{opt}
							</Button>
						{/each}
					</div>
					<div class="w-full flex flex-shrink-0 basis-20 justify-center items-center bg-gray-200">
						<Button
							on:click={() => {
								showAnswer = true;
							}}
						>
							{$t('quiz.show')}
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
				{/if}
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
			<P align="center" height="loose" size="xl" weight="extrabold">
				Score : {score} / 100
			</P>
		{/if}
	</div>
{/await}
