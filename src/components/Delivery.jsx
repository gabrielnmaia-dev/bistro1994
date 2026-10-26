import config from "../config";

export default function Delivery() {
  return (
    <section className="py-20 md:py-32 bg-oil-dark relative overflow-hidden">
      <div className="absolute inset-0 border-t border-b border-gold/10 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Delivery card */}
          <div className="group relative p-8 md:p-12 rounded-3xl border border-gold/20 bg-oil/60 backdrop-blur-sm hover:border-gold/50 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-all duration-500" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-display uppercase text-cream mb-3">{config.delivery.title}</h3>
              <p className="text-cream/80 text-lg leading-relaxed mb-8">{config.delivery.description}</p>
              <a
                href={config.orderLink}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-oil-dark font-bold uppercase tracking-widest text-sm hover:bg-fire transition-colors duration-300 shadow-[0_0_20px_rgba(245,168,0,0.4)]"
              >
                Pedir pelo delivery
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>

          {/* Reserva card */}
          <div className="group relative p-8 md:p-12 rounded-3xl border border-fire/20 bg-oil/60 backdrop-blur-sm hover:border-fire/50 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-fire/10 rounded-full blur-2xl group-hover:bg-fire/20 transition-all duration-500" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-display uppercase text-cream mb-3">{config.reservation.title}</h3>
              <p className="text-cream/80 text-lg leading-relaxed mb-8">{config.reservation.description}</p>
              <a
                href={config.whatsappLink}
                className="inline-flex items-center gap-2 px-8 py-3 border border-gold/40 text-gold font-bold uppercase tracking-widest text-sm hover:bg-gold/10 transition-colors duration-300 backdrop-blur-sm"
              >
                Reservar pelo WhatsApp
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
