import config from "../config";
import { trackEvent } from "../lib/track";
import { BagIcon, MapPinIcon, NewTab } from "./ui";

/**
 * Barra de ações fixa no mobile (≤ 768px).
 * Hierarquia clara: "Pedir" é a ação primária (preenchida), "Como chegar" secundária.
 */
export default function MobileCTA() {
  return (
    <nav
      aria-label="Ações rápidas"
      className="pb-safe fixed inset-x-0 bottom-0 z-50 border-t border-gold/20 bg-oil/95 px-3 pt-3 backdrop-blur-md md:hidden"
    >
      <div className="grid grid-cols-2 gap-3">
        <a
          href={config.orderLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("pedir_takeat", { origem: "mobile_cta" })}
          className="inline-flex min-h-12 items-center justify-center gap-2 bg-gold px-3 text-sm font-bold uppercase tracking-wider text-oil-dark transition-colors active:bg-fire"
        >
          <BagIcon className="h-5 w-5" />
          Pedir agora
          <NewTab />
        </a>
        <a
          href={config.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("como_chegar", { origem: "mobile_cta" })}
          className="inline-flex min-h-12 items-center justify-center gap-2 border border-gold/40 px-3 text-sm font-bold uppercase tracking-wider text-gold transition-colors active:bg-gold/10"
        >
          <MapPinIcon className="h-5 w-5" />
          Como chegar
          <NewTab />
        </a>
      </div>
    </nav>
  );
}
