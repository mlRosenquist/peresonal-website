<script lang="ts">
	import { onMount } from 'svelte';
	import { register } from 'swiper/element/bundle';
	import ScrollIndicator from './ScrollIndicator.svelte';

	register();

	let roles: string[] = ['Developer'];

	onMount(() => {
		roles = ['Developer', 'Engineer', 'Architect'];
	});
</script>

<div class="leading-none">
	<span class="flex flex-row items-center">
		<h1 class="mb-4 font-mono text-[24px] uppercase tracking-widest font-bold text-gray-500">
			Morten Rosenquist
		</h1>
	</span>

	<span class="flex flex-row items-center">
		<h1 class="title font-mono text-[64px] uppercase tracking-widest font-bold dark:text-white">Software</h1>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			color="gray"
			viewBox="0 0 24 24"
			stroke-width="0.25"
			stroke="currentColor"
			class="w-16 h-16"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
		</svg>
	</span>

	<span class="flex flex-row items-center">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="4 0 24 24" fill="gray" class="w-12 h-12">
			<path
				fill-rule="evenodd"
				d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
				clip-rule="evenodd"
			/>
		</svg>

		<swiper-container
			class="pointer-events-none"
			slidesPerView={1}
			
			loop={true}
			effect="flip"
			flipEffect={{
				slideShadows: false
			}}
			autoplay={{
				delay: 4000,
				disableOnInteraction: false
			}}
			
		>
			{#each roles as role}
				<swiper-slide
					><h1 class="title font-mono text-[64px] uppercase tracking-widest font-bold shadow-none dark:text-white">
						{role}
					</h1></swiper-slide
				>
			{/each}
		</swiper-container>
	</span>

	<ScrollIndicator />
</div>

<style>
	swiper-container {
		width: 100%;
		min-width: 0;
	}
</style>
