// windowApi.ts
const isBrowser = (): boolean => typeof window !== 'undefined';

export const getLocalStorage = (key: string): string | null => {
  return isBrowser() ? localStorage.getItem(key) : null;
}

export const setLocalStorage = (key: string, value: string): void => {
  if (isBrowser()) {
    localStorage.setItem(key, value);
  }
}

export const removeLocalStorage = (key: string): void => {
  if (isBrowser()) {
    localStorage.removeItem(key);
  }
}

export const matchMedia = (query: string): MediaQueryList | null => {
  return isBrowser() ? window.matchMedia(query) : null;
}

export const addEventListener = (type: string, listener: EventListenerOrEventListenerObject): void => {
  if (isBrowser()) {
    window.addEventListener(type, listener);
  }
}

export const removeEventListener = (type: string, listener: EventListenerOrEventListenerObject): void => {
  if (isBrowser()) {
    window.removeEventListener(type, listener);
  }
}

export const getBodyClassList = (): DOMTokenList | null => {
  return isBrowser() ? document.body.classList : null;
}
