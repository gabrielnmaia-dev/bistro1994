import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./components/Hero";
import BurgerAssembly from "./components/BurgerAssembly";
import PizzaAssembly from "./components/PizzaAssembly";
import Testimonials from "./components/Testimonials";
import Menu from "./components/Menu";
import Delivery from "./components/Delivery";
import Location from "./components/Location";
import Footer from "./components/Footer";
import MobileCTA from "./components/MobileCTA";
import { prefersReducedMotion, setLenis } from "./lib/scroll";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Quem pede menos movimento fica com a rolagem nativa (sem inércia)
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      setLenis(null);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-oil text-cream">
      {/* Atalho de teclado para pular as animações e ir direto ao cardápio */}
      <a
        href="#cardapio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:uppercase focus:tracking-widest focus:text-oil-dark"
      >
        Pular para o cardápio
      </a>

      <main id="conteudo">
        <Hero />
        <BurgerAssembly />
        <PizzaAssembly />
        <Testimonials />
        <Menu />
        <Delivery />
        <Location />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}
