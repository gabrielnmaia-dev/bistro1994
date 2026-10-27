import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import config from "../config";
import { trackEvent } from "../lib/track";

gsap.registerPlugin(ScrollTrigger);

/* Linha do tempo (fração do scroll da seção) */
const ENTRY_END = 0.52;
const EXPLODE_START = 0.56;
const CLOSE_START = 0.8;

const LAYER_TEXTS = [
  { lead: "Pão brioche", highlight: "tostado", alt: "Pão brioche tostado" },
  { lead: "Molho da casa", highlight: "e alface", alt: "Molho da casa e alface" },
  { lead: "Blend na chapa", highlight: "com cheddar", alt: "Blend na chapa com cheddar" },
  { lead: "Crocante", highlight: "dourado", alt: "Crocante dourado (ovo)" },
  { lead: "Bacon", highlight: "defumado", alt: "Bacon defumado" },
  { lead: "Blend + cheddar", highlight: "+ molho", alt: "Blend, cheddar e molho" },
  { lead: "Pão com", highlight: "gergelim", alt: "Pão com gergelim" },
];

/**
 * BurgerAssembly — hambúrguer explodido controlado pelo scroll.
 * Lê /public/burger/layers.json (camadas + partículas).
 *
 * 0–52%  → entrada das 7 camadas, de baixo pra cima
 * 56–80% → explosão (parallax vertical entre camadas + partículas)
 * 80–100% → fechamento (closeOffsetY), fade das partículas, zoom e CTA
 */
