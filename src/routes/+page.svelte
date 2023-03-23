<script>
	import Circle from "$lib/components/Circle.svelte";
	import SEO from "$lib/components/SEO.svelte";
</script>

<SEO
	title="The home page"
	description="Random page of a random guy."
/>

<Circle />

<article class="absolute top-0 mt-96 hidden md:block">
	<p class="animate-appearing mb-0 opacity-0">Do you know what that is?</p>
	<p class="animate-appearing-delayed text-bright mt-4 opacity-0">I don't...</p>
	<p class="animate-appearing-delayed-twice mt-4 opacity-0">
		Try double click...
	</p>
</article>
