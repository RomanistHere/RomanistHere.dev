<script>
	import { fade } from "svelte/transition";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

	import gsap from "gsap";

	export let array = [];

	$: buttonRefs = [];

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

	const animateOutMenu = () => {
		gsap.to(buttonRefs, {
			duration: 0.7,
			opacity: 0,
			y: -100,
			ease: "Back.easeIn",
			stagger: 0.1,
		});
	};
</script>

<ul class="space-y-5" use:animateInMenu in:fade={{ duration: 50 }}>
	{#each array as { title, url, textRef, action }, i (url)}
		{@const isActive = url.includes($page.params.slug) && !url.includes(`${$page.params.slug}/`)}
		<li>
			<a
				href="/md/{url}"
				class="px-8 py-4 transition-colors rounded-lg block text-center bg-gray hover:bg-bright hover:drop-shadow-[0_0_6px_rgba(161,113,50,.3)] focus:bg-light focus:text-dark text-lg"
				class:bg-light={isActive}
				class:text-dark={isActive}
				class:pointer-events-none={isActive}
				class:drop-shadow-[0_0_8px_rgba(244,237,224,.3)]={isActive}
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