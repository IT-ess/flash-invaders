<script lang="ts">
	import { t } from '$lib/translations/translations';
	import { AccordionItem, Accordion, Blockquote, A } from 'flowbite-svelte';
	import GoRadioTower from 'svelte-icons/go/GoRadioTower.svelte';
	import GoBrowser from 'svelte-icons/go/GoBrowser.svelte';
	import GoBook from 'svelte-icons/go/GoBook.svelte';
	import GoArrowBoth from 'svelte-icons/go/GoArrowBoth.svelte';
	import FaMapMarkedAlt from 'svelte-icons/fa/FaMapMarkedAlt.svelte';
</script>

<div class="flex flex-col grow w-full justify-center items-center font-sans text-center">
	<div class="p-6 bg-white min-h-1/4 flex-initial">
		<Blockquote alignment="center"
			>{$t(`tutorial.welcome.p1`)} <span class="text-bluejum">Zw</span><span class="text-redjum"
				>ie</span
			><span class="text-blackjum">te</span><span class="text-yellowjum">ss</span> !
			{$t(`tutorial.welcome.p2`)}
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
				<div class="w-6 h-6"><GoBrowser /></div>
				<span class="mr-5">{$t(`tutorial.sec3.heading`)}</span>
			</span>
			<p class="mb-2 text-gray-500 dark:text-gray-400">
				{$t(`tutorial.sec3.content`)}
			</p>
			<A
				href="https://google.com/chrome/go-mobile"
				textColor="text-blue-600 dark:text-blue-500"
				aClass="inline-flex items-center font-medium hover:underline"
				target="_blank"
				>{$t(`tutorial.sec3.chrome`)}
				<svg
					aria-hidden="true"
					class="ml-1 w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/></svg
				></A
			>
		</AccordionItem>
		<AccordionItem>
			<span slot="header" class="text-base flex gap-2 w-fit">
				<div class="w-6 h-6"><GoBook /></div>
				<span class="mr-5">{$t(`tutorial.sec4.heading`)}</span>
			</span>
			<p class="mb-2 text-gray-500 dark:text-gray-400">
				{$t(`tutorial.sec4.content`)}
			</p>
		</AccordionItem>
		<AccordionItem>
			<span slot="header" class="text-base flex gap-2 w-fit">
				<div class="w-6 h-6"><FaMapMarkedAlt /></div>
				<span class="mr-5">{$t(`tutorial.sec5.heading`)}</span>
			</span>
			<p class="mb-2 text-gray-500 dark:text-gray-400">
				{$t(`tutorial.sec5.content`)}
			</p>
		</AccordionItem>
	</Accordion>
</div>
