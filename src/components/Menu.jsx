import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import config from "../config";

gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
  const ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(ref.current.querySelectorAll(".menu-card"), {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
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
          {config.menu.categories.map((cat, ci) => (
            <div key={cat.id} className="flex flex-col gap-6">
              <h3 className="text-2xl font-serif italic text-gold mb-2 border-b border-gold/20 pb-2 uppercase tracking-widest">
                {cat.label}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {cat.items.map((item, ii) => (
                  <div
                    key={`${cat.id}-${ii}`}
                    className="menu-card group relative p-5 bg-oil-dark border border-gold/10 rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-300"
                  >
                    <div className="aspect-[4/3] w-full mb-4 rounded-xl overflow-hidden bg-gold/5">
                      <img
                        src={item.src}
                        alt={item.nome}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <h4 className="text-xl font-display uppercase text-cream mb-1">
                      {item.nome}
                    </h4>
                    <p className="text-cream/70 text-sm leading-relaxed">
                      {item.descricao}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href={config.ORDER_LINK}
            className="inline-flex items-center gap-2 px-10 py-4 bg-fire text-cream font-bold uppercase tracking-widest text-sm md:text-base hover:bg-gold transition-colors duration-300 shadow-[0_0_25px_rgba(255,138,0,0.5)]"
          >
            {config.menu.orderCta}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
