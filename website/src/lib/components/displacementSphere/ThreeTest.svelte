<script lang="ts">
	import { onMount } from 'svelte';
	import { BoxGeometry, Color, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
	import { rgbToThreeColor } from './utils';

	let canvasRef: HTMLElement;

	let renderer: WebGLRenderer;
	let camera: PerspectiveCamera;
	let scene: Scene;

	let material: MeshPhongMaterial;
	let geometry: BoxGeometry;
	let cube: Mesh;


	onMount(() => {
		scene = new Scene();
		camera = new PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);

		renderer = new WebGLRenderer(
			 {canvas: canvasRef}
		);
		renderer.setSize(window.innerWidth, window.innerHeight);
		
		
		geometry = new BoxGeometry(1, 1, 1);
		material = new MeshPhongMaterial({ color: 0x00ff00 });
		cube = new Mesh(geometry, material);
		scene.add(cube);
		scene.background = new Color(... rgbToThreeColor("17 17 17"))
		camera.position.z = 5;

		animate();
	});

	
	function animate() {
		requestAnimationFrame(animate);

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		console.log({x: cube.rotation.x, y: cube.rotation.y});

		renderer.render(scene, camera);
	}

	
</script>

<canvas aria-hidden data-visible="true" class="canvas" bind:this={canvasRef} />

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
