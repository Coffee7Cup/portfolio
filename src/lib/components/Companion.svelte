<script>
	const Expression = {
		HAPPY: 'happy',
		SAD: 'sad',
		NORMAL: 'normal',
		OKAY: 'okay',
		EYE: 'eye-click'
	};

	let { companion = 'linux', emotion = null, text = null } = $props();

	let iconType = $derived(emotion ?? Expression.NORMAL);
	let displayText = $derived(text ?? '');

	let mouseX = $state(0);
	let mouseY = $state(0);
	let isMdUp = $state(false);

	$effect(() => {
		const mql = window.matchMedia('(min-width: 768px)');
		isMdUp = mql.matches;

		const handleMqlChange = (e) => {
			isMdUp = e.matches;
		};
		mql.addEventListener('change', handleMqlChange);

		const handleMouseMove = (e) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		};
		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			mql.removeEventListener('change', handleMqlChange);
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<div
	class="pointer-events-none z-10000"
	class:fixed={isMdUp}
	style={isMdUp ? `left: ${mouseX}px; top: ${mouseY}px;` : ''}
>
	{#if displayText !== ''}
		<div
			class="flex min-h-10 max-w-50 translate-x-[25%] items-center border border-red-600 bg-bg-main/50 px-2 text-text-main backdrop-blur-sm transition-all duration-200"
		>
			{displayText}
		</div>
	{/if}
	<img
		src={`comp/${companion}/${iconType}.svg`}
		alt={companion}
		class="h-40 w-40 object-contain p-2"
	/>
</div>
