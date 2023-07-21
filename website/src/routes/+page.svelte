<script lang="ts">
	import Timeline from '$lib/components/Timeline.svelte';
	import Whoami from '$lib/components/Whoami.svelte';
	import Values from '$lib/components/Values.svelte';
	import Blog from '$lib/components/Blog.svelte';
	import Skillset from '$lib/components/Skillset.svelte';
	import { Svrollbar } from 'svrollbar';

	import { goto } from '$app/navigation';
	import autoHash from '$lib/actions/autoHash';

	function scrollIntoView(event: Event) {
		const target = event.currentTarget as HTMLAnchorElement;
		const attr = target.getAttribute('href');
		if (!target || !attr) return;

		const el = document.querySelector(attr);

		if (!el) return;
		el.scrollIntoView({
			behavior: 'smooth'
		});
	}

	const sections = [
		{
			id: 'Whoami',
			component: Whoami
		},
		{
			id: 'Timeline',
			component: Timeline
		},
		{
			id: 'Values',
			component: Values
		},
		{
			id: 'Skillset',
			component: Skillset
		},
		{
			id: 'Blog',
			component: Blog
		}
	];
</script>

<main>
	<div class="svrollbar">
		<Svrollbar />
	</div>

	{#each sections as section}
		<section id={section.id} use:autoHash>
			<svelte:component this={section.component} />
		</section>
	{/each}
</main>

<style>
	section {
		min-height: 100vh;
	}
	
	.svrollbar {
    --svrollbar-thumb-width: 6px;
    --svrollbar-thumb-background: linear-gradient(45deg, #bfc5da, rgb(68, 64, 124));
    --svrollbar-thumb-opacity: 0.8;
  }
</style>
