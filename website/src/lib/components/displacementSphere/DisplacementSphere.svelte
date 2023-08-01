<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable, type Readable } from 'svelte/store';
	import { animate, useReducedMotion, useSpring } from 'framer-motion';
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
	import type { Unsubscriber } from 'svelte/motion';
	import windowSizeStore, { type WindowSize } from '$lib/stores/windowSize';
	import inViewport from '$lib/stores/inViewPort';

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
	const rotationX = useSpring(0, springConfig);
	const rotationY = useSpring(0, springConfig);

	let theme: string;
	const rgbBackground = writable<string>('17 17 17');
	const colorWhite = writable<string>('0xFFFFFF');

	let fragShader = '';
	let vertShader = '';

	onMount(async () => {
		const fragResponse = await fetch('./displacementSphereFragment.glsl');
		const vertResponse = await fetch('./displacementSphereVertex.glsl');

		fragShader = await fragResponse.text();
		vertShader = await vertResponse.text();
		// now you can use fragShader and vertShader as strings
	});

	onMount(() => {
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
		material.onBeforeCompile = (shader: any) => {
			uniforms = UniformsUtils.merge([shader.uniforms, { time: { type: 'f', value: 0 } }]);

			shader.uniforms = uniforms;
			shader.vertexShader = vertShader;
			shader.fragmentShader = fragShader;
		};

		geometry = new SphereGeometry(32, 128, 128);
		sphere = new Mesh(geometry, material);
		sphere.position.z = 0;
		// sphere.modifier = Math.random();
		scene.add(sphere);

		onDestroy(() => {
			cleanRenderer(renderer);
			cleanScene(scene);
		});
	});

	onMount(() => {
		const themeStoreUnSub = themeStore.subscribe((value) => (theme = value));

		onDestroy(() => {
			themeStoreUnSub();
			removeLights(lights);
		});
	});

	$: {
		const dirLight = new DirectionalLight(0xffffff, 0.6);
		const ambientLight = new AmbientLight(0xffffff, theme == THEMES.LIGHT ? 0.8 : 0.1);

		dirLight.position.z = 200;
		dirLight.position.x = 100;
		dirLight.position.y = 100;

		lights = [dirLight, ambientLight];
		scene.background = new Color(...rgbToThreeColor('17 17 17'));
		lights.forEach((light) => scene.add(light));
	}

	let windowSize: WindowSize;
	onMount(() => {
		const windowSizeStoreUnSub = windowSizeStore.subscribe((value) => (windowSize = value));

		onDestroy(() => {
			windowSizeStoreUnSub();
		});
	});

	$: {
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

	let inViewSub: Readable<boolean> | undefined;
	let inViewValue: boolean;
	onMount(() => {
		inViewSub = inViewport(canvasRef, true, {}, true);
		const inViewUnSub = inViewSub.subscribe((value) => (inViewValue = value));

		onDestroy(() => {
			inViewUnSub();
			onMouseMove && window.removeEventListener('mousemove', onMouseMove);
		})
	});
	
	let onMouseMove: ((event: MouseEvent) => void) | undefined;
	$: {
		onMouseMove = (event: MouseEvent) => {
			const position = {
				x: event.clientX / window.innerWidth,
				y: event.clientY / window.innerHeight
			};

			rotationX.set(position.y / 2);
			rotationY.set(position.x / 2);
		};

		if (!reduceMotion && inViewValue) {
			window.addEventListener('mousemove', onMouseMove);
		}
	}
	let animation: number; 
	$: {
		const animate = () => {
			animation = requestAnimationFrame(animate)

			if (uniforms !== undefined) 
				uniforms.time.value = 0.00005 * (Date.now() - start);

			sphere.rotation.z += 0.001;
			sphere.rotation.x = rotationX.get();
			sphere.rotation.y = rotationY.get();

			renderer.render(scene, camera);
		};

		if(!reduceMotion && inViewValue){
			animate();
		}
		else {
			renderer.render(scene, camera);
		}
	}
	onDestroy(() => {
		cancelAnimationFrame(animation);
	})
</script>

<Transition in={{ duration: 3000 }}>
	<canvas aria-hidden class={styles.canvas} bind:this={canvasRef} />
</Transition>

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
