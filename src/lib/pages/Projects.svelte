<script>
	import { onMount, getContext } from 'svelte';
	import GrainyText from '$lib/components/GrainyText.svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { base } from '$app/paths';

	gsap.registerPlugin(ScrollTrigger);

	const portfolio = getContext('portfolio');
	const projects = portfolio.projects.map((p) => ({
		...p,
		img:
			p.img.startsWith('http') || p.img.startsWith(base)
				? p.img
				: `${base}/${p.img.replace(/^\//, '')}`
	}));

	// Configuration for pure row animation
	const ROWS = 8;
	const COLS = 1;
	const cells = Array.from({ length: ROWS * COLS });

	let sectionEl = $state(null);
	let titleEl = $state(null);
	let descEl = $state(null);
	let imgEl = $state(null);
	let panelEls = $state([]);
	let currentIndex = $state(0);

	onMount(() => {
		// scaleY controls the height of each row block
		gsap.set(panelEls, { scaleY: 1 });
		gsap.set(imgEl, { scale: 1.08, opacity: 0 });

		// Intro Reveal (Top to Bottom)
		const introTl = gsap.timeline({ delay: 0.2 });
		introTl
			.to(imgEl, { opacity: 1, duration: 0.4 })
			.to(
				panelEls,
				{
					scaleY: 0,
					duration: 0.7,
					ease: 'power4.inOut',
					stagger: 0.05 // Staggers row by row sequentially
				},
				'<'
			)
			.to(imgEl, { scale: 1, duration: 1.1, ease: 'power3.out' }, '<')
			.fromTo(
				[titleEl, descEl],
				{ opacity: 0, y: 16 },
				{ opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
				'-=0.4'
			);

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionEl,
				start: 'top top',
				end: () => `+=${(projects.length - 1) * window.innerHeight}`,
				scrub: 1,
				pin: true,
				anticipatePin: 1
			}
		});

		projects.forEach((_, i) => {
			if (i === projects.length - 1) return;

			tl.to([titleEl, descEl], { opacity: 0, y: -12, duration: 0.2 })
				.to(imgEl, { scale: 1.08, opacity: 0.3, duration: 0.4 }, '<')
				// Cover Image (Bottom to Top)
				.to(
					panelEls,
					{
						scaleY: 1,
						transformOrigin: 'bottom',
						duration: 0.5,
						ease: 'power3.inOut',
						stagger: { each: 0.04, from: 'end' }
					},
					'<'
				)
				.set(imgEl, { attr: { src: projects[i + 1].img } })
				.call(() => (currentIndex = i + 1))
				.set(panelEls, { transformOrigin: 'top' })
				// Reveal Image (Top to Bottom)
				.to(imgEl, { opacity: 1, duration: 0.3 })
				.to(
					panelEls,
					{
						scaleY: 0,
						duration: 0.6,
						ease: 'power4.inOut',
						stagger: { each: 0.04, from: 'start' }
					},
					'<'
				)
				.to(imgEl, { scale: 1, duration: 0.8, ease: 'power3.out' }, '<')
				.to([titleEl, descEl], { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, '-=0.35');
		});

		return () => {
			tl.scrollTrigger?.kill();
			tl.kill();
		};
	});
</script>

<section
	bind:this={sectionEl}
	id="projects"
	class="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-bg-main md:flex-row"
>
	<!-- Rotated PROJECTS title -->
	<div
		class="pointer-events-none z-30 flex w-full shrink-0 items-center justify-center pt-24 md:absolute md:left-0 md:h-full md:w-20 md:translate-x-10 md:px-4 md:pt-0"
	>
		<div class="whitespace-nowrap md:-rotate-90">
			<GrainyText
				text="PROJECTS"
				size="text-[3.5rem] md:text-[7rem] font-stroke-display"
				id="project"
			/>
		</div>
	</div>

	<!-- Content -->
	<div
		class="z-10 flex min-h-screen w-full flex-1 flex-col items-center justify-start p-2 pt-10 pb-20 md:absolute md:right-0 md:h-screen md:w-screen md:justify-center md:px-0 md:py-0"
	>
		<div
			class="flex w-full flex-col items-center gap-0 md:flex-row md:items-stretch md:pr-10 md:pl-32 lg:pr-5 lg:pl-30"
		>
			<!-- image frame -->
			<div class="relative aspect-video w-full overflow-hidden rounded-md bg-neutral-950 md:w-4/5">
				<img
					bind:this={imgEl}
					src={projects[0].img}
					alt={projects[0].title}
					class="absolute inset-0 h-full w-full object-contain"
				/>

				<!-- reveal panels -->
				<div
					class="pointer-events-none absolute inset-0 grid"
					style="grid-template-rows: repeat({ROWS}, 1fr); grid-template-columns: 1fr;"
				>
					{#each cells as _, i (i)}
						<div bind:this={panelEls[i]} class="w-full origin-bottom bg-bg-main"></div>
					{/each}
				</div>
			</div>

			<!-- description -->
			<div
				class="z-20 flex w-full flex-col justify-center rounded-md bg-bg-main/40 p-6 pt-20 backdrop-blur-sm md:w-1/3 md:p-10"
			>
				<h3 bind:this={titleEl} class="mb-2 text-xl font-bold md:text-2xl">
					{projects[currentIndex].title}
				</h3>
				<p bind:this={descEl} class="text-sm leading-relaxed opacity-80 md:text-base">
					{projects[currentIndex].desc}
				</p>
				{#if projects[currentIndex].tags}
					<div class="mt-6 flex flex-wrap gap-2">
						{#each projects[currentIndex].tags as tag (tag)}
							<span
								class="dark:text-accent-light rounded-md bg-accent/20 px-2.5 py-1 font-main text-xs font-semibold text-accent dark:bg-accent/30"
							>
								{tag}
							</span>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
