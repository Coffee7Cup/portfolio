<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let canvasElement = $state();
	let containerElement = $state();

	onMount(() => {
		// --- 1. Three.js Setup ---
		const scene = new THREE.Scene();

		const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
		scene.add(ambientLight);

		const renderer = new THREE.WebGLRenderer({
			canvas: canvasElement,
			antialias: true,
			alpha: true
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		let camera;
		let mixer;
		// Keep track of all active animation actions in an array
		const actions = [];

		// Dummy proxy object for GSAP to manipulate
		const animationProxy = { time: 0 };

		// --- 2. Load GLB Model ---
		const loader = new GLTFLoader();
		loader.load('/prop.glb', (gltf) => {
			const model = gltf.scene;
			scene.add(model);

			if (gltf.cameras && gltf.cameras.length > 0) {
				camera = gltf.cameras[0];
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
			} else {
				camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
				camera.position.set(0, 5, 10);
				camera.lookAt(0, 0, 0);
			}

			// --- 3. Setup Animations ---
			if (gltf.animations && gltf.animations.length > 0) {
				// Create ONE mixer for the entire model
				mixer = new THREE.AnimationMixer(model);

				// Correctly loop through each AnimationClip object
				for (const clip of gltf.animations) {
					const action = mixer.clipAction(clip);
					action.play();
					action.paused = true; // Handover control to GSAP proxy
					actions.push(action); // Store action reference
				}

				// Create ONE timeline mapped to your scroll container
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: containerElement,
						start: 'top top',
						end: 'bottom bottom',
						//pin: true,
						scrub: 1
					}
				});

				tl.to(animationProxy, {
					time: 3.5, // Scrub forward up to 3.5 seconds into the animations
					ease: 'none',
					onUpdate: () => {
						// Apply the proxy time to ALL active clip actions simultaneously
						actions.forEach((action) => {
							action.time = animationProxy.time;
						});
					}
				});
			}

			animate();
		});

		// --- 4. Render & Resize Loops ---
		function animate() {
			requestAnimationFrame(animate);

			if (mixer) {
				mixer.update(0);
			}

			if (camera) {
				renderer.render(scene, camera);
			}
		}

		const handleResize = () => {
			if (!camera) return;
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			renderer.dispose();
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	});
</script>

<div bind:this={containerElement} class="scroll-container">
	<div class="canvas-wrapper">
		<canvas bind:this={canvasElement}></canvas>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
		background-color: #111;
	}

	.scroll-container {
		height: 300vh;
		position: relative;
	}

	.canvas-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		z-index: 1;
		pointer-events: none;
	}

	canvas {
		width: 100vw;
		display: block;
	}
</style>
