<script>
	import Home from '$lib/pages/Home.svelte';
	import About from '$lib/pages/About.svelte';
	import Skills from '$lib/pages/Skills.svelte';
	import Projects from '$lib/pages/Projects.svelte';
	import Contact from '$lib/pages/Contact.svelte';
	import Tee from '$lib/three.svelte';
	import Experience from '$lib/pages/Experience.svelte';
	import Companion from '$lib/components/Companion.svelte';

	let threeDimContainer = $state();
	let compText = $state('');
	let compEmotion = $state('normal');
</script>

<div class="relative m-0 w-full overflow-x-hidden bg-bg-main p-0">
	<!-- 3D Canvas Scroll Experience wrapper -->
	<!-- We constrain this container to max-w-full to prevent horizontal scrolling on mobile -->
	<div
		bind:this={threeDimContainer}
		id="3d-container"
		class="pointer-events-none absolute inset-0 z-20 max-w-screen overflow-hidden bg-transparent"
	>
		<Tee />
	</div>

	<!-- Sections -->
	<section
		id="home"
		class="relative min-h-screen w-screen"
		onmouseenter={() => {
			compText = 'This is my laptop ';
		}}
		onmouseleave={() => {
			compText = '';
		}}
	>
		<Home text={compText} emotion={compEmotion} />
	</section>

	<About />

	<Skills bind:text={compText} bind:emotion={compEmotion} />

	<Projects bind:text={compText} bind:emotion={compEmotion} />

	<Experience />

	<Contact bind:text={compText} bind:emotion={compEmotion} />

	<Companion bind:text={compText} bind:emotion={compEmotion} />
</div>
