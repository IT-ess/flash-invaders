<script lang="ts">
	import '../app.css';
	import { page } from "$app/stores";
	import { handleSession } from "@lucia-auth/sveltekit/client";

	handleSession(page);
</script>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zwietess</title>
</head>
<body class="h-screen">
	<slot />
</body>
