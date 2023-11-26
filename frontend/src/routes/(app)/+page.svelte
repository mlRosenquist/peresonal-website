<script lang="ts">
	import About from '$lib/components/about/About.svelte';
	import DisplacementSphere from '$lib/components/displacementSphere/DisplacementSphere.svelte';
	import Intro from '$lib/components/intro/Intro.svelte';

	import { register } from 'swiper/element/bundle';

	register();
</script>

<main>
	<DisplacementSphere />
	<section id="intro" class="h-screen pt-[25vh] pr-[25vw] pl-[20vw] relative z-[1]">
		<Intro />
	</section>
	<section id="about" class="h-[screen] z-[1] pt-24 pr-8 pl-[20vw] pb-50">
		<About></About>
	</section>
</main>

<style>
</style>
