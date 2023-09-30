<script lang="ts">
	import Footer from '$lib/components/footer/Footer.svelte';
	import '../app.postcss';
	import Header from '../lib/components/header/Header.svelte';
	import './styles.css';
	
</script>

<div class="flex flex-col min-h-screen">
	<Header />

	<div class="flex-1">
		<slot />
	</div>

	<Footer />
</div>
