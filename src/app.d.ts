// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
/// <reference types="lucia-auth" />
declare namespace Lucia {
	type Auth = import('$lib/server/lucia').Auth;
	type UserAttributes = {
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
}

/// <reference types="@sveltejs/kit" />
declare namespace App {
	type AuthRequest = import('lucia-auth').AuthRequest;
	interface Locals extends AuthRequest {}
	// interface Error {}
	// interface PageData {}
	// interface Platform {}
}
