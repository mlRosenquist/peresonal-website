<script lang="ts">
	import '../app.postcss';
	import Header from '../lib/components/Header/Header.svelte';
	import './styles.css';
	
</script>

<div >
	<Header />

	<slot />
</div>
