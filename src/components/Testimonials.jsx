import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import config from "../config";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(ref.current.querySelectorAll(".testimonial-card"), {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-32 bg-oil-dark relative overflow-hidden">
      {/* Decorative border */}
      <div className="absolute inset-0 border border-gold/10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-display uppercase text-cream mb-3">
          {config.testimonials.title}
        </h2>
        <p className="text-xl font-serif italic text-fire mb-12 max-w-2xl mx-auto">
          {config.testimonials.subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {config.testimonials.items.map((t, i) => (
            <div key={i} className="testimonial-card relative group p-6 md:p-8 bg-oil/80 border border-gold/20 rounded-3xl backdrop-blur-sm hover:border-gold/50 transition-all duration-300">
              {/* Prato ao fundo */}
              <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                <img
                  src={t.src}
                  alt={`Prato do depoimento de ${t.name}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Estrelas */}
              <div className="relative z-10 mb-4 flex justify-center gap-1 text-gold">
                {config.testimonials.stars.split("").map((star, s) => (
                  <span key={s} className="text-2xl">
                    {star}
                  </span>
                ))}
              </div>

              <blockquote className="relative z-10 mb-6 text-cream/90 font-serif italic text-lg md:text-xl leading-relaxed">
                “{t.text}”
              </blockquote>

              <cite className="relative z-10 block text-sm font-bold tracking-widest text-gold uppercase">
                {t.name}
              </cite>
            </div>
          ))}
        </div>

        <a
          href={config.INSTAGRAM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-block text-xs md:text-sm font-bold text-gold uppercase tracking-widest hover:text-fire transition-colors"
        >
          {config.testimonials.instagramCta} →
        </a>
      </div>
    </section>
  );
}
