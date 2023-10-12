<script lang="ts">
	import DisplacementSphere from '$lib/components/displacementSphere/DisplacementSphere.svelte';
	import Intro from '$lib/components/intro/Intro.svelte';

	import { register } from 'swiper/element/bundle';

	register();

	const roles = ['Developer', 'Engineer', 'Architect'];
</script>

<main>
	<DisplacementSphere />
	<section class="h-screen pt-[25vh] pr-[25vw] pl-[20vw] relative z-[1]">
		<Intro />
	</section>
	<section class="h-[50vh] z-[1]">
		
	</section>
</main>

<style>
</style>
