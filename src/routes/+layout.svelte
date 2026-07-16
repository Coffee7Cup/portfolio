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

	async function startLoading() {
		try {
			// 1. Load GLB
			await preloadGLB(`${base}/prop.glb`);

			// 2. Load images
			const imageUrls = portfolioData.projects.map((p) =>
				p.img.startsWith('http') || p.img.startsWith(base)
					? p.img
					: `${base}/${p.img.replace(/^\//, '')}`
			);
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
		class="fixed top-4 left-1/2 z-1000 flex w-[95%] max-w-max -translate-x-1/2 items-center justify-between gap-1 rounded-full border border-text-main/10 bg-bg-main/70 px-2 py-2 backdrop-blur-md transition-all duration-300 md:top-5 md:w-auto md:justify-center md:gap-8 md:px-8 md:py-3"
	>
		<nav class="flex items-center gap-3 sm:gap-0.5 md:gap-6">
			{#each navItems as item (item)}
				<a
					href="#{item.id}"
					onclick={(e) => handleNavClick(e, item.id)}
					class="font-stroke-display text-[9px] tracking-wider uppercase transition-colors duration-300 sm:text-xs md:text-sm {activeSection ===
					item.id
						? 'text-accent'
						: 'text-text-sub hover:text-text-main'}"
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<!-- Theme Toggle Button -->
		<button
			onclick={() => {
				document.documentElement.classList.toggle('dark');
				isDark = document.documentElement.classList.contains('dark');
				console.log(isDark);
			}}
			class="group flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-text-main/10 bg-transparent text-text-sub transition-all duration-300 hover:border-accent hover:text-accent"
			aria-label="Toggle Theme"
		>
			{#if isDark}
				<svg
					class="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
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
					class="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
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
			<!-- Sun icon (visible in dark mode) -->
			<!-- Moon icon (visible in light mode) -->
		</button>
	</header>

	{@render children()}
{/if}
