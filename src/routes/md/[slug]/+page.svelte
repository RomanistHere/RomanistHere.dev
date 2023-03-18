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
		margin-bottom: 1.2rem;
		margin-left: .4rem;

		list-style: disc;
	}

	article :global(a) {
		position: relative;
		white-space: nowrap;

		text-decoration: underline;
		transition: color .2s;
	}

	article :global(a::before) {
		content: "";
		position: absolute;
		z-index: -1;

		left: -2px;
		right: -2px;
		top: -4px;
		bottom: -4px;

		transition: background-color .2s
	}

	article :global(a:hover) {
		color: rgb(32, 35, 41);
	}

	article :global(a:hover::before) {
		background-color: rgb(244, 237, 224);
	}
</style>