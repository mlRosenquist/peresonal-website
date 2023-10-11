<script lang="ts">
	export let href = '#';
	export let text = '';
</script>

<a {href}>
	<span class="flex flex-row items-center">
		<slot />
		<p class="text-xs">{text}</p>
	</span>
</a>
