<script>
	let menuOpen = false;
	const routes = [
		{ url: '/about', name: 'About' },
		{ url: '/blogs', name: 'Blogs' },
		{ url: '/projects', name: 'Projects' },
		{ url: '/contact', name: 'Contact' }
	];
</script>

<header class="p-4 text-white">
	<nav class="container mx-auto flex justify-between items-center">
		<div>
			<a href="/">
				<img src="https://placehold.it/50x50" alt="logo" class="w-12 h-12"/>
			</a>
		</div>
		<div class="lg:hidden">
			<button
				class="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
				on:click={(_) => (menuOpen = !menuOpen)}
			>
				<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
					><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg
				>
			</button>
		</div>
		<div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto" class:hidden={!menuOpen}>
			<div class="text-sm lg:flex-grow">
				{#each routes as route}
					<a href={route.url} class="block mt-4 lg:inline-block lg:mt-0 text-white text-xl mx-2"
						>{route.name}</a
					>
				{/each}
			</div>
		</div>
	</nav>
</header>
