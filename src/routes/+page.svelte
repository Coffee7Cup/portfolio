<script>
	import Home from '$lib/pages/Home.svelte';
	import Tee from '$lib/three.svelte';

	let threeDimContainer = $state();
</script>

<div class=" relative min-h-screen w-screen overflow-x-hidden bg-bg-main">
	<div
		bind:this={threeDimContainer}
		id="3d-container"
		class=" absolute top-0 left-0 z-2 bg-transparent"
	>
		<Tee />
	</div>
	<Home />
</div>
