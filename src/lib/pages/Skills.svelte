<script>
	import { onMount } from 'svelte';
	import GrainyText from '$lib/components/GrainyText.svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let sectionEl = $state();

	const skillCategories = [
		{
			name: 'Languages',
			items: [
				{ name: 'Rust', level: 90 },
				{ name: 'C / C++', level: 85 },
				{ name: 'Go', level: 80 },
				{ name: 'Python', level: 75 },
				{ name: 'JavaScript / TypeScript', level: 85 },
				{ name: 'Kotlin', level: 70 }
			]
		},
		{
			name: 'Frameworks & Tools',
			items: [
				{ name: 'Svelte / SvelteKit', level: 85 },
				{ name: 'React / Next.js', level: 75 },
				{ name: 'Three.js / WebGL', level: 70 },
				{ name: 'Android SDK', level: 75 },
				{ name: 'Docker', level: 80 },
				{ name: 'Git', level: 90 }
			]
		},
		{
			name: 'Platforms & Systems',
			items: [
				{ name: 'Linux (Wayland / X11)', level: 90 },
				{ name: 'Layer Shell Protocol', level: 85 },
				{ name: 'Networking / TCP/UDP', level: 80 },
				{ name: 'System Design', level: 75 },
				{ name: 'CI / CD Pipelines', level: 70 },
				{ name: 'Cloud (AWS / GCP)', level: 65 }
			]
		}
	];

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.from('.skill-category', {
				y: 50,
				opacity: 0,
				duration: 0.7,
				stagger: 0.15,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top 60%',
					toggleActions: 'play none none reverse'
				}
			});

			gsap.from('.skill-bar-fill', {
				width: 0,
				duration: 1,
				stagger: 0.05,
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
	id="skills"
	class="relative flex min-h-screen w-full items-center overflow-hidden bg-bg-main"
>
	<!-- Rotated SKILLS title -->
	<div
		class="skills-title-col pointer-events-none absolute left-0 z-10 flex h-full items-center md:relative md:w-48 lg:w-56"
	>
		<div class="skills-rotate-title whitespace-nowrap">
			<GrainyText text="SKILLS" size="8xl md:text-9xl lg:text-[11rem]" id="skills" />
		</div>
	</div>

	<!-- Content -->
	<div class="relative z-20 flex flex-1 flex-col justify-center px-8 py-24 md:px-16 lg:px-24">
		<div class="grid max-w-4xl gap-10 md:grid-cols-2 lg:grid-cols-3">
			{#each skillCategories as category}
				<div class="skill-category">
					<h3
						class="mb-6 font-stroke-display text-lg font-extrabold tracking-wider text-accent md:text-xl"
					>
						{category.name}
					</h3>
					<div class="flex flex-col gap-4">
						{#each category.items as skill}
							<div class="skill-item">
								<div class="mb-1.5 flex items-center justify-between">
									<span class="font-main text-sm font-medium text-text-main">{skill.name}</span>
									<span class="font-main text-xs text-text-sub">{skill.level}%</span>
								</div>
								<div class="h-1.5 w-full overflow-hidden rounded-full bg-text-main/10">
									<div
										class="skill-bar-fill h-full rounded-full"
										style="width: {skill.level}%; background: linear-gradient(90deg, var(--accent) 0%, rgba(255,0,0,0.4) 100%);"
									></div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.skills-rotate-title {
		transform: rotate(-90deg);
	}

	@media (max-width: 767px) {
		.skills-rotate-title {
			opacity: 0.12;
			position: absolute;
			left: -3rem;
			top: 50%;
			transform: rotate(-90deg) translateX(-50%);
			transform-origin: center center;
		}
	}
</style>
