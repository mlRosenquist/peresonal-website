<script lang="ts">
	import { crossfade, draw, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>


<style global>
	
	:global(body) {
		background-color: #f2f2f2;
		
		transition: background-color 1s;
	}
	:global(body.dark) {
		background-color: black;
	}
</style>
