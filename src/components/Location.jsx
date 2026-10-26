import { useRef, useEffect, useState } from "react";
import { getBusinessHours, formatHour, DAY_LABELS } from "../lib/hours";
import config from "../config";

export default function Location() {
  const [hours, setHours] = useState(null);

  useEffect(() => {
    setHours(getBusinessHours());
  }, []);

  const today = hours ? DAY_LABELS[new Date().getDay()] : "";

  return (
    <section className="py-20 md:py-32 bg-oil relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display uppercase text-cream mb-3">
            BOA VISTA?
          </h2>
          <p className="text-xl font-serif italic text-fire max-w-2xl mx-auto">
            A gente te espera aqui em Matureia - PB.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* Mapa */}
          <div className="relative rounded-3xl overflow-hidden border border-gold/10 shadow-2xl aspect-video md:aspect-[16/9]">
            <iframe
              title="Localização do Bistrô1994 no Google Maps"
              src={config.location.mapsEmbed}
              allowFullScreen=""
              loading="lazy"
              className="w-full h-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="px-6 py-3 bg-gold text-oil-dark font-bold uppercase tracking-widest text-sm rounded-none hover:bg-fire transition-colors"
                onClick={() => window.open(config.MAPS_LINK, "_blank")}
              >
                Abrir no Google Maps
              </button>
            </div>
          </div>

          {/* Dados */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-oil-dark border border-gold/10">
              <h3 className="text-xl font-serif italic text-fire mb-4 uppercase">onde encontrar</h3>
              <p className="text-cream text-lg mb-2">
                <span className="block text-gold/60 text-xs uppercase tracking-widest">endereço</span>
                <a
                  href={config.MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream hover:text-gold transition-colors underline underline-offset-4"
                >
                  {config.address.full}
                </a>
              </p>
              <p className="text-cream text-lg mb-2">
                <span className="block text-gold/60 text-xs uppercase tracking-widest">telefone / whatsapp</span>
                <a
                  href={config.whatsappLink}
                  className="text-cream hover:text-gold transition-colors underline underline-offset-4"
                >
                  {config.phone.display}
                </a>
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-oil-dark border border-gold/10">
              <h3 className="text-xl font-serif italic text-fire mb-4 uppercase">funcionamento</h3>
              <div className="space-y-2">
                {DAY_LABELS.map((day) => {
                  const isOpen = hours?.openDays.includes(new Date(`${day} 2024`).getDay());
                  return (
                    <div key={day} className="flex justify-between items-center text-sm text-cream/80">
                      <span className={day === today ? "font-bold text-cream" : "text-cream/60"}>
                        {day}
                      </span>
                      <span className={day === today ? "font-mono text-gold" : "text-cream/50"}>
                        {isOpen ? `${formatHour(hours.openTime)} – ${formatHour(hours.closeTime)}` : "Fechado"}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-gold/60 uppercase tracking-widest font-bold">
                {hours?.isOpen ? "Aberto agora" : "Fechado agora"}
              </p>
            </div>

            <div className="flex gap-3">
              <a
                href={config.MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 bg-gold text-oil-dark font-bold uppercase tracking-widest text-sm rounded-none hover:bg-fire transition-colors"
              >
                Abrir no Google Maps
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(config.address.full)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 border border-gold/40 text-gold font-bold uppercase tracking-widest text-sm rounded-none hover:bg-gold/10 transition-colors backdrop-blur-sm"
              >
                Traçar rota
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
