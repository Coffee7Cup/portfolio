<script>
	import { onMount, getContext } from 'svelte';
	import GrainyText from '$lib/components/GrainyText.svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { base, resolve } from '$app/paths';

	gsap.registerPlugin(ScrollTrigger);

	let { text = $bindable(''), pointTo = $bindable('default') } = $props();

	const portfolio = getContext('portfolio');
	const projects = portfolio.projects;

	const MAX_PIXEL = 38; // block size at peak pixelation

	let sectionEl = $state(null);
	let titleEl = $state(null);
	let descEl = $state(null);
	let canvasEl = $state(null);
	let currentIndex = $state({ ind: 0 });

	let ctx, offCanvas, offCtx;
	let loadedImgs = {};
	let loadingStates = $state({});
	let lastDrawnIndex = 0;
	const proxy = { pixel: 1 };

	function loadImage(src) {
		return new Promise((res) => {
			const img = new Image();
			img.onload = () => res(img);
			img.src = resolve(src);
		});
	}

	function fitCanvas() {
		const rect = canvasEl.getBoundingClientRect();
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		canvasEl.width = rect.width * dpr;
		canvasEl.height = rect.height * dpr;
		offCanvas.width = canvasEl.width;
		offCanvas.height = canvasEl.height;
	}

	// draws the given image "cover"-fit into a w x h canvas, pixelated by pixelSize
	function draw(img, pixelSize) {
		if (!img) return;
		const w = canvasEl.width;
		const h = canvasEl.height;
		const size = Math.max(1, pixelSize);
		const scaledW = Math.max(1, Math.round(w / size));
		const scaledH = Math.max(1, Math.round(h / size));

		// cover-fit math so the source image fills the frame without distortion
		const imgRatio = img.naturalWidth / img.naturalHeight;
		const frameRatio = w / h;
		let sx, sy, sw, sh;
		if (imgRatio > frameRatio) {
			sh = img.naturalHeight;
			sw = sh * frameRatio;
			sx = (img.naturalWidth - sw) / 2;
			sy = 0;
		} else {
			sw = img.naturalWidth;
			sh = sw / frameRatio;
			sx = 0;
			sy = (img.naturalHeight - sh) / 2;
		}

		offCtx.clearRect(0, 0, w, h);
		offCtx.imageSmoothingEnabled = size > 2 ? false : true;
		offCtx.drawImage(img, sx, sy, sw, sh, 0, 0, scaledW, scaledH);

		ctx.imageSmoothingEnabled = false;
		ctx.clearRect(0, 0, w, h);
		ctx.drawImage(offCanvas, 0, 0, scaledW, scaledH, 0, 0, w, h);
	}

	function drawIndex(index, pixelSize) {
		lastDrawnIndex = index;
		const img = loadedImgs[index];
		if (img) {
			draw(img, pixelSize);
		} else {
			if (ctx) {
				ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
			}
			if (!loadingStates[index] && !loadedImgs[index]) {
				loadingStates[index] = true;
				loadImage(projects[index].img).then((loadedImg) => {
					loadedImgs[index] = loadedImg;
					loadingStates[index] = false;
					if (lastDrawnIndex === index) {
						draw(loadedImg, proxy.pixel);
					}
				});
			}
		}
	}

	onMount(() => {
		let cancelled = false;

		ctx = canvasEl.getContext('2d');
		offCanvas = document.createElement('canvas');
		offCtx = offCanvas.getContext('2d');
		fitCanvas();
		drawIndex(0, 1);

		const resizeHandler = () => {
			fitCanvas();
			const img = loadedImgs[lastDrawnIndex];
			if (img) draw(img, proxy.pixel);
		};
		window.addEventListener('resize', resizeHandler);

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionEl,
				start: 'top top',
				end: () => `+=${(projects.length - 1) * window.innerHeight}`,
				scrub: 1,
				pin: true,
				anticipatePin: 1,
				onUpdate: (self) => {
					// text index is derived straight from scroll progress —
					// works identically scrolling up or down, no swap-flag needed
					const i = Math.round(self.progress * (projects.length - 1));
					if (i !== currentIndex.ind) currentIndex.ind = i;
				}
			}
		});

		projects.forEach((_, i) => {
			if (i === projects.length - 1) return;

			tl
				// pixelate up — ALWAYS drawing the current image, never a mutable "active" ref
				.to(proxy, {
					pixel: MAX_PIXEL,
					duration: 0.3,
					ease: 'power1.in',
					onUpdate: () => {
						if (cancelled) return;
						drawIndex(i, proxy.pixel);
					}
				})
				// pixelate back down — ALWAYS the next image
				// GSAP reverses this tween cleanly when scrubbing back up, so no
				// separate "swap back" logic is needed
				.to(proxy, {
					pixel: 1,
					duration: 0.3,
					ease: 'power2.out',
					onUpdate: () => {
						if (cancelled) return;
						drawIndex(i + 1, proxy.pixel);
					}
				});
		});

		return () => {
			cancelled = true;
			window.removeEventListener('resize', resizeHandler);
			ScrollTrigger.getAll().forEach((st) => {
				if (st.vars.trigger === sectionEl) {
					st.kill();
				}
			});
		};
	});
