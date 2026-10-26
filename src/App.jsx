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

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });

    const updateLenis = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.config({ ignoreMobileResize: true });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-oil text-cream">
      <Hero />
      <BurgerAssembly />
      <PizzaAssembly />
      <Testimonials />
      <Menu />
      <Delivery />
      <Location />
      <Footer />
      <MobileCTA />
    </div>
  );
}
