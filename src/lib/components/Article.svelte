<script>
	export let data;
</script>

<article
	class="font-graph text-lg"
>
	<h1 class="relative text-4xl mt-2 pb-6 mb-8 text-bright font-lars tracking-tighter">
		{data.title}
		<span class="absolute block w-10 h-2 bg-bright bottom-0 left-0"></span>
	</h1>

	<svelte:component this={data.content} />
</article>