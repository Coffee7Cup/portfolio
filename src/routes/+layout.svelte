<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

	let { children } = $props();
	let activeSection = $state('home');

	const navItems = [
		{ id: 'home', label: 'Home' },
		{ id: 'about', label: 'About' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'contact', label: 'Contact' }
	];

	function handleNavClick(e, id) {
		e.preventDefault();
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			activeSection = id;
		}
	}

	onMount(() => {
		// Toggle dark class on load if preferred
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.classList.add('dark');
		}

		const observerOptions = {
			root: null,
			rootMargin: '-50% 0px -50% 0px',
			threshold: 0
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					activeSection = entry.target.id;
				}
			});
		}, observerOptions);

		navItems.forEach((item) => {
			const el = document.getElementById(item.id);
			if (el) observer.observe(el);
		});

		return () => {
			observer.disconnect();
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Yashwanth | Portfolio</title>
</svelte:head>

<!-- Floating Nav Bar -->
<header
	class="fixed top-5 left-1/2 z-100 flex -translate-x-1/2 items-center gap-6 rounded-full border border-text-main/10 bg-bg-main/70 px-6 py-3 backdrop-blur-md transition-all duration-300 md:gap-8 md:px-8"
>
	<nav class="flex items-center gap-4 md:gap-6">
		{#each navItems as item}
			<a
				href="#{item.id}"
				onclick={(e) => handleNavClick(e, item.id)}
				class="font-stroke-clean text-xs font-bold uppercase tracking-wider transition-colors duration-300 md:text-sm {activeSection === item.id ? 'text-accent' : 'text-text-sub hover:text-text-main'}"
			>
				{item.label}
			</a>
		{/each}
	</nav>

	<div class="h-4 w-[1px] bg-text-main/15"></div>

	<!-- Theme Toggle Button -->
	<button
		onclick={() => document.documentElement.classList.toggle('dark')}
		class="group flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-text-main/10 bg-transparent text-text-sub transition-all duration-300 hover:border-accent hover:text-accent"
		aria-label="Toggle Theme"
	>
		<!-- Sun icon (visible in dark mode) -->
		<svg
			class="hidden h-4 w-4 group-hover:scale-110 transition-transform duration-300 dark:block"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
			/>
		</svg>
		<!-- Moon icon (visible in light mode) -->
		<svg
			class="block h-4 w-4 group-hover:scale-110 transition-transform duration-300 dark:hidden"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
			/>
		</svg>
	</button>
</header>

{@render children()}
