<script>
	import SEO from "$lib/components/SEO.svelte";

	export let data;
</script>

<SEO
	title={data.title}
	description={data.description}
/>

<article
	class="font-graph text-lg"
>
	<h1 class="relative text-4xl mt-2 pb-6 mb-8 text-bright font-lars tracking-tighter">
		{data.title}
		<span class="absolute block w-10 h-2 bg-bright bottom-0 left-0"></span>
	</h1>

	<svelte:component this={data.content} />
</article>

<style>
	article :global(p),
	article :global(ul) {
		margin-bottom: 1.6rem;
	}

	article :global(ul) {
		padding-left: 1rem;
	}

	article :global(li) {
		list-style: disc;
		margin-bottom: 1.2rem;
		margin-left: .4rem;
	}
</style>