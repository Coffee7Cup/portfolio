<script>
	import Home from '$lib/pages/Home.svelte';
	import Tee from '$lib/three.svelte';

	let threeDimContainer = $state();
</script>

<div class="relative m-0 min-h-screen w-screen bg-bg-main p-0">
	<div bind:this={threeDimContainer} id="3d-container" class="absolute inset-0 z-20 bg-transparent">
		<Tee />
	</div>

	<Home />
</div>
