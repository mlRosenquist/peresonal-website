import { goto } from "$app/navigation";

export default function autoHash(node: Element) {
    const observer = new IntersectionObserver(callback, {
        threshold: 1
    });

    observer.observe(node);

    function callback(entries: IntersectionObserverEntry[] ) {
        const entry = entries.find((entry) => entry.isIntersecting);

        if (entry) {
            const id = entry.target.id;
            goto(`#${id}`, { replaceState: true, noScroll: true });
        }
    }

    return { destroy: () => observer.disconnect() };
}