import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import config from "../config";
import { trackEvent } from "../lib/track";
import { Emoji, NewTab } from "./ui";
import pizzaData from "../data/pizza.json";

gsap.registerPlugin(ScrollTrigger);

/**
 * PizzaAssembly — seção pinned (um único pin) com duas montagens por fatias:
 *   0–45%   → pizza de calabresa: as 8 fatias convergem e fecham a pizza
 *   45–58%  → calabresa sai, entra a sobremesa
 *   58–97%  → pizza de chocolate com confete: as 8 fatias convergem
 *
 * Os dados (fatias) vêm de src/data/pizza.json, importado no bundle.
 * Não usa fetch: assim a ordem de criação dos ScrollTriggers é sempre a do
 * DOM (hambúrguer antes da pizza) e uma seção nunca cobre a outra.
 */

const PIZZAS = [
  {
    key: "calabresa",
    data: pizzaData["pizza-calabresa"],
    label: "Calabresa",
  },
  {
    key: "chocolate",
    data: pizzaData["pizza-chocolate"],
    label: "Chocolate com confete",
  },
];

const PHASE_TEXTS = {
  calabresa: {
    kicker: "Do forno pra mesa",
    lead: "Pizza de",
    highlight: "calabresa",
    sub: "Quente, suculenta e preparada na hora.",
  },
  chocolate: {
    kicker: "Pra fechar com doce",
    lead: "E de sobremesa…",
    highlight: "chocolate",
    sub: "Pizza doce de chocolate com confete.",
  },
};

const PHASE_SWITCH = 0.54;

