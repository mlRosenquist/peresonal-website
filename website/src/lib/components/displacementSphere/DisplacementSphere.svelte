<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { useReducedMotion, useSpring } from 'framer-motion';
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
		sRGBEncoding,
    SphereBufferGeometry
	} from 'three';

	export const media = {
		desktop: 2080,
		laptop: 1680,
		tablet: 1040,
		mobile: 696,
		mobileS: 400
	};

	export const rgbToThreeColor = (rgb: any) =>
		rgb?.split(' ').map((value: any) => Number(value) / 255) || [];

	/**
	 * Clean up and dispose of a renderer
	 */
	export const cleanRenderer = (renderer: any) => {
		renderer.dispose();
		renderer = null;
	};

	/**
	 * Clean up and dispose of a material
	 */
	export const cleanMaterial = (material: any) => {
		material.dispose();

		for (const key of Object.keys(material)) {
			const value = material[key];
			if (value && typeof value === 'object' && 'minFilter' in value) {
				value.dispose();

				// Close GLTF bitmap textures
				value.source?.data?.close?.();
			}
		}
	};

	export const cleanScene = (scene: any) => {
		scene?.traverse((object: any) => {
			if (!object.isMesh) return;

			object.geometry.dispose();

			if (object.material.isMaterial) {
				cleanMaterial(object.material);
			} else {
				for (const material of object.material) {
					cleanMaterial(material);
				}
			}
		});
	};

	/**
	 * Clean up lights by removing them from their parent
	 */
	export const removeLights = (lights: any) => {
		for (const light of lights) {
			light.parent.remove(light);
		}
	};

	const springConfig = {
		stiffness: 30,
		damping: 20,
		mass: 2
	};

	let theme;
	let canvasRef: HTMLElement;
	let start = Date.now();
	let mouse: Vector2;
	let renderer: WebGLRenderer;
	let camera: PerspectiveCamera;
	let scene: Scene;
	let lights: HTMLElement;
	let uniforms: HTMLElement;
	let material: MeshPhongMaterial;
	let geometry: SphereBufferGeometry;
	let sphere: Mesh;
	let reduceMotion = false;
	const rotationX = useSpring(0, springConfig);
	const rotationY = useSpring(0, springConfig);

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
		renderer.outputEncoding = sRGBEncoding;

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

		geometry = new SphereBufferGeometry(32, 128, 128);
		sphere = new Mesh(geometry, material);
		sphere.position.z = 0;
		sphere.modifier = Math.random();
		scene.add(sphere);

		onDestroy(() => {
			cleanRenderer(renderer);
			cleanScene(scene);
		});

		// The other useEffect hooks need to be incorporated here, possibly within Svelte's reactive statements
	});

  onMount(() => {
    
  }
</script>

<Transition in={{ duration: 3000 }}>
	<canvas aria-hidden class={styles.canvas} bind:this={canvas} />
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
