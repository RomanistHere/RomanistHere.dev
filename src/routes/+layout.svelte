<script>
	import { onMount } from "svelte";
	import { afterNavigate } from "$app/navigation";
	import { page } from "$app/stores";

	import "../app.css";

	import MenuButtons from "$lib/components/MenuButtons.svelte";

	// menuMode: "main" | "hire-me" | "my-thoughts"
	$: menuMode = "main";

	let top;

	const menu = [
		{
			title: "About me",
			url: "about-me",
		},
		{
			title: "Thoughts on some things",
			url: "my-thoughts",
			action: () => {
				menuMode = "my-thoughts";
			},
		},
		{
			title: "Personal projects",
			url: "my-projects",
		},
		{
			title: "Consider hiring me",
			url: "hire-me",
			action: () => {
				menuMode = "hire-me";
			},
		},
		{
			title: "Contact me",
			url: "contact-me",
		},
	];

	const hireMeMenu = [
		{
			title: "Professional summary",
			url: "hire-me/summary",
		},
		{
			title: "Where I worked",
			url: "hire-me/worked",
		},
		{
			title: "Links to GitHub, etc.",
			url: "hire-me/links",
		},
		{
			title: "Printable resume and CV",
			url: "hire-me/resume-and-cv",
		},
		{
			title: "Contact me",
			url: "hire-me/contact-me",
		},
		{
			title: "Back to main menu",
			url: "../",
			action: () => {
				menuMode = "main";
			},
		},
	];

	const thoughtsMenu = [
		{
			title: "Why I don't have a fancier website",
			url: "my-thoughts/fancy-website",
		},
		{
			title: "Back to main menu",
			url: "../",
			action: () => {
				menuMode = "main";
			},
		},
	];

	const scrollArticleToTop = () => {
		top?.scrollIntoView({
			behavior: "smooth",
			block: "end",
		});
	};

	const updateMenu = ({ pathname }) => {
		if (pathname.includes("/md/hire-me")) {
			menuMode = "hire-me";
		} else if (pathname.includes("/md/my-thoughts")) {
			menuMode = "my-thoughts";
		} else {
			menuMode = "main";
		}
	};

	$: updateMenu($page.url);

	onMount(() => {
		updateMenu($page.url);
	});

	afterNavigate(() => {
		scrollArticleToTop();
	});
</script>

<div
	class="max-w-7xl mx-auto py-12 md:py-36 px-4 md:px-12 md:h-screen md:overflow-hidden"
>
	<header class="mb-10 font-lars tracking-tighter">
		<p class="text-4xl font-semibold">Roman Smunyov</p>
		<p class="text-[2.75rem] leading-9 text-bright font-semibold">
			RomanistHere
		</p>
	</header>
	<div class="flex flex-col-reverse md:flex-row-reverse flex-wrap h-full">
		<div class="w-full md:w-4/6 md:px-8 md:h-screen relative">
			<main
				class="md:h-full md:overflow-auto md:no-scrollbar md:-mt-64 md:pt-64 md:pb-64"
			>
				<span bind:this={top} />
				<slot />
				{#if $page.url.pathname !== "/"}
					<button
						on:click|preventDefault={scrollArticleToTop}
						class="block mx-auto p-4 border border-bright rounded-xl md:hidden transition-colors active:border-light"
					>
						⬆️ Scroll back to top ⬆️
					</button>
				{/if}
			</main>
			<div class="absolute left-0 right-0 -top-64 h-36 hidden md:block" />
			<div
				class="absolute left-0 right-0 bottom-64 h-36 rotate-180 hidden md:block"
			/>
		</div>
		<div class="w-full md:w-2/6 font-lars mb-12 md:mb-0">
			<div class="-m-4 p-4 overflow-hidden md:px-0 md:mx-0 md:overflow-visible">
				{#if menuMode === "main"}
					<MenuButtons array={menu} />
				{:else if menuMode === "hire-me"}
					<MenuButtons array={hireMeMenu} />
				{:else if menuMode === "my-thoughts"}
					<MenuButtons array={thoughtsMenu} />
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.absolute {
		background: linear-gradient(
			to bottom,
			rgb(32, 35, 41) 10%,
			rgba(0, 0, 0, 0) 100%
		);
	}
</style>
