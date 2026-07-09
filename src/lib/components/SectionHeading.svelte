<script>
	import GrainyText from './GrainyText.svelte';

	let { title, id, children } = $props();
</script>

<section {id} class="section-container relative min-h-screen w-full overflow-hidden bg-bg-main">
	<div class="section-inner relative flex min-h-screen w-full flex-col md:flex-row">
		<!-- Rotated title on left -->
		<div
			class="section-title-col pointer-events-none absolute top-0 left-0 z-10 flex h-full w-full items-center justify-start md:relative md:w-40 lg:w-52"
		>
			<div class="rotate-title -rotate-90 origin-center whitespace-nowrap">
				<GrainyText text={title} size="7xl md:text-8xl lg:text-9xl" id="section-{id}" />
			</div>
		</div>

		<!-- Content area -->
		<div class="section-content relative z-20 flex flex-1 items-center px-6 py-20 md:px-12 lg:px-20">
			{@render children()}
		</div>
	</div>
</section>

<style>
	.rotate-title {
		transform: rotate(-90deg);
	}

	@media (max-width: 767px) {
		.rotate-title {
			opacity: 0.15;
			position: absolute;
			left: -2rem;
			top: 50%;
			transform: rotate(-90deg) translateX(-50%);
		}
	}
</style>
