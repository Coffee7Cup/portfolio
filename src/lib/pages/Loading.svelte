<script>
	import fav from '$lib/assets/favicon.svg';
	let { progress = 0, status = 'Initializing...' } = $props();

	const bootLines = [
		'Loading kernel modules',
		'Mounting filesystems',
		'Starting udev',
		'Initializing network interfaces',
		'Starting system logger',
		'Loading display server',
		'Starting session manager'
	];

	const barWidth = 42;

	let elapsed = $derived((progress / 100) * 4.238); // fake seconds-since-boot, cosmetic only
	let visibleLines = $derived(bootLines.slice(0, Math.ceil((progress / 100) * bootLines.length)));
	let filled = $derived(Math.round((progress / 100) * barWidth));
	let bar = $derived('█'.repeat(filled) + '░'.repeat(barWidth - filled));
</script>

<div class="loader-overlay fixed inset-0 z-9999 flex flex-col bg-black font-mono text-white">
	<!-- top wordmark -->
	<div class="flex items-center justify-between border-b border-white/10 px-8 py-5">
		<span class="text-xs font-semibold tracking-[0.3em] text-white/50 uppercase">
			<img src={fav} alt="favicon" class="h-10" />
		</span>
		<span class="text-xs tracking-[0.3em] text-white/30 uppercase">Portfolio</span>
	</div>

	<!-- scrolling boot log -->
	<div class="flex flex-1 flex-col justify-end overflow-hidden px-8 py-8">
		<img src={fav} alt="favicon" class="max-w-2xl" />
		<div class="mx-auto w-full max-w-2xl">
			{#each visibleLines as line, i (i)}
				<div class="text-[13px] leading-relaxed text-white/60">
					<span class="text-white/30">[{(i * 0.612).toFixed(6)}]</span>
					{line}
				</div>
			{/each}
			<div class="flex items-center gap-1.5 text-[13px] text-white/90">
				<span class="text-white/30">[{elapsed.toFixed(6)}]</span>
				<span>{status}</span>
				<span class="cursor-blink inline-block h-[14px] w-[7px] bg-white/80"></span>
			</div>
		</div>
	</div>

	<!-- bottom progress -->
	<div class="border-t border-white/10 px-8 py-6">
		<div class="mx-auto flex w-full max-w-2xl flex-col gap-2">
			<div class="flex justify-between text-[10px] tracking-widest text-white/40 uppercase">
				<span>Booting</span>
				<span>{progress}%</span>
			</div>
			<div class="text-xs leading-none tracking-tighter text-white/70">
				[{bar}]
			</div>
		</div>
	</div>
</div>

<style>
	.cursor-blink {
		animation: blink 1s steps(1) infinite;
	}
	@keyframes blink {
		0%,
		49% {
			opacity: 1;
		}
		50%,
		100% {
			opacity: 0;
		}
	}
</style>

