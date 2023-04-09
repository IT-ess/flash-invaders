const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	theme: {
		extend: {},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			bluejum: { DEFAULT: '#002153', light: '#37467e', lighter: '#646fab'},
			yellowjum: { DEFAULT: '#FFCF00', light: '#caa100', lighter: '#977600' },
			redjum: { DEFAULT: '#CF0821', light: '#f43d3a', lighter: '#ff6055' },
			blackjum: { DEFAULT: '#000000', light: '#303030', lighter: '#5e5e5e' },
		}
	},

	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};

module.exports = config;
