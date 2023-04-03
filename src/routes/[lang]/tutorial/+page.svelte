<script lang="ts">
	import { AccordionItem, Accordion, P, Button } from 'flowbite-svelte';
	import { page } from '$app/stores';
</script>

<div class="flex-1 bg-gray-200 w-full h-screen p-4">
	<div class="max-w-2xl mx-auto">
		<P
			>Bienvenue à la grande chasse aux Zwietess ! Vous trouverez ci-après plusieurs éléments des
			règles du jeu...</P
		>
		<Accordion class="my-7">
			<AccordionItem>
				<span slot="header">My Header 1</span>
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint
					explicabo ...
				</p>
				<p class="text-gray-500 dark:text-gray-400">
					Check out this guide to learn how to <a
						href="/"
						target="_blank"
						rel="noreferrer"
						class="text-blue-600 dark:text-blue-500 hover:underline">get started</a
					> and start developing websites even faster with components on top of Tailwind CSS.
				</p>
			</AccordionItem>
			<AccordionItem>
				<span slot="header">My Header 2</span>
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint
					explicabo ...
				</p>
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint
					explicabo ...
				</p>
				<p class="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
				<ul class="list-disc pl-5 dark:text-gray-400 text-gray-500">
					<li>
						<a
							href="/"
							target="_blank"
							rel="noreferrer"
							class="text-blue-600 dark:text-blue-500 hover:underline">Lorem ipsum</a
						>
					</li>
					<li>
						<a
							href="https://tailwindui.com/"
							rel="noreferrer"
							target="_blank"
							class="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a
						>
					</li>
				</ul>
			</AccordionItem>
		</Accordion>
	</div>
	<div class="flex flex-col h-full justify-center items-center">
		<div class="flex-shrink">
			<Button href="/{$page.params.lang}/auth/register">
				Je m'enregistre ! 🇫🇷 <svg
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
