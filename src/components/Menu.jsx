import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import config, { TAKEAT_URL } from "../config";
import { MENU_CATEGORIES, menuHighlights } from "../data/menu";
import { useBusinessHours } from "../lib/useBusinessHours";
import { scrollToElement } from "../lib/scroll";
import { trackEvent } from "../lib/track";
import { ArrowRightIcon, NewTab, OpenStatus } from "./ui";

gsap.registerPlugin(ScrollTrigger);

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function Menu() {
  const sectionRef = useRef(null);
  const tabsRef = useRef(null);
  const tabButtons = useRef({});
  const categoryRefs = useRef({});
  const visibleSections = useRef(new Map());

  const groups = useMemo(
    () =>
      MENU_CATEGORIES.map((categoria) => ({
        categoria,
        id: `cat-${slugify(categoria)}`,
        items: menuHighlights.filter((item) => item.categoria === categoria),
      })).filter((group) => group.items.length > 0),
    []
  );

  const [activeId, setActiveId] = useState(groups[0]?.id ?? "");
  const hours = useBusinessHours();

  /* Abas acompanham o scroll via IntersectionObserver */
  useEffect(() => {
    const sections = groups
      .map((group) => categoryRefs.current[group.id])
      .filter(Boolean);

    if (!sections.length) return;

    visibleSections.current = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleSections.current.set(entry.target.id, entry.isIntersecting);
        });

        const visible = sections.filter((section) =>
          visibleSections.current.get(section.id)
        );

        // A faixa do observer fica próxima ao topo; se duas seções se
        // cruzarem, a de baixo (mais adiante no cardápio) assume.
        if (visible.length) {
          setActiveId(visible[visible.length - 1].id);
        }
      },
      // Faixa fina a ~38% da viewport, abaixo das abas sticky
      { rootMargin: "-38% 0px -61% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [groups]);

  /* Mantém a aba ativa visível no scroll horizontal do mobile */
  useEffect(() => {
    const nav = tabsRef.current;
    const button = tabButtons.current[activeId];
    if (!nav || !button) return;

    const left =
      button.offsetLeft - nav.clientWidth / 2 + button.clientWidth / 2;
    nav.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [activeId]);

  /* Entrada suave dos cards (respeita prefers-reduced-motion) */
  useEffect(() => {
    if (!groups.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      groups.forEach((group) => {
        const section = categoryRefs.current[group.id];
        if (!section) return;

        gsap.from(section.querySelectorAll(".menu-card"), {
          y: 36,
          opacity: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [groups]);

  const handleCategoryClick = (event, id) => {
    event.preventDefault();
    setActiveId(id);
    const section = categoryRefs.current[id];
    const heading = document.getElementById(`${id}-title`);
    scrollToElement(section, { offset: -112, focus: heading });
  };

  return (
    <section
      ref={sectionRef}
      id="cardapio"
      aria-labelledby="cardapio-title"
      className="relative bg-oil pb-24 pt-20 md:pb-32 md:pt-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-gold/[0.06] blur-[110px]" />
        <div className="absolute -left-20 bottom-40 h-64 w-64 rounded-full bg-fire/[0.05] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        {/* Cabeçalho */}
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
            Destaques da casa
          </span>
          <h2
            id="cardapio-title"
            className="mt-4 font-display text-4xl uppercase leading-none text-cream md:text-6xl"
          >
            {config.menu.title}
          </h2>
          <p className="mt-4 text-balance font-serif text-lg italic text-fire md:text-2xl">
            {config.menu.subtitle}
          </p>
        </div>

        {/* Abas sticky */}
        <nav
          aria-label="Categorias do cardápio"
          className="sticky top-0 z-30 -mx-4 border-y border-gold/10 bg-oil/95 px-4 py-3 backdrop-blur-md md:-mx-8 md:px-8"
        >
          <div
            ref={tabsRef}
            className="no-scrollbar flex gap-2 overflow-x-auto md:flex-wrap md:justify-center md:overflow-visible"
          >
            {groups.map((group) => {
              const isActive = activeId === group.id;
              return (
                <a
                  key={group.id}
                  ref={(el) => {
                    tabButtons.current[group.id] = el;
                  }}
                  href={`#${group.id}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={(event) => handleCategoryClick(event, group.id)}
                  className={`inline-flex min-h-10 shrink-0 snap-start items-center rounded-full border px-4 py-2 font-display text-xs uppercase tracking-[0.16em] transition-colors duration-200 md:text-sm ${
                    isActive
                      ? "border-gold bg-gold text-oil-dark"
                      : "border-gold/25 text-cream/75 hover:border-gold/60 hover:text-cream"
                  }`}
                >
                  {group.categoria}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Grupos + cards */}
        <div className="mt-10 space-y-14 md:mt-14 md:space-y-20">
          {groups.map((group) => (
            <section
              key={group.id}
              id={group.id}
              ref={(el) => {
                categoryRefs.current[group.id] = el;
              }}
              aria-labelledby={`${group.id}-title`}
              className="scroll-mt-4"
            >
              <div className="mb-6 flex items-end justify-between gap-4 border-b border-gold/15 pb-3">
                <h3
                  id={`${group.id}-title`}
                  tabIndex={-1}
                  className="font-display text-2xl uppercase leading-none text-cream md:text-4xl"
                >
                  {group.categoria}
                </h3>
                <span className="hidden shrink-0 text-[11px] uppercase tracking-[0.25em] text-gold/75 sm:block">
                  {String(group.items.length).padStart(2, "0")} destaques
                </span>
              </div>

              <ul
                className={`grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 ${
                  group.items.length >= 3
                    ? "lg:grid-cols-3"
                    : "lg:grid-cols-2"
                }`}
              >
                {group.items.map((item) => {
                  const origem = `cardapio_card_${slugify(group.categoria)}`;

                  return (
                    <li key={item.nome} className="menu-card">
                    <article
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold/20 bg-oil-dark shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition-[transform,border-color,box-shadow] duration-300 hover:border-gold/60 hover:shadow-[0_22px_50px_rgba(0,0,0,0.35)] motion-safe:hover:-translate-y-1"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-gold/5">
                        <img
                          src={item.foto}
                          alt=""
                          width="800"
                          height="600"
                          className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              "/photos/hamburguer-close.webp";
                          }}
                        />
                        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-oil-dark/60 via-transparent to-transparent" />
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <h4 className="font-display text-xl uppercase leading-tight text-cream transition-colors duration-300 group-hover:text-gold md:text-2xl">
                          {item.nome}
                        </h4>
                        <p className="mb-5 mt-2 line-clamp-3 text-sm leading-relaxed text-cream/75">
                          {item.descricao}
                        </p>

                        <a
                          href={TAKEAT_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackEvent("pedir_takeat", { origem })
                          }
                          className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-gold transition-colors duration-300 hover:bg-gold hover:text-oil-dark"
                        >
                          Pedir
                          <span className="sr-only"> {item.nome}</span>
                          <ArrowRightIcon className="h-3.5 w-3.5" />
                          <NewTab />
                        </a>
                      </div>
                    </article>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        {/* CTA final */}
        <div className="relative mt-16 overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-br from-oil-dark via-oil-dark to-oil p-8 text-center md:mt-24 md:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-fire/10 blur-3xl" />

          <div className="relative z-10">
            <div className="flex justify-center">
              <OpenStatus hours={hours} />
            </div>

            <h3 className="mt-5 text-balance font-display text-3xl uppercase leading-[0.95] text-cream md:text-5xl">
              Bateu a fome?{" "}
              <span className="font-serif italic normal-case text-fire">
                Pede no Takeat.
              </span>
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream/75 md:text-base">
              {config.menu.deliveryNote}
            </p>

            <a
              href={TAKEAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("pedir_takeat", {
                  origem: "cardapio_cta_final",
                })
              }
              className="group mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-fire px-8 py-4 text-sm font-bold uppercase tracking-widest text-oil-dark shadow-[0_0_28px_rgba(255,138,0,0.45)] transition-colors duration-300 hover:bg-gold sm:w-auto md:px-10 md:text-base"
            >
              {config.menu.fullMenuCta}
              <ArrowRightIcon className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1" />
              <NewTab />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
