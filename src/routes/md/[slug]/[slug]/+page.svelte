<script>
	import SEO from "$lib/components/SEO.svelte";
	import Article from "$lib/components/Article.svelte";

	export let data;
</script>

<SEO
	title={data.title}
	description={data.description}
/>

<Article {data} />
