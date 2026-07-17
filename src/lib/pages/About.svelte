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
	class="relative flex min-h-screen w-full flex-col items-center bg-bg-main md:flex-row"
>
	<div
		class="pointer-events-none z-30 flex w-full shrink-0 items-center justify-center pt-24 md:absolute md:left-0 md:h-full md:w-20 md:translate-x-10 md:px-4 md:pt-0"
	>
		<div class="whitespace-nowrap md:-rotate-90">
			<GrainyText text="ABOUT" size="text-[3rem] md:text-[7rem] font-stroke-display" id="about" />
		</div>
	</div>

	<!-- Content -->
	<div
		class="z-20 flex w-full flex-1 flex-col justify-center px-6 pb-20 md:absolute md:right-0 md:h-screen md:w-screen md:px-0"
	>
		<div class="flex-1 flex-col md:mt-52 md:pl-32 lg:pl-40">
			<div class="w-full max-w-2xl">
				<p
					class="about-bio font-main text-base leading-relaxed font-medium text-text-main md:text-xl"
				>
					{bio}
				</p>
				<h3
					class="about-subheading mt-8 mb-6 font-stroke-display text-xl font-extrabold text-accent md:mt-10 md:text-2xl lg:text-3xl"
				>
					What I'm Good at.
				</h3>
				<div class="flex flex-wrap gap-2 md:gap-3">
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
