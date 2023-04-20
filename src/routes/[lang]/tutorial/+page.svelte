<script lang="ts">
	import { t } from '$lib/translations/translations';
	import { AccordionItem, Accordion, Button, Blockquote } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import GoRadioTower from 'svelte-icons/go/GoRadioTower.svelte';
	import GoBrowser from 'svelte-icons/go/GoBrowser.svelte'
	import GoBook from 'svelte-icons/go/GoBook.svelte'
	import GoArrowBoth from 'svelte-icons/go/GoArrowBoth.svelte'
</script>

<div class="h-screen overflow-hidden">
	<div class="flex flex-col grow w-screen justify-center items-center font-sans text-center">
		<div class="p-12 bg-white min-h-1/4 flex-initial">
			<Blockquote
				><span class="text-bluejum">Bienvenue à la grande chasse aux </span><span
					class="text-redjum"
					>Zwietess !
				</span><span class="text-yellowjum"
					>Vous trouverez ci-après plusieurs éléments des
				</span><span class="text-blackjum">règles du jeu...</span>
			</Blockquote>
		</div>

		<Accordion class="my-6 w-11/12 mx-2">
			<AccordionItem>
				<span slot="header" class="text-base flex gap-2 w-fit">
					<div class="w-6 h-6"><GoRadioTower /></div>
					<span class="mr-5">{$t(`tutorial.sec1.heading`)}</span>
				</span>
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					{$t(`tutorial.sec1.content`)}
				</p>
			</AccordionItem>
			<AccordionItem>
				<span slot="header" class="text-base flex gap-2 w-fit">
					<div class="w-6 h-6"><GoArrowBoth /></div>
					<span class="mr-5">{$t(`tutorial.sec2.heading`)}</span>
				</span>
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					{$t(`tutorial.sec2.content`)}
				</p>
			</AccordionItem>
			<AccordionItem>
				<span slot="header" class="text-base flex gap-2 w-fit">
					<div class="w-6 h-6"><GoBrowser/></div>
					<span class="mr-5">{$t(`tutorial.sec3.heading`)}</span>
				</span>
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					{$t(`tutorial.sec3.content`)}
				</p>
			</AccordionItem>
			<AccordionItem>
				<span slot="header" class="text-base flex gap-2 w-fit">
					<div class="w-6 h-6"><GoBook/></div>
					<span class="mr-5">{$t(`tutorial.sec4.heading`)}</span>
				</span>
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					{$t(`tutorial.sec4.content`)}
				</p>
			</AccordionItem>
		</Accordion>
	</div>
	<div class="left-0 w-full h-24 flex justify-center items-center bg-gray-200 fixed bottom-0">
		<Button href="/{$page.params.lang}/auth/register">
			{$t("tutorial.register")} <svg
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