export default function BurgerAssembly() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const layersRef = useRef([]);
  const particlesRef = useRef(null);

  const [layers, setLayers] = useState([]);
  const [particles, setParticles] = useState(null);
  const [canvas, setCanvas] = useState({ width: 938, height: 1128 });
  const [progress, setProgress] = useState(0);

  /* Carrega o manifesto e pré-carrega os webp */
  useEffect(() => {
    let cancelled = false;

    async function loadLayers() {
      try {
        const res = await fetch("/burger/layers.json");
        const data = await res.json();
        if (cancelled) return;

        const camadas = data.layers || [];
        setLayers(camadas);
        setParticles(data.particles?.file || null);
        if (data.canvas?.width && data.canvas?.height) {
          setCanvas(data.canvas);
        }

        // Pré-carrega todas as imagens antes/durante a animação
        const urls = camadas.map((layer) => `/burger/${layer.file}`);
        if (data.particles?.file) urls.push(`/burger/${data.particles.file}`);
        urls.forEach((url) => {
          const img = new Image();
          img.src = url;
        });
      } catch (e) {
        console.error("Erro ao carregar layers do hambúrguer:", e);
      }
    }

    loadLayers();
    return () => {
      cancelled = true;
    };
  }, []);

  useLayoutEffect(() => {
    if (!layers.length) return;

    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    const imgs = layers.map((_, i) => layersRef.current[i]).filter(Boolean);
    const particleImg = particlesRef.current;

    const mm = gsap.matchMedia();

    mm.add(
      {
        // É preciso haver sempre ao menos uma condição verdadeira para o
        // callback rodar. Sem "isMobile", no mobile sem reduced-motion
        // nenhuma condição casava e a timeline nunca era criada (burger
        // ficava estático e montado).
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, reduce } = context.conditions;
        const total = layers.length;

        // clientWidth ignora o transform:scale aplicado no palco
        const getScale = () =>
          (stage.clientWidth || canvas.width) / canvas.width;

        /* ---------- prefers-reduced-motion: hambúrguer fechado, sem pin ---------- */
        const applyClosedState = () => {
          const scale = getScale();
          imgs.forEach((img, i) => {
            gsap.set(img, {
              y: (layers[i].closeOffsetY || 0) * scale,
              x: 0,
              rotation: 0,
              opacity: 1,
            });
          });
          if (particleImg) gsap.set(particleImg, { opacity: 0 });
          gsap.set(stage, { scale: 1.04, transformOrigin: "50% 50%" });
          setProgress(1);
        };

        if (reduce) {
          applyClosedState();
          window.addEventListener("resize", applyClosedState);
          return () => window.removeEventListener("resize", applyClosedState);
        }

        const isMobile = !isDesktop;

        const fallDistance = () =>
          isMobile ? -Math.min(560, window.innerHeight * 0.65) : -900;
        const explosionLift = () => (isMobile ? 34 : 64);
        const bounceDistance = () => (isMobile ? 5 : 9);

        /* Estado inicial: só o pão de baixo aparece */
        gsap.set(stage, { scale: 1, transformOrigin: "50% 50%" });
        imgs.forEach((img, i) => {
          gsap.set(img, {
            y: i === 0 ? 0 : fallDistance(),
            x: 0,
            rotation: 0,
            opacity: i === 0 ? 1 : 0,
          });
        });
        if (particleImg) gsap.set(particleImg, { y: 0, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: isMobile ? "+=300%" : "+=400%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const value = Math.round(self.progress * 100) / 100;
              setProgress(value);
            },
          },
        });

        /* ---------- 0–55%: entrada das camadas, de baixo pra cima ---------- */
        const step = (ENTRY_END - 0.03) / Math.max(total - 1, 1);

        for (let i = 1; i < total; i++) {
          const img = imgs[i];
          if (!img) continue;

          const start = 0.02 + (i - 1) * step;
          const duration = Math.min(0.1, step * 1.08);
          const rotation = (i % 2 === 0 ? -1 : 1) * (3 + (i % 3) * 1.4);

          tl.fromTo(
            img,
            { y: fallDistance, opacity: 0, rotation },
            {
              y: 0,
              opacity: 1,
              rotation: 0,
              duration,
              ease: "power3.out",
            },
            start
          );

          // Pequeno quique ao encaixar na posição explodida
          tl.to(
            img,
            { y: bounceDistance, duration: 0.02, ease: "power1.in" },
            start + duration
          );
          tl.to(
            img,
            { y: 0, duration: 0.025, ease: "power1.out" },
            start + duration + 0.02
          );
        }

        /* ---------- 55–80%: explosão em câmera lenta ---------- */
        imgs.forEach((img, i) => {
          if (!img) return;
          const ratio = total > 1 ? i / (total - 1) : 0;
          tl.to(
            img,
            {
              y: () => -ratio * explosionLift(),
              duration: 0.22,
              ease: "power1.inOut",
            },
            EXPLODE_START + 0.01
          );
        });

        if (particleImg) {
          tl.to(
            particleImg,
            { opacity: 1, duration: 0.05, ease: "power1.out" },
            EXPLODE_START
          );
          tl.to(
            particleImg,
            {
              y: () => -(isMobile ? 60 : 120),
              duration: 0.24,
              ease: "power1.inOut",
            },
            EXPLODE_START
          );
          tl.to(
            particleImg,
            { opacity: 0, duration: 0.12, ease: "power1.out" },
            CLOSE_START + 0.02
          );
        }

        /* ---------- 80–100%: fechar o hambúrguer + zoom + CTA ---------- */
        imgs.forEach((img, i) => {
          if (!img) return;
          tl.to(
            img,
            {
              y: () => (layers[i].closeOffsetY || 0) * getScale(),
              duration: 0.19,
              ease: "power2.inOut",
            },
            CLOSE_START + i * 0.002
          );
        });

        tl.to(
          stage,
          { scale: 1.06, duration: 0.2, ease: "power2.out" },
          CLOSE_START
        );
      }
    );

    return () => mm.revert();
  }, [layers, particles, canvas.width]);

  if (!layers.length) {
    return (
      <section className="py-32 md:py-64 text-center bg-oil-dark">
        <p className="text-cream/50">Carregando montagem do hambúrguer...</p>
      </section>
    );
  }

  const entryRatio = Math.min(progress / ENTRY_END, 1);
  const activeIndex = Math.min(
    Math.floor(entryRatio * layers.length),
    layers.length - 1
  );
  const activeText = LAYER_TEXTS[Math.min(activeIndex, LAYER_TEXTS.length - 1)];
  const showText = progress < 0.82;
  const showCta = progress >= 0.92;
  const showHint = progress < 0.04;

  return (
    <section
      ref={containerRef}
      id="hamburguer"
      className="relative h-[100svh] overflow-hidden bg-oil-dark"
      aria-label="Hambúrguer artesanal explodido"
    >
      <h2 className="sr-only">
        A montagem do hambúrguer artesanal do Bistrô1994
      </h2>

      {/* Brilho de fundo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fire/10 blur-[120px]" />

      {/* Palco: canvas 938x1128, centralizado, altura máx ~85svh */}
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div
          ref={stageRef}
          className="relative aspect-[938/1128] w-[min(88vw,58svh)] will-change-transform md:w-[min(48vw,65svh)]"
        >
          {layers.map((layer, i) => (
            <img
              key={layer.file}
              ref={(el) => {
                layersRef.current[i] = el;
              }}
              src={`/burger/${layer.file}`}
              alt={LAYER_TEXTS[i]?.alt || `Camada ${i + 1} do hambúrguer`}
              className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain will-change-transform"
              style={{ zIndex: i + 1 }}
              draggable={false}
              decoding="async"
            />
          ))}

          {particles && (
            <img
              ref={particlesRef}
              src={`/burger/${particles}`}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain will-change-transform"
              style={{ zIndex: layers.length + 1 }}
              draggable={false}
              decoding="async"
            />
          )}
        </div>
      </div>

      {/* Textos laterais — um por camada */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-24 z-20 px-6 text-center transition-all duration-500 md:inset-y-0 md:left-[5vw] md:right-auto md:flex md:w-[26vw] md:flex-col md:justify-center md:px-0 md:text-left ${
          showText
            ? "translate-y-0 opacity-100"
            : "translate-y-3 opacity-0"
        }`}
      >
        <p className="mb-2 text-[11px] uppercase tracking-[0.35em] text-gold/70">
          Ingrediente {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(layers.length).padStart(2, "0")}
        </p>
        <p className="font-display text-4xl uppercase leading-[0.92] text-cream md:text-6xl">
          {activeText.lead}{" "}
          <span className="font-serif italic normal-case text-fire">
            {activeText.highlight}
          </span>
        </p>
      </div>

      {/* Dica de scroll */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-8 z-20 flex flex-col items-center gap-2 transition-opacity duration-500 md:top-auto md:bottom-8 ${
          showHint ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-[11px] uppercase tracking-[0.35em] text-cream/50">
          Role para montar
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-gold/70 to-transparent" />
      </div>

      {/* CTA final */}
      <div
        className={`absolute bottom-24 left-0 right-0 z-30 flex justify-center transition-all duration-500 md:bottom-8 ${
          showCta
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <a
          href={config.orderLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("pedir_takeat", { origem: "montagem_hamburguer" })
          }
          className="inline-flex items-center gap-2 bg-fire px-8 py-4 text-sm font-bold uppercase tracking-widest text-cream shadow-[0_0_25px_rgba(255,138,0,0.5)] transition-colors duration-300 hover:bg-gold md:text-base"
        >
          Peça o seu 🍔
        </a>
      </div>
    </section>
  );
}
