// themeStore.ts
import { writable } from 'svelte/store';
import { 
  getLocalStorage, 
  setLocalStorage, 
  removeLocalStorage, 
  matchMedia, 
  addEventListener, 
  removeEventListener, 
  getBodyClassList 
} from '$lib/utils/windowApi';

const STORAGE_KEY = 'theme';
const DARK_PREFERENCE = '(prefers-color-scheme: dark)';

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light'
};

const prefersDarkThemes = (): boolean => {
  const mediaQueryList = matchMedia(DARK_PREFERENCE);
  return mediaQueryList ? mediaQueryList.matches : false;
};

function applyTheme(theme: string) {
  const classList = getBodyClassList();
  if (classList) {
    if (theme === THEMES.DARK) {
      classList.remove(THEMES.LIGHT);
      classList.add(THEMES.DARK);
    } else {
      classList.remove(THEMES.DARK);
      classList.add(THEMES.LIGHT);
    }
  }
}

const initializeTheme = (): string => {
  const preferredTheme = prefersDarkThemes() ? THEMES.DARK : THEMES.LIGHT;
  const theme = getLocalStorage(STORAGE_KEY) ?? preferredTheme;
  applyTheme(theme);
  return theme;
};

export const themeStore = writable<string>(initializeTheme());

themeStore.subscribe(value => {
  applyTheme(value);
});

export function toggleTheme(): void {
    let newTheme = prefersDarkThemes() ? THEMES.LIGHT : THEMES.DARK;

    if (getLocalStorage(STORAGE_KEY)) {
      newTheme = getLocalStorage(STORAGE_KEY) === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    }
  
    setLocalStorage(STORAGE_KEY, newTheme);
    themeStore.set(newTheme);
}

export function handleThemeChange(): void {
  themeStore.set(initializeTheme());
}

export function addThemeChangeListener(): void {
  const mediaQueryList = matchMedia(DARK_PREFERENCE);
  if (mediaQueryList) {
    addEventListener(mediaQueryList.media, handleThemeChange);
  }
}

export function removeThemeChangeListener(): void {
  const mediaQueryList = matchMedia(DARK_PREFERENCE);
  if (mediaQueryList) {
    removeEventListener(mediaQueryList.media, handleThemeChange);
  }
}
