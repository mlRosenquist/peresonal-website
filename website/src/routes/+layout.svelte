<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.postcss';
	import Header from './Header.svelte';
	import './styles.css';
	import { Button } from 'flowbite-svelte';

	const STORAGE_KEY = 'theme';
	const DARK_PREFERENCE = '(prefers-color-scheme: dark)';

	const THEMES = {
		DARK: 'dark',
		LIGHT: 'light'
	};
	let currentTheme: string;

	const prefersDarkThemes = () => window.matchMedia(DARK_PREFERENCE).matches;

	const applyTheme = () => {
		const preferredTheme = prefersDarkThemes() ? THEMES.DARK : THEMES.LIGHT;
		currentTheme = localStorage.getItem(STORAGE_KEY) ?? preferredTheme;

		currentTheme = localStorage.getItem(STORAGE_KEY) ?? preferredTheme;

		if (currentTheme === THEMES.DARK) {
			document.body.classList.remove(THEMES.LIGHT);
			document.body.classList.add(THEMES.DARK);
		} else {
			document.body.classList.remove(THEMES.DARK);
			document.body.classList.add(THEMES.LIGHT);
		}
	};

	const toggleTheme = () => {
		const stored = localStorage.getItem(STORAGE_KEY);

		if (stored) {
			// clear storage
			localStorage.removeItem(STORAGE_KEY);
		} else {
			// store opposite of preference
			localStorage.setItem(STORAGE_KEY, prefersDarkThemes() ? THEMES.LIGHT : THEMES.DARK);
		}

		applyTheme();
	};

	onMount(() => {
		applyTheme();
		window.matchMedia(DARK_PREFERENCE).addEventListener('change', applyTheme);
	});
</script>

<div class="test">
	<Header />
	<Button
		id="theme-toggle"
		 color={"none"} shadow={false}
		class="fixed right-[48px] top-[48px] p-0 w-[48px] h-[48px] rounded-full hover:bg-gray-300/25 focus:ring-0"
		
		on:click={() => toggleTheme()}
	>
		<svg
			aria-hidden="true"
			id="theme-toggle-dark-icon"
			class="svg"
			width="38"
			height="38"
			viewBox="0 0 38 38"
		>
			<defs
				><mask id="theme-toggle-mask-2" class="">
					<circle class="circles" data-mask="true" cx="19" cy="19" r="13" />
					<circle class="mask" cx="25" cy="14" r="9" /></mask
				></defs
			>

			<path
				class="path"
				d="M19 3v7M19 35v-7M32.856 11l-6.062 3.5M5.144 27l6.062-3.5M5.144 11l6.062 3.5M32.856 27l-6.062-3.5"
			/>
			<circle class="circles" cx="19" cy="19" r="12" mask="url(#theme-toggle-mask-2)" />
		</svg>
	</Button>

	<slot />
</div>

<style>
	.circles {
		fill: currentColor;
		transform: scale(0.6);
		transform-origin: center;

		@media (prefers-reduced-motion: no-preference) {
			transition-property: transform, fill;
			transition-duration: 600ms;
			transition-delay: 0s;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		}

		&[data-mask='true'] {
			fill: white;
		}
	}

	:global(body.dark) .circles {
		fill: white;
		transform: none; /**Different*/
		transform-origin: center;

		@media (prefers-reduced-motion: no-preference) {
			transition-property: transform, fill;
			transition-duration: 600ms;
			transition-delay: 0.3s; /**Different*/
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		}

		&[data-mask='true'] {
			fill: white;
		}
	}

	.mask {
		fill: black;
		transform: translate3d(100%, -100%, 0);

		@media (prefers-reduced-motion: no-preference) {
			transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
			transition-delay: 0s;
		}
	}

	:global(body.dark) .mask {
		fill: black;
		transform: none; /**Different*/

		@media (prefers-reduced-motion: no-preference) {
			transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
			transition-delay: 0.3s; /**Different*/
		}
	}

	.path {
		stroke: currentColor;
		fill: none;
		stroke-linecap: round;
		stroke-width: 3;
		stroke-dasharray: 7 7;
		stroke-dashoffset: 0;
		opacity: 1;

		@media (prefers-reduced-motion: no-preference) {
			transition-property: stroke-dashoffset, opacity;
			transition-duration: 600ms;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-delay: 0.3s;
		}
	}

	:global(body.dark) path {
		stroke: currentColor;
		fill: none;
		stroke-linecap: round;
		stroke-width: 3;
		stroke-dasharray: 7 7;
		stroke-dashoffset: 7; /**Different*/
		opacity: 0; /**Different*/

		@media (prefers-reduced-motion: no-preference) {
			transition-property: stroke-dashoffset, opacity;
			transition-duration: 600ms;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-delay: 0s; /**Different*/
		}
	}
</style>
