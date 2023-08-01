<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable, type Readable, readable } from 'svelte/store';
	import {
		AmbientLight,
		Color,
		DirectionalLight,
		Mesh,
		MeshPhongMaterial,
		PerspectiveCamera,
		Scene,
		UniformsUtils,
		Vector2,
		WebGLRenderer,
		SRGBColorSpace,
		SphereGeometry,
		Light
	} from 'three';
	import { cleanRenderer, cleanScene, removeLights, rgbToThreeColor } from './utils';
	import { THEMES, themeStore } from '$lib/stores/themeStore';

	import windowSizeStore, { type WindowSize } from '$lib/stores/windowSize';
	import inViewport from '$lib/stores/inViewPort';
	import { spring } from 'svelte/motion';
	import shaders from './shaders'

	const springConfig = {
		stiffness: 30,
		damping: 20,
		mass: 2
	};

	const media = {
		desktop: 2080,
		laptop: 1680,
		tablet: 1040,
		mobile: 696,
		mobileS: 400
	};

	let canvasRef: HTMLElement;
	let start = Date.now();
	let mouse: Vector2;
	let renderer: WebGLRenderer;
	let camera: PerspectiveCamera;
	let scene: Scene;
	let lights: Light[];
	let uniforms: any;
	let material: MeshPhongMaterial;
	let geometry: SphereGeometry;
	let sphere: Mesh;
	let reduceMotion = false;
	const rotationX = spring(0, springConfig);
	const rotationY = spring(0, springConfig);

	let theme: string;
	const rgbBackground = writable<string>('17 17 17');
	const colorWhite = writable<string>('0xFFFFFF');

	onMount(async () => {
		const { innerWidth, innerHeight } = window;

		mouse = new Vector2(0.8, 0.5);
		renderer = new WebGLRenderer({
			canvas: canvasRef,
			antialias: false,
			alpha: true,
			powerPreference: 'high-performance',
			failIfMajorPerformanceCaveat: true
		});
		renderer.setSize(innerWidth, innerHeight);
		renderer.setPixelRatio(1);
		renderer.outputColorSpace = SRGBColorSpace;

		camera = new PerspectiveCamera(54, innerWidth / innerHeight, 0.1, 100);
		camera.position.z = 52;

		scene = new Scene();

		material = new MeshPhongMaterial();
		material.onBeforeCompile = async (shader: any) => {
			uniforms = UniformsUtils.merge([shader.uniforms, { time: { type: 'f', value: 0 } }]);

			shader.uniforms = uniforms;
			shader.vertexShader = shaders.vertexShader;
			shader.fragmentShader = shaders.fragmentShader;
		};

		geometry = new SphereGeometry(32, 128, 128);
		sphere = new Mesh(geometry, material);
		sphere.position.z = 0;
		// sphere.modifier = Math.random();
		scene.add(sphere);

		const dirLight = new DirectionalLight(0xffffff, 0.6);
			const ambientLight = new AmbientLight(0xffffff, theme == THEMES.LIGHT ? 0.8 : 0.1);

			dirLight.position.z = 200;
			dirLight.position.x = 100;
			dirLight.position.y = 100;

			lights = [dirLight, ambientLight];
			scene.background = new Color(... rgbToThreeColor("17 17 17"));
			lights.forEach((light) => scene.add(light));

			const animate = () => {
				requestAnimationFrame(animate);
				if (uniforms !== undefined) uniforms.time.value = 0.00005 * (Date.now() - start);

				sphere.rotation.z += 0.001;
				sphere.rotation.x = $rotationX;
				sphere.rotation.y = $rotationY;

				renderer.render(scene, camera);
			};
			animate();

			// if (!reduceMotion && inViewValue) {
				// window.addEventListener('mousemove', onMouseMove);	
	});

	onDestroy(() => {
		cleanRenderer(renderer);
		cleanScene(scene);
		removeLights(lights);
	});

	let windowSize: WindowSize;
	onMount(() => {
		const themeStoreUnSub = themeStore.subscribe((value) => (theme = value));
		const windowSizeStoreUnSub = windowSizeStore.subscribe((value) => (windowSize = value));
	});


	$: {
		if (windowSize && renderer && sphere && camera) {
			console.log("3. reactive");
			const { width, height } = windowSize;

			const adjustedHeight = height + height * 0.3;
			renderer.setSize(width, adjustedHeight);
			camera.aspect = width / adjustedHeight;
			camera.updateProjectionMatrix();

			if (reduceMotion) renderer.render(scene, camera);

			if (width <= media.mobile) {
				sphere.position.x = 14;
				sphere.position.y = 10;
			} else if (width <= media.tablet) {
				sphere.position.x = 18;
				sphere.position.y = 14;
			} else {
				sphere.position.x = 22;
				sphere.position.y = 16;
			}
		}
	}

	let inViewSub: Readable<boolean> | undefined;
	let inViewValue: boolean;
	onMount(() => {
		inViewSub = inViewport(canvasRef, true, {}, true);
		const inViewUnSub = inViewSub.subscribe((value) => (inViewValue = value));
	});

	onDestroy(() => {
		//inViewUnSub();
		onMouseMove && window && window.removeEventListener('mousemove', onMouseMove);
	});

	let onMouseMove: ((event: MouseEvent) => void) | undefined;
	let animation: number;
	// $: {
	// 	if (renderer && typeof window !== 'undefined') {
	// 		console.log("5. reactive");
	// 		onMouseMove = (event: MouseEvent) => {
	// 			const position = {
	// 				x: event.clientX / window.innerWidth,
	// 				y: event.clientY / window.innerHeight
	// 			};

	// 			rotationX.set(position.y / 2);
	// 			rotationY.set(position.x / 2);
	// 		};

	// 		const animate = () => {
	// 			requestAnimationFrame(animate);
	// 			if (uniforms !== undefined) uniforms.time.value = 0.00005 * (Date.now() - start);

	// 			sphere.rotation.z += 0.001;
	// 			sphere.rotation.x = $rotationX;
	// 			sphere.rotation.y = $rotationY;

	// 			renderer.render(scene, camera);
	// 		};

	// 		if (!reduceMotion && inViewValue) {
	// 			window.addEventListener('mousemove', onMouseMove);
	// 			animate();
				
	// 		} else {
	// 			renderer.render(scene, camera);
	// 		}
	// 	}
	// }
	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.cancelAnimationFrame(animation);
		}
	});
</script>

<canvas aria-hidden data-visible='true' class="canvas" bind:this={canvasRef} />

<style>
	.canvas {
		position: absolute;
		width: 100vw;
		inset: 0;
		opacity: 0;
		transition-property: opacity;
		transition-duration: 3s;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

		&[data-visible='true'] {
			opacity: 1;
		}
	}
</style>
