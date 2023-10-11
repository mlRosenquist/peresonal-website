<script lang="ts">
	import type { Experience } from './Experience';

	export let experience: Experience;
</script>

<div class="flex flex-row items-start">
	<div class="h-14 w-14">
		<img class="h-full w-full" src={experience.image} />
	</div>
	
	<div class="flex flex-col w-full">
		<div class="flex flex-row justify-between">
			<span class="flex flex-row space-x-1">
				<p class="font-medium">{experience.title}</p>
				<p class="font-light">at</p>
				<p class="font-medium">{experience.company}</p>
			</span>

			<div>
				<span class="flex flex-row space-x-2">
					<span class="flex flex-row items-center">
						<svg viewBox="0 0 24 24" class="w-3 h-3">
							<path
								fill-rule="evenodd"
								d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
								clip-rule="evenodd"
							/>
						</svg>
						<p class="text-xs font-light">{experience.location}</p>
					</span>

					<span class="flex flex-row items-center">
						<svg viewBox="0 0 24 24" class="w-3 h-3">
							<path
								d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
							/>
							<path
								fill-rule="evenodd"
								d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
								clip-rule="evenodd"
							/>
						</svg>
						<p class="text-xs font-light">{experience.start}</p>
						<p class="text-xs ml-1 mr-1 font-light">-</p>
						<p class="text-xs font-light">{experience.end}</p>
					</span>
				</span>
			</div>
		</div>
		<ul class="list-disc ml-5 space-y-1">
			{#each experience.descriptions as description}
				<li class="text-xs">{description}</li>
			{/each}
		</ul>
	</div>
</div>
