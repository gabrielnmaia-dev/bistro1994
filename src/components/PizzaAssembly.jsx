import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * PizzaAssembly — seção pinned com animação de montagem da pizza por fatias.
 * Lê as fatias em /public/pizza/pizza.json.
 */
export default function PizzaAssembly() {
  const containerRef = useRef(null);
  const sliceRefs = useRef([]);
  const [slices, setSlices] = useState([]);
  const [currentPizza, setCurrentPizza] = useState("calabresa");

  const pizzaNames = {
    calabresa: "Calabresa",
    chocolate: "Chocolate",
  };

  const pizzaTexts = {
    calabresa: "Pizza de calabresa — quente e suculenta.",
    chocolate: "E de sobremesa… pizza de chocolate!",
  };

  useEffect(() => {
    async function loadPizza() {
      try {
        const res = await fetch("/pizza/pizza.json");
        const data = await res.json();
        setSlices(data.slices || []);
      } catch (e) {
        console.error("Erro ao carregar pizza.json:", e);
      }
    }
    loadPizza();
  }, []);

  useEffect(() => {
    if (!slices.length) return;

    const container = containerRef.current;

    // Pin da seção — primeiro a calabresa
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=400%",
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=400%",
        scrub: 1,
        snap: 1 / 2, // dois momentos: calabresa e chocolate
      },
    });

    // Anima as fatias da primeira pizza (calabresa)
    slices.forEach((slice, i) => {
      const img = sliceRefs.current[i];
      if (!img) return;

      tl.fromTo(
        img,
        {
          x: slice.saidaX || -300,
          y: slice.saidaY || -300,
          opacity: 0,
          rotation: i % 2 === 0 ? -25 : 25,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          rotation: 0,
          ease: "none",
          duration: 1,
        },
        i * 0.08 // stagger entre fatias
      );
    });

    // Crossfade para a pizza de chocolate no meio do scroll
    tl.to(
      container.querySelectorAll(".pizza-slice"),
      { opacity: 0, duration: 0.4 },
      "+=0.5"
    );

    return () => {
      tl.kill();
      ScrollTrigger.get().forEach((st) => st.kill());
    };
  }, [slices]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-oil overflow-hidden">
      <div className="absolute inset-0 z-0 bg-oil" />

      {/* Pizza montada */}
      <div className="relative z-10 flex items-center justify-center w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)] px-4 md:px-8">
        {slices.map((slice, i) => (
          <img
            key={slice.file}
            ref={(el) => (sliceRefs.current[i] = el)}
            src={`/pizza/${slice.file}`}
            alt={`Fatia ${i + 1} da pizza de ${pizzaNames[currentPizza]}`}
            className="absolute top-0 left-0 w-full h-full object-contain pizza-slice"
            style={{ zIndex: slices.length - i }}
          />
        ))}

        {/* Texto central */}
        <div className="absolute z-40 text-center">
          <p className="text-3xl md:text-5xl font-serif italic text-gold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {pizzaTexts[currentPizza]}
          </p>
          <p className="text-sm text-cream/70 tracking-[0.2em] uppercase">
            role pra ver a sobremesa
          </p>
        </div>
      </div>
    </section>
  );
}
