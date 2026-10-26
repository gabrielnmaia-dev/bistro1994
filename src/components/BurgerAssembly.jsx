import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import config from "../config";

gsap.registerPlugin(ScrollTrigger);

/**
 * BurgerAssembly — seção pinned com animação de montagem do hambúrguer.
 * Lê as camadas em /public/burger/layers.json.
 * Suporta tanto o formato antigo ({ layers: [...] }) quanto o novo
 * ({ canvas, stack, layers: [...] }).
 */
export default function BurgerAssembly() {
  const containerRef = useRef(null);
  const layersRef = useRef([]);
  const [layers, setLayers] = useState([]);
  const [activeLayer, setActiveLayer] = useState(0);

  const layerTexts = [
    "Pão brioche artesanal",
    "Alface e tomate frescos",
    "Blend na chapa com cheddar cremoso",
    "Tudo junto e misturado!",
  ];

  useEffect(() => {
    async function loadLayers() {
      try {
        const res = await fetch("/burger/layers.json");
        const data = await res.json();
        // Suporte ao novo formato: data.layers é o array de camadas
        const camadas = data.layers || [];
        setLayers(camadas);
      } catch (e) {
        console.error("Erro ao carregar layers do hambúrguer:", e);
      }
    }
    loadLayers();
  }, []);

  useEffect(() => {
    if (!layers.length) return;

    const container = containerRef.current;

    // Pin da seção
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=300%",
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=300%",
        scrub: 1,
        snap: 1 / (layers.length - 1),
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(
            Math.round(progress * (layers.length - 1)),
            layers.length - 1
          );
          setActiveLayer(index);
        },
      },
    });

    // Cada camada começa acima, opacity 0 e rotação leve, cai até translateY(0)
    layers.forEach((layer, i) => {
      const img = layersRef.current[i];
      if (!img) return;

      const startY = -window.innerHeight * 0.6;
      const rot = i % 2 === 0 ? -8 : 8;

      tl.fromTo(
        img,
        {
          y: startY,
          opacity: 0,
          rotation: rot,
        },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          ease: "none",
          duration: 1,
        },
        i * 0.15
      );
    });

    // No fim: fade out dos textos de camada
    tl.to(
      container.querySelectorAll(".layer-text"),
      { opacity: 0, duration: 0.5 },
      "+=0.2"
    );

    return () => {
      tl.kill();
      ScrollTrigger.get().forEach((st) => st.kill());
    };
  }, [layers]);

  if (!layers.length) {
    return (
      <section className="py-32 md:py-64 text-center bg-oil-dark">
        <p className="text-cream/50">Carregando montagem do hambúrguer...</p>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-oil-dark overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-oil-dark" />

      {/* Camadas do hambúrguer empilhadas */}
      <div className="relative z-10 flex items-center justify-center w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)] px-4 md:px-8">
        {layers.map((layer, i) => (
          <img
            key={layer.file}
            ref={(el) => (layersRef.current[i] = el)}
            src={`/burger/${layer.file}`}
            alt={`Camada ${i + 1}: ${layer.file}`}
            className="absolute top-0 left-0 w-full h-full object-contain layer-img"
            style={{
              zIndex: layers.length - i,
            }}
          />
        ))}
      </div>

      {/* Textos laterais */}
      <div className="absolute top-1/2 left-0 right-0 z-20 flex justify-between px-4 md:px-8 -translate-y-1/2 pointer-events-none">
        <div className="text-left">
          <p className={`text-xl md:text-3xl font-display uppercase text-cream mb-1 layer-text transition-opacity duration-300 ${activeLayer === 0 ? "opacity-100" : "opacity-0"}`}>
            {layerTexts[0]}
          </p>
          <p className={`text-sm text-gold/60 tracking-[0.2em] uppercase layer-text transition-opacity duration-300 ${activeLayer === 0 ? "opacity-100" : "opacity-0"}`}>
            camada de baixo
          </p>
        </div>
        <div className={`text-right ${activeLayer === 1 ? "opacity-100" : "opacity-0"} transition-opacity duration-300 layer-text`}>
          <p className={`text-xl md:text-3xl font-display uppercase text-cream mb-1`}>
            {layerTexts[1]}
          </p>
        </div>
        <div className={`text-center ${activeLayer === 2 ? "opacity-100" : "opacity-0"} transition-opacity duration-300 layer-text`}>
          <p className={`text-xl md:text-3xl font-display uppercase text-cream mb-1`}>
            {layerTexts[2]}
          </p>
        </div>
        <div className={`text-right ${activeLayer === 3 ? "opacity-100" : "opacity-0"} transition-opacity duration-300 layer-text`}>
          <p className={`text-xl md:text-3xl font-display uppercase text-cream mb-1`}>
            {layerTexts[3]}
          </p>
        </div>
      </div>

      {/* CTA final (aparece ao final) */}
      <div className={`absolute bottom-8 left-0 right-0 z-30 flex justify-center ${activeLayer === layers.length - 1 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none transition-opacity duration-500"}`}>
        <a
          href={config.orderLink}
          className="inline-flex items-center gap-2 px-8 py-4 bg-fire text-cream font-bold uppercase tracking-widest text-sm md:text-base hover:bg-gold transition-colors duration-300 shadow-[0_0_25px_rgba(255,138,0,0.5)] animate-pulse"
        >
          Peça o seu 🍔
        </a>
      </div>
    </section>
  );
}
