<script>
	import HomeIcon from '$lib/components/header/HomeIcon.svelte';
	import ThemeToggle from '$lib/components/header/ThemeToggle.svelte';

	const routes = [
		{ url: '/about', name: 'About' },
		{ url: '/blogs', name: 'Blogs' },
		{ url: '/projects', name: 'Projects' },
		{ url: '/contact', name: 'Contact' }
	];
</script>

<header
	id="header"
	class="fixed left-[48px] top-[48px] bottom-[48px] w-[48px] flex flex-col space-y-12 items-center z-50"
>
	<HomeIcon />
	<nav class="flex flex-col h-screen justify-between">
		<div class="flex flex-col space-y-16">
			<a href="/#timeline">
				<p>Timeline</p>
			</a>
			<a href="/articles">
				<p>Articles</p>
			</a>
			<a href="/about">
				<p>About</p>
			</a>
			<a href="/contact">
				<p>Contact</p>
			</a>
		</div>

		<div class="flex flex-col space-y-4 items-center">
			<a href="https://github.com/mlRosenquist" class="rounded-icon">
				<svg class="w-6 h-6" viewBox="0 0 20 20">
					<path
						d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
					/>
				</svg>
			</a>

			<a href="https://www.linkedin.com/in/mortenlyngrosenquist/" class="rounded-icon">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24"
					><path
						d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
					/></svg
				>
			</a>

			<a href="/resume" class="rounded-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="4 0 14 24"
					stroke="currentColor"
					>
					<path d="M13 9h3.75M13 12h3.75M13 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"/>
				</svg>
			</a>
		</div>
	</nav>
</header>
<ThemeToggle />

<style lang="postcss">
	.rounded-icon {
		border-radius: 50%;
		width: 24px;
		height: 24px;
		overflow: hidden;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	p {
		@apply rotate-[270deg] transition-colors duration-300;
	}

	:global(body.dark) p {
		@apply text-white/80;
	}

	p::after {
		content: '';
		position: absolute;
		left: 0;
		top: 45%;
		height: 4px;
		width: 100%;
		background-color: rgb(76, 204, 204);
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 0.3s;
	}

	p:hover::after {
		transform: scaleX(1);
		transform-origin: left;
	}

	@keyframes inAnimation {
		0% {
			transform: scaleX(0);
			transform-origin: left;
		}
		100% {
			transform: scaleX(1);
			transform-origin: left;
		}
	}

	@keyframes outAnimation {
		0% {
			transform: scaleX(1);
			transform-origin: right;
		}
		100% {
			transform: scaleX(0);
			transform-origin: right;
		}
	}

	svg {
		@apply fill-[rgba(0,0,0,0.6)] hover:fill-[rgb(76,204,204)] hover:ease-in-out transition duration-300;
	}

	:global(body.dark) svg {
		@apply fill-white/80 hover:fill-[rgb(76,204,204)] hover:ease-in-out transition duration-300;
	}
</style>
