<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from 'flowbite-svelte';

	export let data: PageData;

	const questions = data.questions;

	let answers = new Array(questions.length).fill(null);
	let questionPointer = 0;
	function getScore(): number {
		let score = answers.reduce((acc, val, index) => {
			if (questions[index].correctIndex == val) {
				return acc + 1;
			}
			return acc;
		}, 0);
		return (score / questions.length) * 100;
	}
</script>

<div class="fixed top-0 left-0 w-screen h-screen">
	<!-- I must fix the buttons issue -->
	{#if !(questionPointer > answers.length - 1)}
		<div class="w-full h-full flex flex-col">
			<div class="p-12">
				<h2>
					{questions[questionPointer].question}
				</h2>
				<div class="flex flex-wrap justify-between">
					{#each questions[questionPointer].options as opt, i}
						<button
							class="w-5/12 my-2 rounded-lg p-2 {answers[questionPointer] == i
								? 'bg-black text-white'
								: 'bg-blue-600 text-white'}"
							on:click={() => {
								answers[questionPointer] = i;
							}}
						>
							{opt}
						</button>
					{/each}
				</div>
			</div>
			<div class="left-0 w-full h-12 flex justify-between items-center bg-gray-200">
				<div class="w-40 h-2 mx-2 bg-gray-400 rounded-full overflow-hidden">
					<div
						style="width:{(questionPointer / questions.length) * 100}%;"
						class="h-full bg-blue-600"
					/>
				</div>
				<div class="mr-2">
					<!-- est-ce que je veux vraiment garder ce fonctionnement où on peut revenir en arrière ? -->
					<button
						disabled={questionPointer == 0}
						on:click={() => {
							questionPointer--;
						}}
						class="bg-blue-600 text-white p-2 rounded-lg">&lt;</button
					>
					<button
						on:click={() => {
							questionPointer++;
						}}
						class="bg-blue-600 text-white p-2 rounded-lg">&gt;</button
					>
				</div>
			</div>
		</div>
	{:else}
		<div class="w-full h-full flex flex-col justify-center items-center">
			<h1>Vos réponses ont été enregistrées.</h1>
			<form method="POST" action="?/submitScoreAndReturnHome">
				<input name="score" type="hidden" value={getScore()} />
				<Button type="submit">
					Retourner à l'accueil
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
