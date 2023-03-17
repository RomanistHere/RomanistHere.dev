<script>
	import { fade } from "svelte/transition";
	import { goto } from "$app/navigation";

	import "../app.css";

	import gsap from "gsap";

	import SEO from "$lib/components/SEO.svelte";

	$: buttonRefs = [];
	$: subMenuButtonRefs = [];
	$: showSubmenu = false;

	const menu = [{
		title: "About me",
		url: "about-me",
		textRef: "heh"
	}, {
		title: "My thoughts on important things",
		url: "my-thoughts",
		textRef: "heh2"
	}, {
		title: "Personal projects",
		url: "my-projects",
		textRef: "heh2"
	}, {
		title: "Consider hiring me",
		url: "hire-me",
		textRef: "heh3",
		action: () => {
			showSubmenu = true;
		}
	}, {
		title: "Contact me",
		url: "contact-me",
		textRef: "heh3"
	}];

	const subMenu = [{
		title: "About me",
		url: "hire-me/about-me",
		textRef: "heh"
	}, {
		title: "Where I worked",
		url: "hire-me/worked",
		textRef: "heh"
	}, {
		title: "My Resume and CV",
		url: "hire-me/resume-and-cv",
		textRef: "heh2"
	}, {
		title: "Back to main menu",
		url: "../",
		textRef: "heh2",
		action: () => {
			showSubmenu = false;
		}
	}];

	const animateOutMenu = () => {
		gsap.to(buttonRefs, {
			duration: 0.7,
			opacity: 0,
			y: -100,
			ease: "Back.easeIn",
			stagger: 0.1,
		});
	};

	const animateOutSubMenu = () => {
		gsap.to(subMenuButtonRefs, {
			duration: 0.7,
			opacity: 0,
			y: -100,
			ease: "Back.easeIn",
			stagger: 0.1,
		});
	};

	const animateInMenu = () => {
		setTimeout(() => {
			gsap.from(buttonRefs, {
				duration: 2,
				scale: 0.5,
				opacity: 0,
				ease: "Elastic.easeOut",
				force3D: true,
				stagger: 0.1,
			});
		}, 10);
	};

	const animateInSubMenu = () => {
		setTimeout(() => {
			gsap.from(subMenuButtonRefs, {
				duration: 2,
				scale: 0.5,
				opacity: 0,
				ease: "Elastic.easeOut",
				force3D: true,
				stagger: 0.1,
			});
		}, 10);
	};
</script>

<SEO
	title="Who is RomanistHere"
	description=""
/>

<section class="max-w-4xl mx-auto py-36">
	<header class="mb-10">
		<h1 class="text-4xl font-semibold">Roman Smunyov</h1>
		<h2 class="text-[2.75rem] leading-9 text-bright font-semibold">RomanistHere</h2>
	</header>
	<div class="flex">
		<div class="w-2/5">
			{#if showSubmenu}
				<ul class="space-y-5" use:animateInSubMenu in:fade={{ duration: 50 }}>
					{#each subMenu as { title, url, textRef, action }, i (url)}
						<li>
							<a
								href="/md/{url}"
								class="px-8 py-4 transition-colors rounded-lg block text-center bg-gray focus:bg-bright "
								bind:this={subMenuButtonRefs[i]}
								on:click|preventDefault={() => {
									goto(`/md/${url}`);
									if (!action)
										return;

									animateOutSubMenu();
									setTimeout(() => {
										action();
									}, 1500);
								}}
							>
								{title}
							</a>
						</li>
					{/each}
				</ul>
			{:else}
				<ul class="space-y-5" use:animateInMenu in:fade={{ duration: 50 }}>
					{#each menu as { title, url, textRef, action }, i (url)}
						<li>
							<a
								href="/md/{url}"
								class="px-8 py-4 transition-colors rounded-lg block text-center bg-gray focus:bg-bright "
								bind:this={buttonRefs[i]}
								on:click|preventDefault={() => {
									goto(`/md/${url}`);
									if (!action)
										return;
									
									animateOutMenu();
									setTimeout(() => {
										action();
									}, 1500);
								}}
							>
								{title}
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
		<div class="w-3/5 px-8">
			<slot />
		</div>
	</div>
</section>
