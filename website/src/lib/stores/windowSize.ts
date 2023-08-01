import { writable } from 'svelte/store';

// Define a type for the window size
export interface WindowSize {
  width: number;
  height: number;
}

// Create a writable store with default values
const windowSizeStore = writable<WindowSize>({ width: 0, height: 0 });

if (typeof window !== 'undefined') {
  // Update the store whenever the window size changes
  window.addEventListener('resize', () => {
    windowSizeStore.set({ width: window.innerWidth, height: window.innerHeight });
  });

  // Set the initial window size
  windowSizeStore.set({ width: window.innerWidth, height: window.innerHeight });
}

export default windowSizeStore;