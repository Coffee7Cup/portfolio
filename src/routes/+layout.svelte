<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount, setContext } from 'svelte';
	import { portfolioData } from '$lib/portfolioData.js';
	import { base } from '$app/paths';
	import { gsap } from 'gsap';

	import Loading from '$lib/pages/Loading.svelte';

	let { children } = $props();
	let activeSection = $state('home');

	setContext('portfolio', portfolioData);

	const navItems = [
		{ id: 'home', label: 'Home' },
		{ id: 'about', label: 'About' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'certificates', label: 'Certificates' },
		{ id: 'contact', label: 'Contact' }
	];

	let isLoaded = $state(false);
	let showLoader = $state(true);
	let loadProgress = $state(0);
	let loadStatus = $state('Initializing...');

	function handleNavClick(e, id) {
		e.preventDefault();
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			activeSection = id;
		}
	}

	async function preloadGLB(url) {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`Failed to fetch ${url}`);

		const reader = response.body.getReader();
		const contentLength = +response.headers.get('Content-Length') || 4039008; // Fallback size ~4MB

		let receivedLength = 0;
		let chunks = [];

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			chunks.push(value);
			receivedLength += value.length;

			const glbProgress = Math.min(Math.round((receivedLength / contentLength) * 70), 70);
			loadProgress = glbProgress;
			loadStatus = `Downloading 3D assets... ${Math.round((receivedLength / contentLength) * 100)}%`;
		}
	}

	async function preloadImages(imageUrls) {
		loadStatus = 'Loading images...';
		let loadedCount = 0;
		const totalImages = imageUrls.length;

		if (totalImages === 0) {
			loadProgress = 90;
			return;
		}

		const promises = imageUrls.map((url) => {
			return new Promise((resolve) => {
				const img = new Image();
				img.src = url;
				img.onload = () => {
					loadedCount++;
					loadProgress = 70 + Math.round((loadedCount / totalImages) * 20);
					resolve();
				};
				img.onerror = () => {
					loadedCount++;
					resolve();
				};
			});
		});

		await Promise.all(promises);
	}

	let isDark = $state(false);

	// WARN: im assuming that the browser will cache this files, so when i fetch them again in Projects.svelte they are in cache.
	// TODO: see if imgs are cached or not
	async function startLoading() {
		try {
			// 1. Load GLB
			await preloadGLB(`${base}/prop.glb`);

			// 2. Load images
			let imageUrls = portfolioData.projects.map((p) =>
				p.img.startsWith('http') || p.img.startsWith(base)
					? p.img
					: `${base}/${p.img.replace(/^\//, '')}`
			);

			let certUrls = portfolioData.certificates.map((c) =>
				c.startsWith('http') || c.startsWith(base) ? c : `${base}/${c.replace(/^\//, '')}`
			);

			imageUrls = [...imageUrls, ...certUrls];

			await preloadImages(imageUrls);

			// 3. Wait for fonts
			loadStatus = 'Loading fonts & styles...';
			loadProgress = 95;
			if (typeof document !== 'undefined' && document.fonts) {
				await document.fonts.ready;
			}

			// 4. Complete
			loadProgress = 100;
			loadStatus = 'Ready!';

			// Small delay for smooth transition
			setTimeout(() => {
				isLoaded = true;

				setTimeout(() => {
					gsap.to('.loader-overlay', {
						opacity: 0,
						duration: 0.8,
						ease: 'power2.out',
						onComplete: () => {
							showLoader = false;
						}
					});
				}, 100);
			}, 400);
		} catch (err) {
			console.error(err);
			// Fallback to load website anyway
			isLoaded = true;
			showLoader = false;
		}
	}

	onMount(() => {
		// Toggle dark class on load if preferred
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.classList.add('dark');
			isDark = true;
		}

		startLoading();
	});
	let expanded = $state(false);

	function currentIndex() {
		return navItems.findIndex((i) => i.id === activeSection);
	}

	function scrollToId(id) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
		activeSection = id;
		expanded = false;
	}

	function goPrev() {
		const idx = currentIndex();
		scrollToId(navItems[(idx - 1 + navItems.length) % navItems.length].id);
	}

	function goNext() {
		const idx = currentIndex();
		scrollToId(navItems[(idx + 1) % navItems.length].id);
	}

	function toggleTheme() {
		document.documentElement.classList.toggle('dark');
		isDark = document.documentElement.classList.contains('dark');
	}
	$effect(() => {
		if (!isLoaded) return;

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

<!-- Premium Loader Screen Overlay -->
{#if showLoader}
	<Loading progress={loadProgress} status={loadStatus} />
{/if}

{#if isLoaded}
	<!-- Floating Nav Bar -->
	<header
		class="fixed bottom-4 left-1/2 z-1000 -translate-x-1/2 transition-all duration-300 md:top-5"
	>
		<div
			class="flex items-center justify-center gap-4 rounded-full border border-text-main/10 bg-bg-main/70 px-4 py-4 backdrop-blur-sm transition-all duration-300 md:min-w-[30vw] md:px-6 md:py-5"
		>
			<!-- Prev -->
			<button
				onclick={goPrev}
				aria-label="Previous section"
				class="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-sub transition-colors duration-200 hover:text-accent"
			>
				<svg
					class="h-3.5 w-3.5"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
			</button>

			<!-- Center: current label / expanded list -->
			<div class="relative flex items-center justify-center">
				{#if !expanded}
					<button
						onclick={() => (expanded = true)}
						class="text-md min-w-[64px] cursor-pointer text-center font-stroke-display tracking-wider text-accent uppercase transition-colors duration-300 sm:text-sm"
					>
						{navItems.find((i) => i.id === activeSection)?.label ?? ''}
					</button>
				{:else}
					<nav class="flex items-center gap-3 sm:gap-4 md:gap-5">
						{#each navItems as item (item.id)}
							<a
								href="#{item.id}"
								onclick={(e) => {
									e.preventDefault();
									scrollToId(item.id);
								}}
								class="font-stroke-display text-[9px] tracking-wider uppercase transition-colors duration-300 sm:text-xs {activeSection ===
								item.id
									? 'text-accent'
									: 'text-text-sub hover:text-text-main'}"
							>
								{item.label}
							</a>
						{/each}
					</nav>
				{/if}
			</div>

			<!-- Next -->
			<button
				onclick={goNext}
				aria-label="Next section"
				class="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-sub transition-colors duration-200 hover:text-accent"
			>
				<svg
					class="h-3.5 w-3.5"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
				</svg>
			</button>

			<div class="h-4 w-px bg-text-main/10"></div>

			<!-- Theme toggle -->
			<button
				onclick={toggleTheme}
				aria-label="Toggle Theme"
				class="group flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-sub transition-all duration-300 hover:text-accent"
			>
				{#if isDark}
					<svg
						class="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110"
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
				{:else}
					<svg
						class="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110"
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
				{/if}
			</button>
		</div>
	</header>

	{@render children()}
{/if}
