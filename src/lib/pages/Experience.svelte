<script>
	import { getContext } from 'svelte';
	import { gsap } from 'gsap';
	import GrainyText from '$lib/components/GrainyText.svelte';
	import { base,resolve } from '$app/paths';

	let portfolioData = getContext('portfolio');
	let { text = $bindable(''), pointTo = $bindable('default') } = $props();

	let experience = portfolioData.experience

	let currentIndex = $state(0);
	let sliderTrack = $state();
	let loadedCerts = $state({});

	function moveSlider(direction) {
		if (direction === 'next') {
			currentIndex = (currentIndex + 1) % experience.length;
		} else {
			currentIndex = (currentIndex - 1 + experience.length) % experience.length;
		}

		gsap.to(sliderTrack, {
			xPercent: -currentIndex * 100,
			duration: 0.8,
			ease: 'power3.out'
		});
	}
</script>

<section
	id="experience"
	class="relative flex h-screen w-full flex-col bg-bg-main md:flex-row"
	onmouseenter={() => {
		text = 'My Certificates & Experience';
		pointTo = 'default';
	}}
	onmouseleave={() => {
		text = '';
		pointTo = 'default';
	}}
>
	<div
		class="pointer-events-none z-30 flex w-full shrink-0 items-center justify-center pt-12 md:absolute md:left-0 md:h-full md:w-24 md:translate-x-10 md:px-4 md:pt-0"
	>
		<div class="whitespace-nowrap md:-rotate-90">
			<GrainyText text="EXPERIENCE" size="text-[2.3rem] md:text-[5rem] font-stroke-display" />
		</div>
	</div>

	<div class=" flex h-full w-full items-center justify-center md:pl-40">
		<div class="relative h-[90vh] w-full max-w-4xl overflow-x-hidden rounded-xl backdrop-blur-sm">
			<!-- GSAP Track -->
			<div bind:this={sliderTrack} class="flex h-full w-full">
				{#each experience as cert, i (i)}
					<div class="relative flex h-full w-full shrink-0 items-center justify-center p-4">
						{#if !loadedCerts[i]}
							<div class="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs z-10 rounded-lg">
								<div class="flex flex-col items-center gap-3">
									<div class="h-8 w-8 animate-spin rounded-full border-3 border-accent/20 border-t-accent"></div>
									<span class="text-[10px] font-semibold tracking-wider text-accent uppercase animate-pulse">Loading...</span>
								</div>
							</div>
						{/if}
						<img
							src={resolve(cert)}
							alt="Certificate {i + 1} of {experience.length} — Yashwanth's professional certification"
							class="h-full w-full rounded-lg object-contain transition-transform duration-300 hover:scale-[1.02]"
							onload={() => loadedCerts[i] = true}
							loading="lazy"
						/>
					</div>
				{/each}
			</div>

			<!-- Navigation Controls -->
			<div class="absolute right-6 bottom-8 z-20 flex gap-3">
				<button
					onclick={() => moveSlider('prev')}
					class="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95"
					aria-label="Previous certificate"
				>
					<svg
						class="h-4.5 w-4.5"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
					</svg>
				</button>
				<button
					onclick={() => moveSlider('next')}
					class="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95"
					aria-label="Next certificate"
				>
					<svg
						class="h-4.5 w-4.5"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>

			<!-- Pagination Indicator -->
			<div class="text-main absolute bottom-9 left-6 z-20 text-sm font-medium tracking-widest">
				{currentIndex + 1} <span class="text-main">/</span>
				{experience.length}
			</div>
		</div>
	</div>
</section>
