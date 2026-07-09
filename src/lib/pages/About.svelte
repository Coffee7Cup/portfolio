<script>
	import { onMount } from 'svelte';
	import GrainyText from '$lib/components/GrainyText.svelte';
	import SkillPill from '$lib/components/SkillPill.svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let sectionEl = $state();

	const skills = [
		'Low level systems',
		'Backend systems',
		'Linux native (layershell applications)',
		'Android dev',
		'Web dev'
	];

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.from('.about-bio', {
				y: 60,
				opacity: 0,
				duration: 0.8,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top 70%',
					toggleActions: 'play none none reverse'
				}
			});

			gsap.from('.about-subheading', {
				y: 40,
				opacity: 0,
				duration: 0.6,
				delay: 0.2,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top 60%',
					toggleActions: 'play none none reverse'
				}
			});

			gsap.from('.about-pill', {
				y: 30,
				opacity: 0,
				duration: 0.5,
				stagger: 0.08,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top 50%',
					toggleActions: 'play none none reverse'
				}
			});
		}, sectionEl);

		return () => ctx.revert();
	});
</script>

<section
	bind:this={sectionEl}
	id="about"
	class="relative flex min-h-screen w-full items-center overflow-hidden bg-bg-main"
>
	<!-- Rotated ABOUT title -->
	<div
		class="about-title-col pointer-events-none absolute left-0 z-10 flex h-full items-center md:relative md:w-48 lg:w-56"
	>
		<div class="about-rotate-title whitespace-nowrap">
			<GrainyText text="ABOUT" size="8xl md:text-9xl lg:text-[11rem]" id="about" />
		</div>
	</div>

	<!-- Content -->
	<div class="relative z-20 flex flex-1 flex-col justify-center px-8 py-24 md:px-16 lg:px-24">
		<p class="about-bio max-w-2xl font-main text-base font-medium leading-relaxed text-text-main md:text-lg lg:text-xl">
			I am a developer focused on building clean, efficient, and user-centric digital experiences.
			I specialize in systems programming, custom networking architectures, and crafting responsive
			frontend interfaces.
		</p>

		<h3
			class="about-subheading mt-10 mb-6 font-stroke-display text-xl font-extrabold text-accent md:text-2xl lg:text-3xl"
		>
			What I'm Good at.
		</h3>

		<div class="flex max-w-2xl flex-wrap gap-3">
			{#each skills as skill}
				<div class="about-pill">
					<SkillPill label={skill} />
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.about-rotate-title {
		transform: rotate(-90deg);
	}

	@media (max-width: 767px) {
		.about-rotate-title {
			opacity: 0.12;
			position: absolute;
			left: -3rem;
			top: 50%;
			transform: rotate(-90deg) translateX(-50%);
			transform-origin: center center;
		}
	}
</style>
