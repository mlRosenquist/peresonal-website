<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<main class="pt-[20vh] pr-[25vw] pl-[25vw]">
	<form method="POST" class="space-y-4">
		<h1
			class="mb-4 font-mono text-[24px] uppercase tracking-widest font-bold text-black dark:text-white"
		>
			Send me a message
		</h1>
		<div class="space-y-2">
			<label for="email" class="block mb-2 text-sm font-medium text-black dark:text-white"
				>Your email</label
			>
			<input
				type="email"
				id="email"
				name="email"
				class="w-64 bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-[#4ccccc] focus:border-[#4ccccc] block p-2.5 dark:bg-white"
				placeholder="alice@google.com"
				required
			/>
		</div>
		<div class="space-y-2">
			<label for="message" class="block mb-2 text-sm font-medium text-black dark:text-white"
				>Message</label
			>
			<div>
				<textarea
					id="message"
					name="message"
					rows="4"
					class="resize-none max-h-56 w-full bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-[#4ccccc] focus:border-[#4ccccc] block p-2.5 dark:bg-white"
					required
				/>
			</div>
		</div>

		<div class="flex items-center justify-end">
			<button
				type="submit"
				class="rounded-md bg-[#4ccccc]/60 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#4ccccc]"
				>Send Message</button
			>
		</div>
	</form>
</main>
