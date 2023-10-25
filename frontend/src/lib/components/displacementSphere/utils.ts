import { THEMES } from "$lib/stores/themeStore";
import { DirectionalLight, AmbientLight } from "three";

export const rgbToThreeColor = (rgb: any) =>
		rgb?.split(' ').map((value: any) => Number(value) / 255) || [];

	/**
	 * Clean up and dispose of a renderer
	 */
	export const cleanRenderer = (renderer: any) => {
		if(!renderer) return;

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

	export const getDirectionLight = (theme: string) => {
		const dirLight = new DirectionalLight(0xffffff, 0.6);

		dirLight.position.z = 200;
		dirLight.position.x = 100;
		dirLight.position.y = 100;
		return dirLight;
	};

	export const getAmbientLight = (theme: string) => {
		return new AmbientLight(0xffffff, theme == THEMES.LIGHT ? 0.8 : 0.1);
	};

	/**
	 * Clean up lights by removing them from their parent
	 */
	export const removeLights = (lights: any) => {
		if(!lights) return;

		for (const light of lights) {
			light.parent.remove(light);
		}
	};