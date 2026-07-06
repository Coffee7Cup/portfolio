<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<nav></nav>

<button
	class="fixed top-5 left-4 z-1000 cursor-pointer rounded border bg-white p-2"
	onclick={() => document.documentElement.classList.toggle('dark')}
>
	toggle
</button>

{@render children()}
