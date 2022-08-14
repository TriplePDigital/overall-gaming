/* eslint-disable global-require */
/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 * */
module.exports = {
	content: [
		'./pages/**/*.{html,js,jsx,tsx,ts}',
		'./components/**/*.{html,js,jsx,tsx,ts}',
		'./utils/**/*.{html,js,jsx,tsx,ts}',
		'./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				og: {
					DEFAULT: '#F15A24',
					50: '#FCDCD1',
					100: '#FBCEBD',
					200: '#F8B197',
					300: '#F69471',
					400: '#F3774A',
					500: '#F15A24',
					600: '#D0400D',
					700: '#9B300A',
					800: '#662007',
					900: '#310F03',
				},
				'og-purple': {
					DEFAULT: '#7541E3',
					50: '#E9E1FB',
					100: '#DCCFF8',
					200: '#C2ACF3',
					300: '#A988ED',
					400: '#8F65E8',
					500: '#7541E3',
					600: '#571ECE',
					700: '#42179D',
					800: '#2D106C',
					900: '#19093B',
				},
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
				exo: ['Exo', 'sans-serif'],
				lato: ['Lato', 'sans-serif'],
			},
		},
	},
	plugins: [require('flowbite/plugin')],
}
