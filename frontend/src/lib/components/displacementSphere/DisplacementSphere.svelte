<script lang="ts">
	import { onMount } from 'svelte';

	import {
		Color,
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
	import {
		cleanRenderer,
		cleanScene,
		getAmbientLight,
		getDirectionLight,
		removeLights,
		rgbToThreeColor
	} from './utils';
	import { THEMES, themeStore } from '$lib/stores/themeStore';

	import windowSizeStore, { type WindowSize } from '$lib/stores/windowSize';
	import inViewport from '$lib/stores/inViewPort';
	import { spring, tweened } from 'svelte/motion';
	import shaders from './shaders';
	import { cubicOut } from 'svelte/easing';

	const springConfig = {
		stiffness: 1000,
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
	let windowSize: WindowSize;
	let inViewValue: boolean = true;
	let mounted: boolean = false;

	const opacity = tweened(0);

	onMount(() => {
		const themeStoreUnSub = themeStore.subscribe((value) => {
			theme = value;
			opacity.set(0)
				.then(() => {
					opacity.set(1, {duration: 3000, easing: cubicOut})
				})
		});

		const windowSizeStoreUnSub = windowSizeStore.subscribe((value) => (windowSize = value));
		const inViewSub = inViewport(canvasRef, true, {}, true);
		const inViewUnSub = inViewSub.subscribe((value) => (inViewValue = value));

		return () => {
			themeStoreUnSub();
			windowSizeStoreUnSub();
			inViewUnSub;
		};
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
			shader.vertexShader = shaders.vertexShader;
			shader.fragmentShader = shaders.fragmentShader;
		};

		geometry = new SphereGeometry(32, 128, 128);
		sphere = new Mesh(geometry, material);
		sphere.position.z = 0;
		scene.add(sphere);

		mounted = true;

		return () => {
			cleanScene(scene);
			cleanRenderer(renderer);
		};
	});

	$: _cleanupLights = (() => {
		if (_cleanupLights) {
			_cleanupLights();
		}
		if (typeof window != 'undefined' && mounted) {
			lights = [getDirectionLight(theme), getAmbientLight(theme)];
			scene.background = new Color(
				...rgbToThreeColor(theme == THEMES.LIGHT ? '242 242 242' : '17 17 17')
			);

			lights.forEach((light) => scene.add(light));
			renderer.render(scene, camera);
		}
		return () => {
			removeLights(lights);
		};
	})();

	$: {
		if (typeof window !== 'undefined' && mounted) {
			const { width, height } = windowSize;

			const adjustedHeight = height + height * 0.3;
			renderer.setSize(width, adjustedHeight);
			camera.aspect = width / adjustedHeight;
			camera.updateProjectionMatrix();

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

	$: _cleanupMouseMove = (() => {
		if (_cleanupMouseMove) {
			_cleanupMouseMove();
		}
		let onMouseMove: (this: Window, ev: MouseEvent) => any;
		if (typeof window !== 'undefined' && mounted) {
			onMouseMove = (event: MouseEvent) => {
				const position = {
					x: event.clientX / window.innerWidth,
					y: event.clientY / window.innerHeight
				};

				rotationX.set(position.y / 4);
				rotationY.set(position.x / 4);
			};

			if (!reduceMotion && inViewValue) {
				window.addEventListener('mousemove', onMouseMove);
			}
		}

		return () => {
			window.removeEventListener('mousemove', onMouseMove);
		};
	})();

	$: {
		if (mounted && reduceMotion) {
			renderer.render(scene, camera);
		}
	}

	$: _cleanupAnimation = (() => {
		if (_cleanupAnimation) {
			_cleanupAnimation();
		}

		let animation: number;
		if (typeof window != 'undefined' && mounted) {
			const animate = () => {
				animation = requestAnimationFrame(animate);
				if (uniforms) uniforms.time.value = 0.00005 * (Date.now() - start);

				sphere.rotation.z += 0.0005;
				sphere.rotation.x = $rotationX;
				sphere.rotation.y = $rotationY;

				renderer.render(scene, camera);
			};

			if (!reduceMotion && inViewValue) {
				animate();
			} else {
				renderer.render(scene, camera);
			}
		}
		return () => {
			cancelAnimationFrame(animation);
		};
	})();
</script>

<canvas style="opacity: {$opacity}" aria-hidden class="canvas absolute z-[-1]" bind:this={canvasRef} />
