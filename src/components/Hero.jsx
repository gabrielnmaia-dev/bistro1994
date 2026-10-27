import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trackEvent } from "../lib/track";
import { useBusinessHours } from "../lib/useBusinessHours";
import { prefersReducedMotion } from "../lib/scroll";
import { ArrowRightIcon, LogoMark, MapPinIcon, NewTab, OpenStatus } from "./ui";
import config from "../config";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef(null);
  const hours = useBusinessHours();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-layer", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const [titleBefore, titleAfter = ""] = config.hero.title.split(
    config.hero.titleHighlight
  );

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex min-h-[85svh] flex-col overflow-hidden md:min-h-[90vh]"
    >
      {/* Fundo (decorativo) — candidato a LCP: prioridade alta */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src="/photos/hamburguer-close.webp"
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-oil-dark/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(11,43,38,0.9)_80%)]" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex w-full flex-1 flex-col justify-center px-4 pb-16 pt-10 sm:px-8 md:pt-16">
        {/* Logo */}
        <div className="hero-layer mb-10 flex justify-center md:mb-12">
          <a
            href="/"
            aria-label="Bistrô 1994 — página inicial"
            className="inline-flex items-center gap-2 text-gold transition-transform duration-300 motion-safe:hover:scale-105"
          >
            <LogoMark className="h-8 w-8 drop-shadow-[0_0_12px_rgba(245,168,0,0.6)]" />
            <span className="font-serif text-2xl uppercase italic tracking-wider">
              bistrô 1994
            </span>
          </a>
        </div>

        <div className="relative mx-auto max-w-6xl space-y-6 text-center">
          <div className="hero-layer">
            <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold shadow-[0_0_15px_rgba(245,168,0,0.3)]">
              {config.hero.badge}
            </span>
          </div>

          <h1
            id="hero-title"
            className="hero-layer text-balance font-display text-5xl uppercase leading-[0.95] text-cream drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] sm:text-6xl md:text-8xl lg:text-[9rem]"
          >
            {titleBefore}
            <span className="italic text-fire drop-shadow-[0_2px_4px_rgba(255,138,0,0.4)]">
              {config.hero.titleHighlight}
            </span>
            {titleAfter}
          </h1>

          <p className="hero-layer text-balance font-serif text-2xl italic text-fire drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] md:text-4xl">
            {config.hero.subtitle}
          </p>

          {/* Status de funcionamento — informação-chave antes do clique */}
          <div className="hero-layer flex justify-center pt-2">
            <OpenStatus hours={hours} />
          </div>

          <div className="hero-layer flex flex-col items-stretch justify-center gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={config.hero.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("pedir_takeat", { origem: "hero_principal" })
              }
              className="group inline-flex min-h-12 items-center justify-center gap-2 bg-gold px-8 py-4 text-sm font-bold uppercase tracking-widest text-oil-dark shadow-[0_0_20px_rgba(245,168,0,0.4)] transition-colors duration-300 hover:bg-fire md:text-base"
            >
              {config.hero.primaryCta.label}
              <ArrowRightIcon className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1" />
              <NewTab />
            </a>
            <a
              href={config.hero.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("como_chegar", { origem: "hero_secundario" })
              }
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-gold/40 px-8 py-4 text-sm font-bold uppercase tracking-widest text-gold backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:bg-gold/10 md:text-base"
            >
              <MapPinIcon className="h-4 w-4" />
              {config.hero.secondaryCta.label}
              <NewTab />
            </a>
          </div>
        </div>
      </div>

      {/* Dica de scroll */}
      <p className="hero-layer relative z-10 pb-8 text-center text-xs uppercase tracking-[0.3em] text-cream/60">
        {config.hero.scrollHint}{" "}
        <span aria-hidden="true" className="inline-block motion-safe:animate-bounce">
          ↓
        </span>
      </p>

      {/* Cantos decorativos */}
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-24 w-24 border-r-2 border-t-2 border-gold/20" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 border-b-2 border-l-2 border-gold/20" />
    </section>
  );
}
