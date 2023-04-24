<script lang="ts">
	import { t } from '$lib/translations/translations';
	import '../app.css';
	import { page } from '$app/stores';
	import screenfull from 'screenfull';
	import { ButtonGroup, Button, BottomNav, BottomNavItem, Tooltip } from 'flowbite-svelte';
	import MdFullscreen from 'svelte-icons/md/MdFullscreen.svelte';
	import MdFullscreenExit from 'svelte-icons/md/MdFullscreenExit.svelte';
	import IoIosRadio from 'svelte-icons/io/IoIosRadio.svelte';
	import FaRegImages from 'svelte-icons/fa/FaRegImages.svelte';
	import FaMapMarkedAlt from 'svelte-icons/fa/FaMapMarkedAlt.svelte';

	import { goto } from '$app/navigation';
	import Header from '../components/Header.svelte';

	let newLang: string;
	let newUrl: string;

	// Reactive statement to watch for changes in $page.params.lang
	$: {
		newLang = $page.params.lang === 'fr' ? 'de' : 'fr';
		newUrl = $page.url.pathname.replace($page.params.lang, newLang);
		document.documentElement.lang = $page.params.lang;
	}
</script>

<div class="relative h-screen w-screen flex flex-col">
	{#if $page.data.header}
		<header class="bg-gray-300 p-4 pr-28">
			<Header>{$t(`common.headers.${$page.url.pathname}`)}</Header>
		</header>
	{/if}
	<div class="fixed top-0 right-0 mt-4 mr-4 z-10">
		<ButtonGroup class="space-x-px">
			<Button
				class="!p-2 inline-flex items-center justify-center w-10 h-10 font-medium group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
				outline={true}
				on:click={() => screenfull.toggle()}
			>
				{#if screenfull.isFullscreen}
					<MdFullscreenExit />
				{:else}
					<MdFullscreen />
				{/if}
			</Button>
			{#if $page.params.lang !== undefined}
				<Button class="!p-2" outline={true} on:click={() => goto(newUrl)}>
					{#if $page.params.lang === 'fr'}
						🇩🇪
					{:else}
						🇫🇷
					{/if}
				</Button>
			{/if}
		</ButtonGroup>
	</div>
	<main class="flex-grow overflow-y-auto {$page.data.nav ? 'mb-20' : ''}">
		<slot />
	</main>
	{#if $page.data.cta}
		<div class="bg-gray-200 p-4 w-full h-24 flex justify-center items-center">
			<svelte:component this={$page.data.cta} />
		</div>
	{/if}
</div>

{#if $page.data.nav}
	<BottomNav navType="application" innerDiv="grid-cols-3">
		<BottomNavItem btnName="Gallery" appBtnPosition="left">
			<div class="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue-600">
				<a href="./gallery"> <FaRegImages /> </a>
			</div>
			<Tooltip arrow={false}>{$t('common.nav.gallery')}</Tooltip>
		</BottomNavItem>
		<div class="flex items-center justify-center">
			<BottomNavItem
				btnName="Search"
				appBtnPosition="custom"
				btnDefault="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
			>
				<div class="w-6 h-6 text-white">
					<a href="./home"><IoIosRadio /></a>
				</div>
				<Tooltip arrow={false}>{$t('common.nav.search')}</Tooltip>
			</BottomNavItem>
		</div>
		<BottomNavItem btnName="Map" appBtnPosition="right">
			<div class="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue-600">
				<a href="./map"> <FaMapMarkedAlt /> </a>
			</div>
			<Tooltip arrow={false}>{$t('common.nav.map')}</Tooltip>
		</BottomNavItem>
	</BottomNav>
{/if}
