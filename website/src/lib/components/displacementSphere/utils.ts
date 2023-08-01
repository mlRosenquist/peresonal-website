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