/**
 * Helpers de rolagem que respeitam o Lenis (smooth scroll) e
 * prefers-reduced-motion. Sem o Lenis, cai no scrollIntoView nativo.
 */
let lenisInstance = null;

export function setLenis(instance) {
  lenisInstance = instance;
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Rola até o elemento e, opcionalmente, move o foco para ele
 * (importante para quem navega por teclado/leitor de tela).
 */
export function scrollToElement(el, { offset = -112, focus = null } = {}) {
  if (!el) return;
  const reduce = prefersReducedMotion();

  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset, immediate: reduce });
  } else {
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  if (focus) focus.focus({ preventScroll: true });
}
