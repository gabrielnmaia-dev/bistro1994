import config from "../config";
import { trackEvent } from "../lib/track";
import { ArrowRightIcon, ChatIcon, NewTab } from "./ui";

export default function Delivery() {
  return (
    <section
      id="delivery"
      aria-labelledby="delivery-title"
      className="relative overflow-hidden bg-oil-dark py-20 md:py-32"
    >
      <h2 id="delivery-title" className="sr-only">
        Delivery e reservas
      </h2>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 border-b border-t border-gold/10" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8">
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-12">
          {/* Delivery card */}
          <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-gold/20 bg-oil/60 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-gold/50 md:p-12">
            <div aria-hidden="true" className="absolute right-0 top-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-gold/10 blur-2xl transition-colors duration-500 group-hover:bg-gold/20" />
            <div className="relative z-10 flex flex-1 flex-col">
              <h3 className="mb-3 font-display text-3xl uppercase text-cream md:text-4xl">
                {config.delivery.title}
              </h3>
              <p className="mb-8 text-lg leading-relaxed text-cream/80">
                {config.delivery.description}
              </p>
              <a
                href={config.orderLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("pedir_takeat", { origem: "delivery" })
                }
                className="group/cta mt-auto inline-flex min-h-12 items-center justify-center gap-2 self-start bg-gold px-8 py-3 text-sm font-bold uppercase tracking-widest text-oil-dark shadow-[0_0_20px_rgba(245,168,0,0.4)] transition-colors duration-300 hover:bg-fire"
              >
                Pedir pelo delivery
                <ArrowRightIcon className="h-4 w-4 transition-transform motion-safe:group-hover/cta:translate-x-1" />
                <NewTab />
              </a>
            </div>
          </div>

          {/* Reserva card */}
          <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-fire/20 bg-oil/60 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-fire/50 md:p-12">
            <div aria-hidden="true" className="absolute right-0 top-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-fire/10 blur-2xl transition-colors duration-500 group-hover:bg-fire/20" />
            <div className="relative z-10 flex flex-1 flex-col">
              <h3 className="mb-3 font-display text-3xl uppercase text-cream md:text-4xl">
                {config.reservation.title}
              </h3>
              <p className="mb-8 text-lg leading-relaxed text-cream/80">
                {config.reservation.description}
              </p>
              <a
                href={config.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("whatsapp", { origem: "reserva" })
                }
                className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 self-start border border-gold/40 px-8 py-3 text-sm font-bold uppercase tracking-widest text-gold backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:bg-gold/10"
              >
                <ChatIcon className="h-4 w-4" />
                Reservar pelo WhatsApp
                <NewTab />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
