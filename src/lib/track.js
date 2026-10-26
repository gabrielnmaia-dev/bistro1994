/**
 * Dispara um evento de conversão de forma agnóstica de provedor.
 * Funciona com Google Tag Manager (dataLayer) e com gtag, se existirem.
 *
 * Exemplo:
 *   trackEvent("pedir_takeat", { origem: "cardapio_cta_final" });
 */
export function trackEvent(event, params = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });

  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }

  if (import.meta.env.DEV) {
    console.debug("[trackEvent]", event, params);
  }
}

export default trackEvent;
