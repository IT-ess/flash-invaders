<script lang="ts">
	import '../app.css';
	import { page } from "$app/stores";
	import { handleSession } from "@lucia-auth/sveltekit/client";

	handleSession(page);
</script>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!-- TODO : rajoute le param lang dans meta pour définir la langue et pas faire faire des trucs chelous aux traducteurs des tels -->
    <title>Zwietess</title>
</head>
<body class="h-screen">
	<slot />
</body>
