<script>
	let menuOpen = false;
	const routes = [
		{ url: '/about', name: 'About' },
		{ url: '/blogs', name: 'Blogs' },
		{ url: '/projects', name: 'Projects' },
		{ url: '/contact', name: 'Contact' }
	];
</script>

<header class="p-4  bg-black">
	<div class="container flex items-center mx-auto">
		<a href="/">
			<img src="icon.jpg" alt="logo" class="w-12 h-12" />
		</a>
		<nav class="container mx-auto flex justify-end">
			<div class="justify-start" />

			<div class="w-full block lg:flex lg:items-center lg:w-auto ">
				<div >
					{#each routes as route}
						<a href={route.url} class="text-gray-400 text-l mx-3 hover:text-teal-300 font-sans">{route.name}</a>
					{/each}
				</div>
			</div>
		</nav>
	</div>
</header>

<style>

</style>
