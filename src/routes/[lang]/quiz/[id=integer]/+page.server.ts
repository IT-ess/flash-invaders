import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { user } = await locals.validateUser();
	if (user?.progression === undefined || user.progression < 1) {
		throw redirect(307, '/fr/home'); // TODO : I must adapt this to the language of the user. Maybe it's better to move this at layout level to avoid reloading ?
	}
	return {
		questions: [
			{
				question: 'Which of the following special symbol allowed in a variable name?',
				options: ['* (asterisk)', '| (pipeline)', '- (hyphen)', '_ (underscore)'],
				correctIndex: 3
			},
			{
				question:
					'Which of the following correctly shows the hierarchy of arithmetic operations in C?',
				options: ['/ + * -', '* - / +', '+ - / *', '/ * + -'],
				correctIndex: 3
			},
			{
				question:
					'Which header file should be included to use functions like malloc() and calloc()?',
				options: ['memory.h', 'stdlib.h', 'string.h', 'dos.h'],
				correctIndex: 1
			},
			{
				question:
					'Which bitwise operator is suitable for turning off a particular bit in a number?',
				options: ['&& operator', '& operator', '|| operator', '! operator'],
				correctIndex: 1
			},
			{
				question: 'What function should be used to free the memory allocated by calloc() ?',
				options: [
					'dealloc();',
					'malloc(variable_name, 0)',
					'free();',
					'memalloc(variable_name, 0)'
				],
				correctIndex: 2
			}
		]
	};
};
