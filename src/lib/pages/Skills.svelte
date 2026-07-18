<script>
	import GrainyText from '$lib/components/GrainyText.svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { browser } from '$app/environment';
	import {
		Rust,
		CPlusplus,
		Kotlin,
		Go,
		Javascript,
		Python,
		Lua,
		Bash,
		_React,
		SvelteIcon,
		Neovim,
		Git,
		LinuxTux,
		Fedora,
		Android
	} from '@dev.icons/svelte/mono';
	import { onMount } from 'svelte';
	gsap.registerPlugin(ScrollTrigger);

	let sectionEl = $state(null);

	onMount(() => {
		gsap.from(sectionEl, {
			y: 70,
			opacity: 0,
			duration: 0.8,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: sectionEl,
				start: 'top 70%',
				toggleActions: 'play none none reverse'
			}
		});
	});

	let skill_data = [
		{
			name: 'Languages',
			items: [
				{
					icon: Rust,
					name: 'Rust',
					why_this:
						'Systems programming, concurrency safety, and building performant TUI applications.'
				},
				{
					icon: CPlusplus,
					name: 'C++',
					why_this:
						'Low-level control, algorithms, raw sockets, and advanced network implementations.'
				},
				{
					icon: Kotlin,
					name: 'Kotlin',
					why_this: 'Modern Android ecosystem development and building scalable mobile plugins.'
				},
				{
					icon: Go,
					name: 'Go',
					why_this:
						'Fast compilation, clean syntax, and building high-performance networking tools.'
				},
				{
					icon: Javascript,
					name: 'JavaScript',
					why_this: 'Dynamic frontend scripting and asynchronous interaction handling.'
				},
				{
					icon: Python,
					name: 'Python',
					why_this: 'Rapid prototyping, automation scripting, and local AI/ML engine processing.'
				},
				{
					icon: Lua,
					name: 'Lua',
					why_this: 'Lightweight configuration design and deeply customizing Neovim workflows.'
				},
				{
					icon: SvelteIcon,
					name: 'Svelte',
					why_this: 'Declaring reactive, lightweight user interfaces without virtual DOM overhead.'
				},
				{
					icon: Bash,
					name: 'Bash',
					why_this: 'Automation, environment customization, and deep pipeline terminal scripting.'
				}
			]
		},
		{
			name: 'Frameworks',
			items: [
				{
					icon: SvelteIcon,
					name: 'SvelteKit',
					why_this:
						'Routing, state management, and handling animations cleanly on full-stack web platforms.'
				},
				{
					icon: _React,
					name: 'React',
					why_this: 'Building dynamic, modular web views and reusable UI component architectures.'
				},
				{
					icon: Android,
					name: 'Android',
					why_this: 'Modern native Android UI architecture utilizing declarative state components.'
				},
				{
					icon: Rust,
					name: 'Iced.rs',
					why_this:
						'Crafting lightweight, cross-platform native desktop GUI architectures in pure Rust.'
				}
			]
		},
		{
			name: 'Tools & Ecosystem',
			items: [
				{
					icon: Neovim,
					name: 'Neovim',
					why_this:
						'Blazing fast, keyboard-driven development workflows and fully personalized IDE optimization.'
				},
				{
					icon: Git,
					name: 'Git',
					why_this:
						'Distributed version control, team collaboration tracking, and codebase management.'
				},
				{
					icon: LinuxTux,
					name: 'Linux',
					why_this:
						'Primary operating system environment, custom kernel logic, and systems control.'
				},
				{
					icon: Fedora,
					name: 'Fedora',
					why_this: 'Cutting-edge packages, stability, and minimalist ricing configurations.'
				},
				{
					icon: LinuxTux,
					name: 'Wayland',
					why_this:
						'Modern display protocol layer powering fluid workspace rendering and window rules.'
				}
			]
		}
	];
</script>

<section
	bind:this={sectionEl}
	id="skills"
	class="relative z-30 flex min-h-screen w-full flex-col items-center overflow-hidden bg-transparent md:flex-row"
>
	<!-- Rotated SKILLS title -->
	<div
		class="pointer-events-none z-30 flex w-full shrink-0 items-center justify-center pt-24 md:absolute md:left-0 md:h-full md:w-20 md:translate-x-10 md:px-4 md:pt-0"
	>
		<div class="whitespace-nowrap md:-rotate-90">
			<GrainyText text="SKILLS" size="text-[3rem] md:text-[7rem] font-stroke-display" id="skills" />
		</div>
	</div>

	<!-- Content -->
	<div
		class="bg-re z-100 flex min-h-screen w-full flex-1 flex-col items-center justify-start px-6 pt-10 pb-20 md:absolute md:right-0 md:h-screen md:w-screen md:justify-center md:px-0 md:py-10 md:pt-16"
	>
		<div
			class="grid h-full w-full grid-cols-1 gap-10 pr-6 md:grid-cols-3 md:gap-5 md:pr-20 md:pl-32 lg:pl-40"
		>
			{#each skill_data as skill (skill.name)}
				<div class="flex h-full w-full flex-col items-center justify-start text-3xl">
					<div class="p-4 font-stroke-display text-2xl text-accent md:p-6 md:text-3xl">
						{skill.name}
					</div>
					<div class="grid w-full grid-cols-2 gap-5">
						{#each skill.items as item (item.name)}
							<div
								class="group flex flex-col items-center justify-center text-text-main transition-all duration-300"
							>
								{#if browser}
									<!-- svelte-ignore svelte_component_deprecated -->
									<svelte:component
										this={item.icon}
										size={70}
										class="transition-all duration-300 group-hover:scale-105 group-hover:text-accent"
									/>
									<span class="text-sm">{item.name}</span>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
