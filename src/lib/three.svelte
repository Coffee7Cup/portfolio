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
		const scene = new THREE.Scene();

		const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
		scene.add(ambientLight);

		const renderer = new THREE.WebGLRenderer({
			canvas: canvasElement,
			antialias: true,
			alpha: true
		});
		renderer.setClearColor(0x000000, 0);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		let camera;
		let mixer;
		const actions = [];

		const animationProxy = { time: 0.5 };

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
						time: 3.5,
						ease: 'none',
						onUpdate: () => {
							actions.forEach((action) => (action.time = animationProxy.time));
						},
						scrollTrigger: {
							trigger: containerElement,
							start: 'top top',
							end: 'bottom bottom',
							scrub: 1
						}
					}
				);
			}
			animate();
		});

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

<div bind:this={containerElement} class="scroll-container relative h-[300vh]">
	<div class="canvas-wrapper fixed top-0 left-0 h-screen w-full">
		<canvas class="h-full w-full" bind:this={canvasElement}></canvas>
	</div>
</div>
hello
