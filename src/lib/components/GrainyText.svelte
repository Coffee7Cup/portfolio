<script>
	let { text, size = '6xl', id = 'grn-text' } = $props();

	let filterId = $derived(`text-grn-${id}`);
</script>

<svg class="absolute h-0 w-0" aria-hidden="true">
	<filter id={filterId}>
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

<h2
	class="grainy-heading bg-clip-text font-black tracking-wider text-transparent text-{size}"
	style="
		background-image: linear-gradient(to bottom, var(--accent, #ff0000) 30%, transparent 250%);
		filter: url(#{filterId});
	"
>
	{text}
</h2>
