import { formatHour, DAY_LABELS } from "../lib/hours";
import { useBusinessHours } from "../lib/useBusinessHours";
import { trackEvent } from "../lib/track";
import { ChatIcon, MapPinIcon, NewTab, OpenStatus, PhoneIcon } from "./ui";
import config, { WHATSAPP_NUMBER } from "../config";

/* Ordem de exibição começando na segunda (padrão brasileiro de agenda) */
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];

export default function Location() {
  const hours = useBusinessHours();
  const telHref = `tel:+${WHATSAPP_NUMBER}`;
  const routeHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    config.address.full
  )}`;

  return (
    <section
      id="localizacao"
      aria-labelledby="localizacao-title"
      className="relative overflow-hidden bg-oil py-20 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 text-center md:mb-16">
          <h2
            id="localizacao-title"
            className="mb-3 font-display text-4xl uppercase text-cream md:text-6xl"
          >
            {config.location.title || "ONDE ESTAMOS"}
          </h2>
          <p className="mx-auto max-w-2xl text-balance font-serif text-xl italic text-fire">
            A gente te espera aqui na {config.address.street} — {config.city}.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Mapa */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-gold/10 bg-oil-dark shadow-2xl sm:aspect-video lg:aspect-auto lg:min-h-[28rem]">
            <iframe
              title="Mapa: localização do Bistrô1994 no Google Maps"
              src={config.location.mapsEmbed}
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Dados */}
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-gold/10 bg-oil-dark p-6">
              <h3 className="mb-4 font-serif text-xl uppercase italic text-fire">
                Onde encontrar
              </h3>
              <address className="space-y-4 not-italic">
                <p className="text-lg text-cream">
                  <span className="block text-xs uppercase tracking-widest text-gold/80">
                    Endereço
                  </span>
                  <a
                    href={config.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
                  >
                    {config.address.full}
                    <NewTab />
                  </a>
                </p>
                <div className="text-lg text-cream">
                  <span className="block text-xs uppercase tracking-widest text-gold/80">
                    Telefone / WhatsApp
                  </span>
                  <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <a
                      href={telHref}
                      className="inline-flex min-h-11 items-center gap-2 text-cream underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
                    >
                      <PhoneIcon className="h-4 w-4 text-gold" />
                      {config.phone.display}
                    </a>
                    <a
                      href={config.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("whatsapp", { origem: "localizacao" })
                      }
                      className="inline-flex min-h-11 items-center gap-2 text-sm font-bold uppercase tracking-widest text-gold transition-colors hover:text-fire"
                    >
                      <ChatIcon className="h-4 w-4" />
                      WhatsApp
                      <NewTab />
                    </a>
                  </div>
                </div>
              </address>
            </div>

            <div className="rounded-3xl border border-gold/10 bg-oil-dark p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-serif text-xl uppercase italic text-fire">
                  Funcionamento
                </h3>
                <OpenStatus hours={hours} />
              </div>
              <dl className="divide-y divide-gold/10">
                {WEEK_ORDER.map((index) => {
                  const day = DAY_LABELS[index];
                  const isOpenDay = hours.openDays.includes(index);
                  const isToday = index === hours.day;
                  return (
                    <div
                      key={day}
                      className={`flex items-center justify-between py-2 text-sm ${
                        isToday ? "font-bold text-cream" : "text-cream/75"
                      }`}
                    >
                      <dt>
                        {day}
                        {isToday && (
                          <span className="ml-2 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] uppercase tracking-widest text-gold">
                            Hoje
                          </span>
                        )}
                      </dt>
                      <dd className={isToday ? "tabular-nums text-gold" : "tabular-nums"}>
                        {isOpenDay
                          ? `${formatHour(hours.openTime)} – ${formatHour(hours.closeTime)}`
                          : "Fechado"}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={routeHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("como_chegar", { origem: "localizacao_rota" })
                }
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 bg-gold px-6 py-3 text-center text-sm font-bold uppercase tracking-widest text-oil-dark transition-colors hover:bg-fire"
              >
                <MapPinIcon className="h-4 w-4" />
                Traçar rota
                <NewTab />
              </a>
              <a
                href={config.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 border border-gold/40 px-6 py-3 text-center text-sm font-bold uppercase tracking-widest text-gold backdrop-blur-sm transition-colors hover:border-gold hover:bg-gold/10"
              >
                Abrir no Google Maps
                <NewTab />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
