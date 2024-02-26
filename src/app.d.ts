// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import("./lucia.js").Auth; // no change
	type DatabaseUserAttributes = {
		username: string;
		score: number;
		locale: string;
		zwt0: number;
		zwt1: number;
		zwt2: number;
		zwt3: number;
		zwt4: number;
		zwt5: number;
		zwt6: number;
		zwt7: number;
		zwt8: number;
		zwt9: number;
		zwt10: number;
		zwt11: number;
	};
	type DatabaseSessionAttributes = {}; // new
}

/// <reference types="@sveltejs/kit" />
declare namespace App {
	type Auth = import('lucia').Auth;
	interface Locals extends Auth {
		// validate: import('@lucia-auth/sveltekit').Validate;
        // validateUser: import('@lucia-auth/sveltekit').ValidateUser;
        // setSession: import('@lucia-auth/sveltekit').SetSession;
		auth: import('lucia').AuthRequest;
	}
	// interface Error {}
	// interface PageData {}
	// interface Platform {}
}
