import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import config from "../config";
import { prefersReducedMotion } from "../lib/scroll";
import { NewTab } from "./ui";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const ref = useRef(null);
  const starCount = config.testimonials.stars.length;

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          // Anima uma única vez: os cards não somem ao rolar de volta
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="depoimentos"
      aria-labelledby="depoimentos-title"
      className="relative overflow-hidden bg-oil-dark py-20 md:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 border border-gold/10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center md:px-8">
        <h2
          id="depoimentos-title"
          className="mb-3 text-balance font-display text-4xl uppercase text-cream md:text-6xl"
        >
          {config.testimonials.title}
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-balance font-serif text-xl italic text-fire">
          {config.testimonials.subtitle}
        </p>

        <ul className="grid grid-cols-1 gap-6 text-left sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {config.testimonials.items.map((t) => (
            <li key={t.name} className="testimonial-card">
              <figure className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gold/20 bg-oil/80 p-6 transition-colors duration-300 hover:border-gold/50 md:p-8">
                {/* Prato ao fundo (decorativo) + véu para manter o contraste do texto */}
                <div aria-hidden="true" className="absolute inset-0 z-0">
                  <img
                    src={t.src}
                    alt=""
                    className="h-full w-full object-cover opacity-30 transition-opacity duration-500 group-hover:opacity-45"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-oil-dark via-oil-dark/80 to-oil-dark/40" />
                </div>

                <div
                  role="img"
                  aria-label={`Avaliação: ${starCount} de 5 estrelas`}
                  className="relative z-10 mb-4 flex gap-1 text-xl text-gold"
                >
                  {config.testimonials.stars.split("").map((star, s) => (
                    <span key={s} aria-hidden="true">
                      {star}
                    </span>
                  ))}
                </div>

                <blockquote className="relative z-10 mb-6 flex-1 font-serif text-lg italic leading-relaxed text-cream md:text-xl">
                  <p>“{t.text}”</p>
                </blockquote>

                <figcaption className="relative z-10 text-sm font-bold uppercase tracking-widest text-gold">
                  {t.name}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <a
          href={config.instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex min-h-11 items-center gap-2 px-2 text-xs font-bold uppercase tracking-widest text-gold underline-offset-8 transition-colors hover:text-fire hover:underline md:text-sm"
        >
          {config.testimonials.instagramCta} <span aria-hidden="true">→</span>
          <NewTab />
        </a>
      </div>
    </section>
  );
}
