<script lang="ts">
	import { t } from '$lib/translations/translations';
	import { BottomNav, BottomNavItem, Tooltip } from 'flowbite-svelte';
	import IoIosRadio from 'svelte-icons/io/IoIosRadio.svelte';
	import FaRegImages from 'svelte-icons/fa/FaRegImages.svelte';
	import FaMapMarkedAlt from 'svelte-icons/fa/FaMapMarkedAlt.svelte';
	import { page } from '$app/stores';
</script>

<slot />

<!-- TODO : change the state to "active" depending on the current page -->
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
