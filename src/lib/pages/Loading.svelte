<script>
	import fav from '$lib/assets/favicon.svg';
	import { gsap } from 'gsap';
	let { progress = 0, onComplete = () => {} } = $props();

	let containerRef = $state();
	let logoRef = $state();
	let percentRef = $state();
	let bottomRef = $state();

	let hidden = $state(false);

	const circumference = 2 * Math.PI * 120;
	let dashOffset = $derived(circumference - (progress / 100) * circumference);

	$effect(() => {
		if (progress >= 100 && containerRef) {
			const tl = gsap.timeline({
				onComplete: () => {
					hidden = true;
					onComplete();
				}
			});

			tl.to(
				logoRef,
				{
					scale: 0.3,
					opacity: 0,
					duration: 0.8,
					ease: 'expo.inOut'
				},
				0
			);

			tl.to(
				percentRef,
				{
					y: 20,
					opacity: 0,
					duration: 0.4,
					ease: 'power2.in'
				},
				0.1
			);

			tl.to(
				bottomRef,
				{
					y: 15,
					opacity: 0,
					duration: 0.3,
					ease: 'power2.in'
				},
				0.15
			);

			tl.to(
				containerRef,
				{
					opacity: 0,
					duration: 0.8,
					ease: 'power2.inOut'
				},
				0.3
			);
		}
	});
</script>

{#if !hidden}
	<div
		bind:this={containerRef}
		class="fixed inset-0 z-9999 flex flex-col bg-black font-sans text-white"
	>
		<!-- center stage -->
		<div class="relative z-10 flex flex-1 flex-col items-center justify-center px-10">
			<!-- logo with single ring -->
			<div class="relative flex h-[300px] w-[300px] items-center justify-center">
				<!-- static ring -->
				<div class="absolute inset-0 rounded-full border border-white/[0.06]"></div>

				<!-- SVG progress ring -->
				<svg
					class="absolute"
					width="300"
					height="300"
					viewBox="0 0 300 300"
					style="transform:rotate(-90deg)"
				>
					<circle
						cx="150"
						cy="150"
						r="120"
						fill="none"
						stroke="rgba(255,255,255,0.04)"
						stroke-width="1"
					/>
					<circle
						cx="150"
						cy="150"
						r="120"
						fill="none"
						stroke="#ef4444"
						stroke-width="2"
						stroke-dasharray={circumference}
						stroke-dashoffset={dashOffset}
						stroke-linecap="round"
						class="transition-[stroke-dashoffset] duration-500"
					/>
				</svg>

				<!-- the mark -->
				<div bind:this={logoRef} class="animate-breathe">
					<img src={fav} alt="logo" class="h-50 w-50" />
				</div>
			</div>

			<!-- BOLD percentage -->
			<div bind:this={percentRef} class="mt-8 text-center">
				<p class="text-7xl leading-none font-extrabold tracking-tighter text-red-500 tabular-nums">
					{progress}<span class="ml-1 align-super text-2xl font-bold text-red-500/50">%</span>
				</p>
			</div>
		</div>
		<!-- bottom bar -->
	</div>
{/if}

<style>
	@keyframes breathe {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.03);
		}
	}
	.animate-breathe {
		animation: breathe 3s ease-in-out infinite;
	}
</style>
