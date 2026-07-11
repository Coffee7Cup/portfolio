<script>
	import { onMount } from 'svelte';
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
	} from '@dev.icons/svelte';
	gsap.registerPlugin(ScrollTrigger);

	let sectionEl = $state();
	let skill_data = [
		{
			name: 'Languages',
			items: [
				{
					icon: Rust,
					why_this:
						'Systems programming, concurrency safety, and building performant TUI applications.'
				},
				{
					icon: CPlusplus,
					why_this:
						'Low-level control, algorithms, raw sockets, and advanced network implementations.'
				},
				{
					icon: Kotlin,
					why_this: 'Modern Android ecosystem development and building scalable mobile plugins.'
				},
				{
					icon: Go,
					why_this:
						'Fast compilation, clean syntax, and building high-performance networking tools.'
				},
				{
					icon: Javascript,
					why_this: 'Dynamic frontend scripting and asynchronous interaction handling.'
				},
				{
					icon: Python,
					why_this: 'Rapid prototyping, automation scripting, and local AI/ML engine processing.'
				},
				{
					icon: Lua,
					why_this: 'Lightweight configuration design and deeply customizing Neovim workflows.'
				},
				{
					icon: SvelteIcon,
					why_this: 'Declaring reactive, lightweight user interfaces without virtual DOM overhead.'
				},
				{
					icon: Bash,
					why_this: 'Automation, environment customization, and deep pipeline terminal scripting.'
				}
			]
		},
		{
			name: 'Frameworks',
			items: [
				{
					icon: SvelteIcon,
					why_this:
						'Routing, state management, and handling animations cleanly on full-stack web platforms.'
				},
				{
					icon: _React,
					why_this: 'Building dynamic, modular web views and reusable UI component architectures.'
				},
				{
					icon: Android,
					why_this: 'Modern native Android UI architecture utilizing declarative state components.'
				},
				{
					icon: Rust,
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
					why_this:
						'Blazing fast, keyboard-driven development workflows and fully personalized IDE optimization.'
				},
				{
					icon: Git,
					why_this:
						'Distributed version control, team collaboration tracking, and codebase management.'
				},
				{
					icon: LinuxTux,
					why_this:
						'Primary operating system environment, custom kernel logic, and systems control.'
				},
				{
					icon: Fedora,
					why_this: 'Cutting-edge packages, stability, and minimalist ricing configurations.'
				},
				{
					icon: LinuxTux,
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
	class="relative flex min-h-screen w-full items-center overflow-hidden bg-bg-main"
>
	<!-- Rotated SKILLS title -->
	<div
		class="pointer-events-none z-30 flex h-full w-20 shrink-0 translate-x-10 items-center
		       justify-center px-4"
	>
		<div class="-rotate-90 whitespace-nowrap">
			<GrainyText text="SKILLS" size="8xl text-[7rem] font-stroke-display" id="skills" />
		</div>
	</div>

	<!-- Content -->
	<div class="z-100 flex h-screen w-screen items-center justify-center px-20 py-10 pt-16">
		<div class="grid h-full w-full grid-cols-3 gap-5 backdrop-blur-md">
			{#each skill_data as skill}
				<div class="flex h-full w-full flex-col items-center justify-start text-3xl">
					<div class="p-6 font-stroke-display text-accent">{skill.name}</div>
					<div class="grid w-full grid-cols-2 gap-5">
						{#each skill.items as item}
							<div class="flex w-full items-center justify-center text-accent">
								{#if browser}
									<svelte:component this={item.icon} size={70} />
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
