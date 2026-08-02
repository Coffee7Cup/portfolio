<script>
	let { companion = 'arrow', target = null, pointTo = 'default', text = null } = $props();

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

	// Compute angle from mouse to target element or position
	let arrowRotation = $derived.by(() => {
		let targetX = null;
		let targetY = null;

		// 1. If target HTML element is provided directly or via pointTo
		if (target && target instanceof HTMLElement) {
			const rect = target.getBoundingClientRect();
			targetX = rect.left + rect.width / 2;
			targetY = rect.top + rect.height / 2;
		} else if (pointTo && pointTo instanceof HTMLElement) {
			const rect = pointTo.getBoundingClientRect();
			targetX = rect.left + rect.width / 2;
			targetY = rect.top + rect.height / 2;
		} else if (typeof pointTo === 'string' && pointTo.startsWith('selector:')) {
			const selector = pointTo.replace('selector:', '');
			const el = document.querySelector(selector);
			if (el) {
				const rect = el.getBoundingClientRect();
				targetX = rect.left + rect.width / 2;
				targetY = rect.top + rect.height / 2;
			}
		} else if (pointTo === 'middle' || pointTo === 'center') {
			targetX = window.innerWidth / 2;
			targetY = window.innerHeight / 2;
		} else if (pointTo === 'middle-right' || pointTo === 'right-middle') {
			targetX = window.innerWidth * 0.85;
			targetY = window.innerHeight * 0.5;
		}

		if (targetX !== null && targetY !== null) {
			const dx = targetX - mouseX;
			const dy = targetY - mouseY;
			const rad = Math.atan2(dy, dx);
			return rad * (180 / Math.PI) + 90;
		}

		if (typeof pointTo === 'number') {
			return pointTo;
		}

		return 0; // Default facing top
	});
</script>

<div
	class="pointer-events-none z-[10000] transition-opacity duration-300"
	class:fixed={isMdUp}
	style={isMdUp ? `left: ${mouseX}px; top: ${mouseY}px;` : ''}
>
	{#if displayText !== ''}
		<div
			class="flex min-h-10 max-w-xs -translate-x-full -translate-y-full items-center gap-2 rounded-lg border border-accent/40 bg-bg-main/80 px-3 py-1.5 text-sm font-medium text-text-main shadow-lg backdrop-blur-md transition-all duration-100"
		>
			<span class="leading-tight">{displayText}</span>
			<img
				src={`/comp/${companion}.svg`}
				alt="comp"
				class="h-7 w-7 shrink-0 transition-transform "
				style="transform: rotate({arrowRotation}deg);"
			/>
		</div>
	{/if}
</div>
