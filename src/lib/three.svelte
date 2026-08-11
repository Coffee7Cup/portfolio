<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { base } from '$app/paths';
	gsap.registerPlugin(ScrollTrigger);

	let { compText = $bindable(''), compPointTo = $bindable('') } = $props();

	let canvasElement = $state();
	let containerElement = $state();
	let canvasWrapperElement = $state();

	const MOBILE_BREAKPOINT = 768; // px
	const MOBILE_CAM_MULTIPLIER = 2; // push camera back 2x on mobile

	onMount(() => {
		const scene = new THREE.Scene();
		const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
		scene.add(ambientLight);

		const renderer = new THREE.WebGLRenderer({
			canvas: canvasElement,
			antialias: true,
			alpha: true
		});
		renderer.setClearColor(0x000000, 0);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		const getSize = () => {
			const rect = canvasWrapperElement.getBoundingClientRect();
			return { width: rect.width, height: rect.height };
		};

		let { width: initialWidth, height: initialHeight } = getSize();
		renderer.setSize(initialWidth, initialHeight);

		let camera;
		let mixer;
		let model;
		const actions = [];
		const animationProxy = { time: 0.5 };
		let basePosition = null; // authored camera position from the GLB
		let isMobile = null; // tracks which mode the camera is currently in

		const applyCameraDistance = () => {
			if (!camera || !basePosition) return;
			const { width } = getSize();
			const mobile = width <= MOBILE_BREAKPOINT;
			if (mobile === isMobile) return; // no change, skip re-setting position
			isMobile = mobile;
			const multiplier = mobile ? MOBILE_CAM_MULTIPLIER : 1;
			camera.position.copy(basePosition).multiplyScalar(multiplier);
		};

		const loader = new GLTFLoader();
		loader.load(`${base}/prop.glb`, (gltf) => {
			model = gltf.scene;
			scene.add(model);

			const { width, height } = getSize();
			if (gltf.cameras && gltf.cameras.length > 0) {
				camera = gltf.cameras[0];
				camera.aspect = width / height;
				camera.updateProjectionMatrix();
			} else {
				camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
				camera.position.set(0, 5, 10);
				camera.lookAt(0, 0, 0);
			}
			basePosition = camera.position.clone();
			applyCameraDistance();

			if (gltf.animations && gltf.animations.length > 0) {
				mixer = new THREE.AnimationMixer(model);
				for (const clip of gltf.animations) {
					const action = mixer.clipAction(clip);
					action.play();
					action.paused = true;
					actions.push(action);
				}
				const tl = gsap.timeline();
				tl.fromTo(
					animationProxy,
					{ time: 0 },
					{
						time: 1,
						duration: 0.7,
						ease: 'power1.out',
						onUpdate: () => {
							actions.forEach((action) => (action.time = animationProxy.time));
						}
					}
				);
				tl.fromTo(
					animationProxy,
					{ time: 1 },
					{
						time: 3.2,
						ease: 'none',
						onUpdate: () => {
							actions.forEach((action) => (action.time = animationProxy.time));
						},
						scrollTrigger: {
							trigger: containerElement,
							start: 'top top',
							end: 'bottom bottom',
							scrub: 1,
							onLeave: () => {
								gsap.to(containerElement, { opacity: 0, duration: 0.5, ease: 'power1.out' });
							},
							onEnterBack: () => {
								gsap.to(containerElement, { opacity: 1, duration: 0.5, ease: 'power1.out' });
							}
						}
					}
				);
			}
			animate();
		});

		function animate() {
			requestAnimationFrame(animate);
			if (mixer) mixer.update(0);
			if (camera) renderer.render(scene, camera);
		}

		const handleResize = () => {
			const { width, height } = getSize();
			renderer.setSize(width, height);
			if (camera) {
				camera.aspect = width / height;
				camera.updateProjectionMatrix();
			}
			applyCameraDistance();
		};

		window.addEventListener('resize', handleResize);
		const ro = new ResizeObserver(handleResize);
		ro.observe(canvasWrapperElement);

		return () => {
			window.removeEventListener('resize', handleResize);
			ro.disconnect();
			renderer.dispose();
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	});
</script>

<div bind:this={containerElement} id="3d" class="scroll-container relative h-[300vh] w-0">
	<div bind:this={canvasWrapperElement} class="canvas-wrapper fixed inset-0">
		<canvas bind:this={canvasElement} class="block h-full w-full"></canvas>
	</div>
</div>
