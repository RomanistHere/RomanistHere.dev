<script>
	export let title = "";
	export let description = "";
	export let image;
</script>

<svelte:head>
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>
	<meta
		name="format-detection"
		content="telephone=no"
	/>
	<link
		rel="me"
		href="mailto:romanisthere@pm.me"
	/>

	<meta
		name="description"
		content={description}
	/>

	<title>{title} | RomanistHere</title>

	<meta
		property="og:site_name"
		content="RomanistHere"
	/>
	<meta
		property="og:locale"
		content="en"
	/>
	<!--	<meta property="og:url" content={url} />-->
	<meta
		property="og:type"
		content="website"
	/>
	<meta
		property="og:title"
		content="{title} | RomanistHere"
	/>
	<meta
		property="og:description"
		content={description}
	/>
	{#if image}
		<meta
			property="og:image"
			content={image}
		/>
		<meta
			property="og:image:width"
			content="1200"
		/>
		<meta
			property="og:image:height"
			content="627"
		/>
		<meta
			property="og:image:alt"
			content="image preview"
		/>
	{:else}
		<meta
			property="og:image"
			content="https://avatars.githubusercontent.com/u/49812531?v=4"
		/>
		<meta
			property="og:image:width"
			content="400"
		/>
		<meta
			property="og:image:height"
			content="400"
		/>
		<meta
			property="og:image:alt"
			content="melme logo"
		/>
	{/if}

	<meta
		name="twitter:card"
		content={image ? "summary_large_image" : "summary"}
	/>

	<meta
		name="twitter:creator"
		content={"@RomanistHere"}
	/>
	<meta
		name="twitter:site"
		content={"@RomanistHere"}
	/>
	{#if image}
		<meta
			name="twitter:image"
			content={image}
		/>
	{:else}
		<meta
			name="twitter:image"
			content="https://avatars.githubusercontent.com/u/49812531?v=4"
		/>
	{/if}
</svelte:head>
