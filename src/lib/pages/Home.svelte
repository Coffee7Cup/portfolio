<div class="pointer-events-none relative inset-0 z-10 h-screen w-screen">
	<div class="absolute bottom-0 left-0 -translate-x-105 translate-y-120">
		{@render radial_gradient_circle()}
	</div>
	<div class="absolute top-0 right-0 translate-x-120 -translate-y-120">
		{@render radial_gradient_circle()}
	</div>
</div>

<div class="p-4">
	<div class="pointer-events-none absolute inset-0 z-10 p-3">
		<div class="flex h-screen flex-col leading-none">
			<div class="h-[50%]"></div>
			<div class="font-stroke-display text-[9rem] font-extrabold text-text-main">Hey,</div>
			<div class="font-stroke-display text-[9rem] font-extrabold text-text-main">I'm Yashwanth</div>
		</div>

		<div
			class="absolute bottom-0 left-0 flex h-190 w-190 -translate-x-60 translate-y-60 items-center justify-center"
		>
			<div class="h-100 w-100 rounded-full bg-accent"></div>
		</div>
		<div
			class="absolute top-0 right-0 flex h-190 w-190 translate-x-70 -translate-y-70 items-center justify-center"
		>
			<div class="h-100 w-100 rounded-full bg-accent"></div>
		</div>
	</div>

	<div class="pointer-events-none absolute inset-0 z-30 p-3">
		<div class="flex h-screen flex-col leading-none">
			<div class="h-[50%]"></div>
			<div class="text-stroke font-stroke-display text-[9rem] font-extrabold">Hey,</div>
			<div class="text-stroke font-stroke-display text-[9rem] font-extrabold">I'm Yashwanth</div>
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
		-webkit-text-stroke: 4px var(--text-main, #ffffff);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
