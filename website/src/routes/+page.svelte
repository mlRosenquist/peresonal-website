<script lang="ts">
	import DisplacementSphere from '$lib/components/displacementSphere/DisplacementSphere.svelte';
	import Intro from '$lib/components/intro/Intro.svelte'

	import { register } from 'swiper/element/bundle';

	register();

	const roles = ['Developer', 'Engineer', 'Architect'];
</script>

<main>
	<section >
		<DisplacementSphere />
		<Intro></Intro>
	</section>

	<section>
		<div class="h-screen" />
	</section>
</main>

<style>
</style>