</script>

<section
	bind:this={sectionEl}
	id="projects"
	class="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-bg-main md:flex-row"
	onmouseenter={() => {
		text = 'projects';
		pointTo = 'selector:#project-readmore-btn';
	}}
	onmouseleave={() => {
		text = '';
		pointTo = 'default';
	}}
>
	<div
		class="pointer-events-none z-30 flex w-full shrink-0 items-center justify-center pt-1 md:absolute md:left-0 md:h-full md:w-20 md:translate-x-10 md:px-4 md:pt-0"
	>
		<div class="whitespace-nowrap md:-rotate-90">
			<GrainyText
				text="PROJECTS"
				size="text-[3rem] md:text-[7rem] font-stroke-display"
				id="project"
			/>
		</div>
	</div>

	<div
		class="z-10 flex min-h-screen w-full flex-1 flex-col items-center justify-start p-2 pt-1 pb-20 md:absolute md:right-0 md:h-screen md:w-screen md:justify-center md:px-0 md:py-0"
	>
		<div
			class="flex h-auto w-full flex-col items-center gap-4 md:h-[65vh] md:flex-row md:items-stretch md:gap-0 md:pr-10 md:pl-32 lg:pr-5 lg:pl-40"
		>
			<div
				class="relative aspect-video w-full shrink-0 overflow-hidden rounded-md bg-neutral-950 md:w-4/6"
			>
				<canvas bind:this={canvasEl} class="absolute inset-0 h-full w-full"></canvas>
				{#if loadingStates[currentIndex.ind]}
					<div class="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity duration-300">
						<div class="flex flex-col items-center gap-3">
							<div class="h-10 w-10 animate-spin rounded-full border-4 border-accent/20 border-t-accent"></div>
							<span class="text-xs font-semibold tracking-wider text-accent uppercase animate-pulse">Loading Project...</span>
						</div>
					</div>
				{/if}
			</div>

			<div
				class="z-20 flex w-full flex-col items-start justify-center rounded-md bg-bg-main/40 p-5 backdrop-blur-sm md:w-1/3 md:p-10 md:pt-20"
			>
				<h3 bind:this={titleEl} class="mb-2 text-lg font-bold md:text-2xl">
					{projects[currentIndex.ind].title}
				</h3>
				<p
					bind:this={descEl}
					class="max-h-35 overflow-y-auto text-sm leading-relaxed opacity-80 sm:max-h-none"
				>
					{projects[currentIndex.ind].desc}
				</p>
				{#if projects[currentIndex.ind].tags}
					<div class="mt-4 flex flex-wrap gap-2 md:mt-6">
						{#each projects[currentIndex.ind].tags as tag (tag)}
							<span
								class="dark:text-accent-light rounded-md bg-accent/20 px-2.5 py-1 font-main text-xs font-semibold text-accent dark:bg-accent/30"
							>
								{tag}
							</span>
						{/each}
					</div>
				{/if}
				<div class="pointer-events-auto flex w-full flex-wrap items-center justify-start gap-3">
					<a
						onmouseenter={() => {
							text = 'projects';
							pointTo = 'default';
						}}
						onmouseleave={() => {
							text = 'projects';
							pointTo = 'selector:#project-readmore-btn';
						}}
						id="project-readmore-btn"
						target="_blank"
						class="mt-2 flex items-center gap-2 rounded-xl border border-text-main/10 bg-text-main/5 px-5 py-3 font-main text-sm font-medium text-accent transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(255,0,0,0.15)]"
						href={projects[currentIndex.ind].github}
					>
						Read more ->
					</a>
					{#if projects[currentIndex.ind].link}
						<a
							class="mt-2 flex items-center gap-2 rounded-xl border border-text-main/10 bg-text-main/5 px-5 py-3 font-main text-sm font-medium text-accent transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(255,0,0,0.15)]"
							href={projects[currentIndex.ind].link}
							target="_blank"
						>
							Visit ->
						</a>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
