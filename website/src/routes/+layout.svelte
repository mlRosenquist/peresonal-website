<script lang="ts">
	import '../app.postcss';
	import Header from '../lib/components/Header.svelte';
	import './styles.css';
</script>

<div class="test">
	<Header />

	<slot />
</div>
