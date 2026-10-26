import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getBusinessHours } from "../lib/hours";
import config from "../config";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const { isOpen: open } = getBusinessHours();
    setIsOpen(open);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-layer", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-[70vh] md:min-h-[90vh] overflow-hidden">
      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/photos/hamburguer-close.webp"
          alt="Fundo do hero - hamburguer artesanal"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-oil-dark/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(11,43,38,0.9)_80%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-4 md:px-8 sm:px-12 pt-20 pb-12 md:pt-32">
        {/* Logo */}
        <div className="flex justify-center mb-12 hero-layer">
          <a href="/" className="inline-flex items-center gap-2 text-gold transition-transform hover:scale-105 duration-300">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              className="w-8 h-8 drop-shadow-[0_0_12px_rgba(245,168,0,0.6)]"
            >
              <path d="M18 2C9.4 2 2 9.4 2 18s7.4 16 16 16 16-7.4 16-16S26.6 2 18 2ZM18 32c-7.73 0-14-6.27-14-14S10.27 4 18 4s14 6.27 14 14-6.27 14-14 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 18h12c0 2.2-1.8 4-4 4H16c-2.2 0-4-1.8-4-4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-2xl font-serif italic tracking-wider uppercase">bistrô 1994</span>
          </a>
        </div>

        {/* Main text */}
        <div className="relative max-w-full text-center space-y-6">
          <div className="hero-layer">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(245,168,0,0.3)] animate-pulse">
              {config.hero.badge}
            </span>
          </div>

          <h1 className="hero-layer text-5xl md:text-8xl lg:text-[10rem] font-display uppercase text-cream leading-tight mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
            {(() => {
              const parts = config.hero.title.split(config.hero.titleHighlight);
              return (
                <>
                  {parts[0]}
                  <span className="text-fire italic drop-shadow-[0_2px_4px_rgba(255,138,0,0.4)]">
                    {config.hero.titleHighlight}
                  </span>
                  {parts[1] || ""}
                </>
              );
            })()}
          </h1>
          <p className="hero-layer text-2xl md:text-4xl font-serif italic text-fire drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            {config.hero.subtitle}
          </p>

          <div className="hero-layer flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <a
              href={config.hero.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-oil-dark font-bold uppercase tracking-widest text-sm md:text-base rounded-none hover:bg-fire transition-colors duration-300 shadow-[0_0_20px_rgba(245,168,0,0.4)]"
            >
              {config.hero.primaryCta.label}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a
              href={config.hero.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gold/40 text-gold font-bold uppercase tracking-widest text-sm md:text-base rounded-none hover:bg-gold/10 transition-colors duration-300 backdrop-blur-sm"
            >
              {config.hero.secondaryCta.label}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </a>
          </div>

          {/* Status */}
          <div className="hero-layer mt-10 flex items-center justify-center gap-3 animate-bounce">
            <div className={`w-3 h-3 rounded-full ${isOpen ? "bg-gold" : "bg-fire"} shadow-[0_0_12px_${isOpen ? "rgba(245,168,0,0.6)" : "rgba(255,138,0,0.6)"}]`} />
            <span className={`text-xs uppercase tracking-widest font-bold ${isOpen ? "text-gold" : "text-fire"} opacity-90`}>
              {isOpen ? config.hours.openLabel : config.hours.closedLabel}
            </span>
            <span className={`text-xs uppercase tracking-widest font-bold text-gold/70`}>
              até {config.hours.closeTime}
            </span>
          </div>

          <p className="hero-layer mt-8 text-gold/50 text-sm tracking-[0.3em] uppercase">
            {config.hero.scrollHint} ↓
          </p>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-gold/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-gold/20 pointer-events-none" />
    </section>
  );
}
