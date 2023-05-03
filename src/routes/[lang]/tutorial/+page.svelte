<script lang="ts">
	import { t } from '$lib/translations/translations';
	import { AccordionItem, Accordion, Blockquote } from 'flowbite-svelte';
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
			>ie</span><span class="text-blackjum">te</span><span class="text-yellowjum">ss</span> !
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
			<a href="https://google.com/chrome/go-mobile" target="_blank">{$t(`tutorial.sec3.chrome`)}</a>
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
