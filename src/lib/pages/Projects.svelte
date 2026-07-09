<script>
	import { onMount } from 'svelte';
	import GrainyText from '$lib/components/GrainyText.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let sectionEl = $state();

	const projects = [
		{
			title: 'LayerShell Panel & Launcher',
			description: 'A custom, lightweight Wayland panel and application launcher written in Rust utilizing the wlr-layer-shell protocol. Features dynamic workspaces, system tray integration, and low memory overhead.',
			tags: ['Rust', 'Wayland', 'GTK', 'System Programming'],
			github: 'https://github.com',
			live: ''
		},
		{
			title: 'AftNet: Custom TCP/UDP Router',
			description: 'A low-level user-space custom TCP/UDP routing engine optimized for low-latency network traffic. Features congestion control, packet shaping, and visual performance monitoring interface.',
			tags: ['C++', 'Linux Socket API', 'Networking', 'Systems'],
			github: 'https://github.com',
			live: ''
		},
		{
			title: 'KubeGlow Visual Dashboard',
			description: 'A web-based interactive 3D visualization dashboard for local Kubernetes clusters. Uses Three.js to render cluster pods, services, and traffic flows in real-time.',
			tags: ['SvelteKit', 'Three.js', 'Go', 'Kubernetes API'],
			github: 'https://github.com',
			live: 'https://example.com'
		},
		{
			title: 'Android Native Music Controller',
			description: 'A native Android system controller that lets users manage system-wide audio endpoints and streaming routes through advanced audio routing APIs.',
			tags: ['Kotlin', 'Android SDK', 'NDK', 'Audio Routing'],
			github: 'https://github.com',
			live: ''
		}
	];

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.from('.project-item', {
				y: 60,
				opacity: 0,
				duration: 0.8,
				stagger: 0.15,
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
	id="projects"
	class="relative flex min-h-screen w-full items-center overflow-hidden bg-bg-main"
>
	<!-- Rotated PROJECTS title -->
	<div
		class="projects-title-col pointer-events-none absolute left-0 z-10 flex h-full items-center md:relative md:w-48 lg:w-56"
	>
		<div class="projects-rotate-title whitespace-nowrap">
			<GrainyText text="PROJECTS" size="8xl md:text-9xl lg:text-[11rem]" id="projects" />
		</div>
	</div>

	<!-- Content -->
	<div class="relative z-20 flex flex-1 flex-col justify-center px-8 py-24 md:px-16 lg:px-24">
		<div class="grid max-w-5xl gap-6 md:grid-cols-2">
			{#each projects as project}
				<div class="project-item">
					<ProjectCard
						title={project.title}
						description={project.description}
						tags={project.tags}
						github={project.github}
						live={project.live}
					/>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.projects-rotate-title {
		transform: rotate(-90deg);
	}

	@media (max-width: 767px) {
		.projects-rotate-title {
			opacity: 0.12;
			position: absolute;
			left: -4rem;
			top: 50%;
			transform: rotate(-90deg) translateX(-50%);
			transform-origin: center center;
		}
	}
</style>
