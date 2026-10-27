import config from "../config";
import { trackEvent } from "../lib/track";
import { formatHour } from "../lib/hours";
import { Emoji, LogoMark, NewTab } from "./ui";

export default function Footer() {
  const year = new Date().getFullYear();
  const hoursLabel = `Ter a Dom, ${formatHour(config.hours.openTime)} às ${formatHour(
    config.hours.closeTime
  )}`;

  return (
    // pb extra no mobile para o conteúdo não ficar atrás da barra fixa (MobileCTA)
    <footer className="border-t border-gold/10 bg-oil-dark pb-28 pt-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <a href="/" aria-label="Bistrô 1994 — voltar ao início" className="flex items-center gap-2 text-gold">
            <LogoMark className="h-6 w-6 drop-shadow-[0_0_10px_rgba(245,168,0,0.4)]" />
            <span className="font-serif text-lg uppercase italic tracking-widest">bistrô 1994</span>
          </a>

          <nav aria-label="Links do rodapé">
            <ul className="flex flex-col items-center gap-1 text-sm text-cream/80 sm:flex-row sm:gap-6">
              <li>
                <a
                  href={config.orderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("pedir_takeat", { origem: "footer" })}
                  className="inline-flex min-h-11 items-center font-bold text-gold transition-colors hover:text-fire"
                >
                  Pedir pelo Takeat
                  <NewTab />
                </a>
              </li>
              <li>
                <a
                  href={config.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-gold"
                >
                  Instagram
                  <NewTab />
                </a>
              </li>
              <li>
                <a
                  href={config.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp", { origem: "footer" })}
                  className="inline-flex min-h-11 items-center transition-colors hover:text-gold"
                >
                  WhatsApp
                  <NewTab />
                </a>
              </li>
              <li className="inline-flex min-h-11 items-center text-cream/70">{hoursLabel}</li>
            </ul>
          </nav>

          <div className="text-center text-xs uppercase tracking-widest text-cream/70 md:text-right">
            <address className="not-italic">
              {config.address.street}, {config.city}
            </address>
            <span className="mt-1 block text-cream/60">
              © {year} {config.name} · Feito com <Emoji>🔥</Emoji>
              <span className="sr-only">carinho</span> em {config.city}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
