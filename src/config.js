/**
 * ============================================================
 *  BISTRÔ1994 — CONFIGURAÇÃO CENTRAL DO SITE
 *  Todas as textos, links, horários, endereço e dados
 *  editáveis ficam nesta página. Basta editar e refazer deploy.
 * ============================================================ */

export const ORDER_LINK = "https://pedido.takeat.app/bistro1994";
export const INSTAGRAM_LINK = "https://www.instagram.com/bistro1994_matureia";
export const MAPS_LINK = "https://maps.google.com/?q=RUA%20EXEMPLO%2C%20123%20Matureia%20PB";
export const WHATSAPP_NUMBER = "5583999999999"; // 55 (Brasil) + DDD (83) + número
export const WHATSAPP_MESSAGE = "Oi! Vim pelo link do Bistrô1994 e quero reservar uma mesa.";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const config = {
  orderLink: ORDER_LINK,
  instagramLink: INSTAGRAM_LINK,
  mapsLink: MAPS_LINK,
  whatsappLink: WHATSAPP_LINK,
  name: "Bistrô1994",
  city: "Matureia - PB",
  slogan: "Cozinha regional contemporânea, pratos artesanais preparados na hora",

  hero: {
    badge: "HAMBURGUERAS & PIZZAS GOURMET",
    title: "VAI CONTINUAR SOFRENDO?",
    titleHighlight: "SOFRENDO",
    subtitle: "VENHA LOGO COMER ESSE HAMBURGUER!!!",
    primaryCta: {
      label: "Fazer pedido",
      href: ORDER_LINK,
    },
    secondaryCta: {
      label: "Como chegar",
      href: MAPS_LINK,
    },
    scrollHint: "Role pra baixo",
  },

  hours: {
    openDays: [0, 2, 3, 4, 5, 6], // 0=Dom, 1=Seg (fechado), 2=Ter ... 6=Sab
    closedDayLabel: "Segunda-feira",
    openLabel: "Aberto",
    closedLabel: "Fechado",
    openTime: "18:00",
    closeTime: "22:00",
    timezone: "America/Sao_Paulo",
  },

  address: {
    street: "RUA EXEMPLO, 123",
    neighborhood: "Centro",
    locality: "Matureia",
    region: "PB",
    full: "RUA EXEMPLO, 123 — Matureia, PB",
  },

  phone: {
    display: "(83) 9.9999-0000",
    whatsappHref: WHATSAPP_LINK,
  },

  delivery: {
    title: "Delivery",
    description: "Temida pelo delivery, entregue com carinho em até 45 min.",
  },

  reservation: {
    title: "Reserve sua mesa",
    description: "Salão próprio com 40 lugares. Reserve pelo WhatsApp.",
  },

  testimonials: {
    title: "O QUE DIZEM SOBRE O BISTRÔ",
    subtitle: "Depoimentos reais de quem já se apaixonou pelo nosso hambúrguer.",
    instagramCta: "Ver mais no Instagram",
    stars: "★★★★★",
    items: [
      {
        name: "Fulano da Silva",
        text: "Vai continuar sofrendo? Venha logo comer esse hambúrguer!",
        src: "/photos/depoito-1.webp",
      },
      {
        name: "Mariana Souza",
        text: "Cozinha regional contemporânea, pratos artesanais preparados na hora. Nota 10!",
        src: "/photos/depoito-2.webp",
      },
      {
        name: "João Pereira",
        text: "Pizza de chocolate no meio do hambúrguer... brabo! Repito sempre.",
        src: "/photos/depoito-3.webp",
      },
      {
        name: "Ana Oliveira",
        text: "Delivery chegou quente e no prazo. Melhor custo-benefício da região.",
        src: "/photos/depoito-4.webp",
      },
    ],
  },

  menu: {
    title: "O QUE RODEM?",
    subtitle: "Hambúrguers artesanais, porções, pratos regionais e as melhores sobremesas. Sempre preparados na hora.",
    orderCta: "Ver cardápio completo e pedir",
    categories: [
      {
        id: "hamburguer",
        label: "Hambúrguers",
        items: [
          {
            nome: "Hambúrguer Gourmet",
            descricao: "Blend especial da casa com cheddar cremoso e pão brioche artesanal.",
            src: "/photos/burger-gourmet.webp",
          },
          {
            nome: "Hambúrguer Bacon & Cheddar",
            descricao: "Bacon crocante e cheddar derretido sobre blend suculento.",
            src: "/photos/burger-bacon.webp",
          },
        ],
      },
      {
        id: "porcoes",
        label: "Porções",
        items: [
          {
            nome: "Porção de Costela",
            descricao: "Costela bovina na chapa, molho da casa e farofa artesanal.",
            src: "/photos/porcao-costela.webp",
          },
          {
            nome: "Porção de Batata Rústica",
            descricao: "Batata rústica com bacon crocante e queijo derretido.",
            src: "/photos/porcao-batata.webp",
          },
        ],
      },
      {
        id: "pratos",
        label: "Pratos Regionais",
        items: [
          {
            nome: "Prato Regional da Casa",
            descricao: "Tradição da serra mineira com toque contemporâneo.",
            src: "/photos/prato-regional.webp",
          },
        ],
      },
      {
        id: "sobremesas",
        label: "Sobremesas",
        items: [
          {
            nome: "Bolo de Chocolate",
            descricao: "Bolo de chocolate artesanal com calda quente.",
            src: "/photos/sobremesa-bolo.webp",
          },
        ],
      },
    ],
  },

  location: {
    title: "BOA VISTA?",
    mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455!2d-36.599!3d-7.483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7e54a3f0b6d8b9d7:0x7c0f0e6e6c7f0e6e!2sRUA%20EXEMPLO%2C%20123!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr",
  },
};

export default config;
