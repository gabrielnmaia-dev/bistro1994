import config from "../config";
import { trackEvent } from "../lib/track";

export default function MobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-oil/90 backdrop-blur-md border-t border-gold/20">
      <div className="flex justify-around px-4 py-3">
        <a
          href={config.orderLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("pedir_takeat", { origem: "mobile_cta" })
          }
          className="flex flex-col items-center gap-1 text-gold font-bold uppercase text-[10px] hover:text-fire transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          Pedir Takeat
        </a>
        <a
          href={config.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-cream font-bold uppercase text-[10px] hover:text-gold transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          Como chegar
        </a>
      </div>
    </div>
  );
}