export default function PizzaAssembly() {
  const containerRef = useRef(null);
  const stageRefs = useRef({});
  const sliceRefs = useRef({});
  const [progress, setProgress] = useState(0);

  /* Pré-carrega as 16 fatias */
  useEffect(() => {
    PIZZAS.forEach(({ data }) => {
      (data?.fatias || []).forEach((f) => {
        const img = new Image();
        img.src = `/pizza/${f.file}`;
      });
    });
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, reduce } = context.conditions;
        const isMobile = !isDesktop;

        const sliceEls = (key) =>
          (sliceRefs.current[key] || []).filter(Boolean);

        /* ---------- prefers-reduced-motion: calabresa montada, sem pin ---------- */
        if (reduce) {
          sliceEls("calabresa").forEach((el) =>
            gsap.set(el, { x: 0, y: 0, rotation: 0, opacity: 1 })
          );
          gsap.set(stageRefs.current.chocolate, { opacity: 0 });
          setProgress(0.3);
          return;
        }

        const distance = () => (isMobile ? 260 : 520);

        /* Estado inicial: tudo desmontado/invisível */
        PIZZAS.forEach(({ key }) => {
          gsap.set(sliceEls(key), { opacity: 0 });
        });
        gsap.set(stageRefs.current.calabresa, { opacity: 1, scale: 1 });
        gsap.set(stageRefs.current.chocolate, { opacity: 1, scale: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: isMobile ? "+=380%" : "+=480%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 1,
            invalidateOnRefresh: true,
            // vem depois do hambúrguer no DOM
            refreshPriority: 1,
            onUpdate: (self) => {
              setProgress(Math.round(self.progress * 100) / 100);
            },
          },
        });

        /* Monta uma pizza: as fatias convergem com stagger */
        const assemble = (key, startAt, stagger, dur) => {
          const slices = PIZZAS.find((p) => p.key === key).data.fatias;
          slices.forEach((slice, i) => {
            const el = sliceRefs.current[key]?.[i];
            if (!el) return;
            tl.fromTo(
              el,
              {
                x: () => slice.saidaX * distance(),
                y: () => slice.saidaY * distance(),
                opacity: 0,
                rotation: i % 2 === 0 ? -22 : 22,
              },
              {
                x: 0,
                y: 0,
                opacity: 1,
                rotation: 0,
                duration: dur,
                ease: "power2.out",
              },
              startAt + i * stagger
            );
          });
          return startAt + (slices.length - 1) * stagger + dur;
        };

        /* ---------- Calabresa ---------- */
        const calabresaEnd = assemble("calabresa", 0.02, 0.028, 0.15);
        tl.to(
          stageRefs.current.calabresa,
          { scale: 1.04, duration: 0.1, ease: "power1.out" },
          calabresaEnd
        );

        /* ---------- Transição calabresa → chocolate ---------- */
        tl.to(
          stageRefs.current.calabresa,
          { opacity: 0, scale: 0.9, duration: 0.1, ease: "power2.in" },
          0.47
        );

        /* ---------- Chocolate ---------- */
        assemble("chocolate", 0.58, 0.026, 0.14);
        tl.to(
          stageRefs.current.chocolate,
          { scale: 1.04, duration: 0.07, ease: "power1.out" },
          0.93
        );
      }
    );

    return () => mm.revert();
  }, []);

  const phase = progress < PHASE_SWITCH ? "calabresa" : "chocolate";
  const text = PHASE_TEXTS[phase];
  const showCta = progress >= 0.3;

  return (
    <section
      ref={containerRef}
      id="pizzas"
      className="relative h-[100svh] overflow-hidden bg-oil"
      aria-label="Pizzas artesanais"
    >
      <h2 className="sr-only">
        Pizzas do Bistrô1994: calabresa e, de sobremesa, pizza de chocolate com
        confete
      </h2>

      {/* Brilho de fundo */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[42%] h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fire/10 blur-[120px]" />

      {/* Palco das pizzas (as duas ficam sobrepostas; uma de cada vez) */}
      <div className="absolute inset-x-0 top-0 bottom-44 z-10 flex items-center justify-center px-4 md:bottom-36">
        {PIZZAS.map(({ key, data, label }) => {
          const ratio = data.width / data.height;
          return (
            <div
              key={key}
              ref={(el) => {
                stageRefs.current[key] = el;
              }}
              className="absolute will-change-transform"
              style={{
                aspectRatio: `${data.width} / ${data.height}`,
                height: `min(48svh, calc(88vw / ${ratio.toFixed(3)}))`,
              }}
              aria-hidden="true"
            >
              {data.fatias.map((slice, i) => (
                <img
                  key={slice.file}
                  ref={(el) => {
                    if (!sliceRefs.current[key]) sliceRefs.current[key] = [];
                    sliceRefs.current[key][i] = el;
                  }}
                  src={`/pizza/${slice.file}`}
                  alt=""
                  className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain will-change-transform"
                  draggable={false}
                  decoding="async"
                />
              ))}
            </div>
          );
        })}
      </div>

      {/* Texto — embaixo, nunca por cima da pizza */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-40 z-20 px-6 text-center md:bottom-24">
        <div key={phase} className="motion-safe:animate-fade-up">
          <p className="mb-2 text-[11px] uppercase tracking-[0.35em] text-gold/70">
            {text.kicker}
          </p>
          <p className="font-display text-4xl uppercase leading-[0.95] text-cream md:text-6xl">
            {text.lead}{" "}
            <span className="font-serif italic normal-case text-fire">
              {text.highlight}
            </span>
          </p>
          <p className="mt-2 text-sm text-cream/70 md:text-base">{text.sub}</p>
        </div>
      </div>

      {/* CTA */}
      <div
        className={`absolute inset-x-0 bottom-8 z-30 flex justify-center transition-all duration-500 md:bottom-6 ${
          showCta
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <a
          href={config.orderLink}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={showCta ? 0 : -1}
          aria-hidden={!showCta}
          onClick={() =>
            trackEvent("pedir_takeat", { origem: `pizza_${phase}` })
          }
          className="mb-14 inline-flex min-h-12 items-center gap-2 bg-fire px-8 py-4 text-sm font-bold uppercase tracking-widest text-oil-dark shadow-[0_0_25px_rgba(255,138,0,0.5)] transition-colors duration-300 hover:bg-gold md:mb-0 md:text-base"
        >
          Peça sua pizza <Emoji>🍕</Emoji>
          <NewTab />
        </a>
      </div>
    </section>
  );
}
