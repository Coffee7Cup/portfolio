<script>
	import Home from '$lib/pages/Home.svelte';
	import About from '$lib/pages/About.svelte';
	import Skills from '$lib/pages/Skills.svelte';
	import Projects from '$lib/pages/Projects.svelte';
	import Contact from '$lib/pages/Contact.svelte';
	import Tee from '$lib/three.svelte';

	let threeDimContainer = $state();
</script>

<div class="relative m-0 w-full overflow-x-hidden bg-bg-main p-0">
	<!-- 3D Canvas Scroll Experience wrapper -->
	<!-- We constrain this container to max-w-full to prevent horizontal scrolling on mobile -->
	<div bind:this={threeDimContainer} id="3d-container" class="absolute inset-0 z-20 pointer-events-none bg-transparent max-w-full overflow-hidden">
		<Tee />
	</div>

	<!-- Sections -->
	<section id="home" class="relative min-h-screen w-full">
		<Home />
	</section>

	<About />

	<Skills />

	<Projects />

	<Contact />
</div>
