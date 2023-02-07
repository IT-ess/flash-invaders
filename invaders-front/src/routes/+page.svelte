<script>
    import { t } from '$lib//translations/translations';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<img src="/logo_jumelage.png" alt="Jumelage logo" />

<div>
    <button>
        Scanner un zwietess 
    </button>
    <p>{$t('home.content')}</p>
</div>