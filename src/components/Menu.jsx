import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import config from "../config";

gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".menu-card", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-32 bg-oil relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display uppercase text-cream mb-3">
            {config.menu.title}
          </h2>
          <p className="text-xl font-serif italic text-fire max-w-2xl mx-auto">
            {config.menu.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {config.menu.categories.map((cat) => (
            <div key={cat.id} className="flex flex-col gap-6">
              <h3 className="text-2xl font-serif italic text-gold mb-2 border-b border-gold/20 pb-2 uppercase tracking-widest">
                {cat.label}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {cat.items.map((item, ii) => (
                  <a
                    key={`${cat.id}-${ii}`}
                    href={config.orderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="menu-card group relative flex flex-col p-5 bg-oil-dark border border-gold/10 rounded-2xl overflow-hidden hover:border-gold/40 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="aspect-[4/3] w-full mb-4 rounded-xl overflow-hidden bg-gold/5 relative">
                      <img
                        src={item.src}
                        alt={item.nome}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/photos/burger-gourmet.webp";
                        }}
                      />
                      {item.preco && (
                        <div className="absolute top-2 right-2 bg-oil-dark/90 backdrop-blur-md border border-gold/30 text-gold text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                          {item.preco}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-lg font-display uppercase text-cream group-hover:text-gold transition-colors mb-1">
                          {item.nome}
                        </h4>
                        <p className="text-cream/70 text-xs sm:text-sm leading-relaxed mb-3">
                          {item.descricao}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gold/80 uppercase tracking-wider group-hover:text-fire transition-colors mt-auto">
                        Pedir no Takeat
                        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href={config.orderLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-fire text-cream font-bold uppercase tracking-widest text-sm md:text-base hover:bg-gold hover:text-oil-dark transition-all duration-300 shadow-[0_0_25px_rgba(255,138,0,0.5)]"
          >
            {config.menu.orderCta}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
