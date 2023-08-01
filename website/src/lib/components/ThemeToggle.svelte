<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { toggleTheme, addThemeChangeListener, removeThemeChangeListener } from '$lib/stores/themeStore';

	onMount(() => {
		addThemeChangeListener();
	});

	onDestroy(() => {
		removeThemeChangeListener();
	});
</script>

<button
	id="theme-toggle"
	class="fixed right-[48px] top-[48px] p-0 w-[48px] h-[48px] flex items-center justify-center rounded-full hover:bg-gray-300/25 focus:ring-0"
	on:click={() => toggleTheme()}
>
	<svg
		aria-hidden="true"
		id="theme-toggle-dark-icon"
		class="svg center"
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
</button>

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
		transform: none; 
		transform-origin: center;

		@media (prefers-reduced-motion: no-preference) {
			transition-property: transform, fill;
			transition-duration: 600ms;
			transition-delay: 0.3s; 
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
		transform: none; 

		@media (prefers-reduced-motion: no-preference) {
			transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
			transition-delay: 0.3s; 
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
		stroke-dashoffset: 7; 
		opacity: 0; 

		@media (prefers-reduced-motion: no-preference) {
			transition-property: stroke-dashoffset, opacity;
			transition-duration: 600ms;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-delay: 0s; 
		}
	}
</style>
