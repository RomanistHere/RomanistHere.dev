<script>
	import { onMount } from "svelte";
	import { page } from "$app/stores";

	import "../app.css";

	import SEO from "$lib/components/SEO.svelte";
	import MenuButtons from "$lib/components/MenuButtons.svelte";

	// menuMode: "main" | "hire-me" | "my-thoughts"
	$: menuMode = "main";

	const menu = [{
		title: "About me",
		url: "about-me",
	}, {
		title: "Thoughts on important things",
		url: "my-thoughts",
		action: () => { menuMode = "my-thoughts" }
	}, {
		title: "Personal projects",
		url: "my-projects",
	}, {
		title: "Consider hiring me",
		url: "hire-me",
		action: () => { menuMode = "hire-me" }
	}, {
		title: "Contact me",
		url: "contact-me",
	}];

	const hireMeMenu = [{
		title: "About me",
		url: "hire-me/about-me",
	}, {
		title: "Where I worked",
		url: "hire-me/worked",
	}, {
		title: "My Resume and CV",
		url: "hire-me/resume-and-cv",
	}, {
		title: "Back to main menu",
		url: "../",
		action: () => { menuMode = "main" }
	}];

	const thoughtsMenu = [{
		title: "Why I don't have a fancy website",
		url: "my-thoughts/fancy-website",
	}, {
		title: "Back to main menu",
		url: "../",
		action: () => { menuMode = "main" }
	}];

	onMount(() => {
		const { pathname } = $page.url;
		if (pathname.includes("/md/hire-me")) {
			menuMode = "hire-me";
		} else if (pathname.includes("/md/my-thoughts")) {
			menuMode = "my-thoughts";
		}
	});
</script>

<SEO
	title="Who is RomanistHere"
	description=""
/>

<section class="max-w-4xl mx-auto py-36">
	<header class="mb-10">
		<p class="text-4xl font-semibold">Roman Smunyov</p>
		<p class="text-[2.75rem] leading-9 text-bright font-semibold">RomanistHere</p>
	</header>
	<div class="flex">
		<div class="w-2/5">
			{#if menuMode === "main"}
				<MenuButtons
					array={menu}
				/>
			{:else if menuMode === "hire-me"}
				<MenuButtons
					array={hireMeMenu}
				/>
			{:else if menuMode === "my-thoughts"}
				<MenuButtons
					array={thoughtsMenu}
				/>
			{/if}
		</div>
		<div class="w-3/5 px-8">
			<slot />
		</div>
	</div>
</section>
