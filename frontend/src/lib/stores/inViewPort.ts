import { readable } from 'svelte/store';

function inViewport<T extends HTMLElement>(
  element: T | null,
  unobserveOnIntersect: boolean,
  options: IntersectionObserverInit = {},
  shouldObserve = true
) {
  const intersect = false;
  let isUnobserved = false;

  const store = readable<boolean>(intersect, (set) => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const { isIntersecting, target } = entry;

        set(isIntersecting);

        if (isIntersecting && unobserveOnIntersect) {
          observer.unobserve(target);
          isUnobserved = true;
        }
      },
      options
    );

    if (!isUnobserved && shouldObserve) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  });

  return store;
}

export default inViewport;