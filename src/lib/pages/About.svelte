<script>
	import { onMount, getContext } from 'svelte';
	import GrainyText from '$lib/components/GrainyText.svelte';
	import SkillPill from '$lib/components/SkillPill.svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let sectionEl = $state();

	const portfolio = getContext('portfolio');
	const { bio, highlights: skills } = portfolio.about;

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
	class="relative flex min-h-screen w-screen flex-row items-center bg-bg-main"
>
	<div
		class="pointer-events-none z-30 flex h-full w-20 shrink-0 translate-x-10 items-center
		       justify-center px-4"
	>
		<div class="-rotate-90 whitespace-nowrap">
			<GrainyText text="ABOUT" size=" text-[7rem] font-stroke-display" id="about" />
		</div>
	</div>

	<!-- Content -->
	<div class="relative z-20 h-screen w-screen">
		<div class="mt-52 flex-1 flex-col pl-32">
			<div class="w-full max-w-2xl">
				<p class="about-bio font-main text-xl leading-relaxed font-medium text-text-main">
					{bio}
				</p>
				<h3
					class="about-subheading mt-10 mb-6 font-stroke-display text-xl font-extrabold text-accent md:text-2xl lg:text-3xl"
				>
					What I'm Good at.
				</h3>
				<div class="flex flex-wrap gap-3">
					{#each skills as skill}
						<div class="about-pill">
							<SkillPill label={skill} />
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
