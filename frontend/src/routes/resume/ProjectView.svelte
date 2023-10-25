<script lang="ts">
	import type { Project } from "$lib/models/Project";

	export let project: Project;
</script>

<div class="flex flex-col">
	<a class="flex flex-row items-center space-x-1 hover:underline" href={project.link}>
		<p class="font-mono font-medium">
			{project.title}
		</p>
		<img alt="" class="w-4 h-4" src={project.logo} />
	</a>

	<p class="text-xs text-justify break-words">{project.description}</p>
</div>
