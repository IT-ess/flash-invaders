<script lang="ts">

	import { page } from "$app/stores";
	import { t } from "$lib/translations/translations";
	import { Button } from "flowbite-svelte";

</script>

<div class="left-0 w-full h-24 flex justify-center items-center bg-gray-200 fixed bottom-0">
    <Button href="./{$page.params.id}/quiz">{$t(`context.quiz`)}</Button>
</div>