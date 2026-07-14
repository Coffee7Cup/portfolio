<script>
	import { getContext } from 'svelte';
	const portfolio = getContext('portfolio');
	const personal = portfolio.personal;
</script>

<div class="pointer-events-none relative inset-0 z-10 h-screen w-screen">
	<div
		class="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 scale-70 md:-translate-x-105 md:translate-y-120 md:scale-100"
	>
		{@render radial_gradient_circle()}
	</div>
	<div
		class="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 scale-70 md:translate-x-120 md:-translate-y-120 md:scale-100"
	>
		{@render radial_gradient_circle()}
	</div>
</div>

<div class="overflow-hidden p-4">
	<div class="pointer-events-none absolute inset-0 z-10 p-3">
		<div class="flex h-screen w-screen flex-col items-center justify-center leading-none">
			<div
				class="scale-x-130 scale-y-70 font-stroke-clean text-[2.5rem] font-extrabold md:text-[10rem]"
			>
				Hey,
			</div>
			<div
				class="scale-x-130 scale-y-70 font-stroke-clean text-[2.5rem] font-extrabold sm:text-6xl md:text-[10rem]"
			>
				I'm {personal.name}
			</div>
		</div>

		<div
			class="absolute bottom-0 left-0 flex h-96 w-96 -translate-x-1/2 translate-y-1/2 items-center justify-center md:h-190 md:w-190 md:-translate-x-60 md:translate-y-60"
		>
			<div class="h-48 w-48 rounded-full bg-accent md:h-100 md:w-100"></div>
		</div>
		<div
			class="absolute top-0 right-0 flex h-96 w-96 translate-x-1/2 -translate-y-1/2 items-center justify-center md:h-190 md:w-190 md:translate-x-70 md:-translate-y-70"
		>
			<div class="h-48 w-48 rounded-full bg-accent md:h-100 md:w-100"></div>
		</div>
	</div>

	<div class="pointer-events-none absolute inset-0 z-30 p-3">
		<div class="flex h-screen w-screen flex-col items-center justify-center leading-none">
			<div
				class="text-stroke scale-x-130 scale-y-70 font-stroke-clean text-[2.5rem] font-extrabold md:text-[10rem]"
			>
				Hey,
			</div>
			<div
				class="text-stroke scale-x-130 scale-y-70 font-stroke-clean text-[2.5rem] font-extrabold sm:text-6xl md:text-[10rem]"
			>
				I'm {personal.name}
			</div>
		</div>
	</div>
</div>

<svg class="absolute h-0 w-0" aria-hidden="true">
	<filter id="grn">
		<feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" result="noise" />

		<feComposite operator="in" in="noise" in2="SourceGraphic" result="masked-noise" />

		<feColorMatrix
			type="matrix"
			values="1 0 0 0 0  
			        0 1 0 0 0  
			        0 0 1 0 0  
			        0 0 0 19 -9"
			result="binary-grain"
		/>

		<feComposite operator="in" in="SourceGraphic" in2="binary-grain" />
	</filter>
</svg>
{#snippet radial_gradient_circle()}
	<div class="relative flex h-300 w-300 items-center justify-center">
		<div id="outer" class="absolute inset-0"></div>
	</div>
{/snippet}

<style>
	#outer {
		border-radius: 50%;
		background: radial-gradient(circle, var(--accent, #f97316) 0%, rgba(249, 115, 22, 0) 150%);
		filter: url('#grn');
		overflow: hidden;
	}

	:global(.text-stroke) {
		color: transparent;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-text-stroke: 1px var(--text-main, #ffffff);
	}

	@media (min-width: 1024px) {
		:global(.text-stroke) {
			-webkit-text-stroke: 2px var(--text-main, #ffffff);
		}
	}
</style>
