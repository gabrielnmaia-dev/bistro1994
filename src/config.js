/**
 * ============================================================
 *  BISTRÔ1994 — CONFIGURAÇÃO CENTRAL DO SITE
 *  Todas as textos, links, horários, endereço e dados
 *  editáveis ficam nesta página. Basta editar e refazer deploy.
 * ============================================================ */

export const ORDER_LINK = "https://pedido.takeat.app/bistro1994";
export const INSTAGRAM_LINK = "https://www.instagram.com/bistro1994_matureia";
export const MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=Av.+Jos%C3%A9+Jer%C3%B4nimo+da+Silva%2C+736%2C+Matur%C3%A9ia+-+PB%2C+58737-000";
export const WHATSAPP_NUMBER = "5583998752113"; // 55 (Brasil) + DDD (83) + número do Bistrô1994
export const WHATSAPP_MESSAGE = "Oi! Vim pelo site do Bistrô1994 e quero fazer um pedido / tirar uma dúvida.";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const config = {
  orderLink: ORDER_LINK,
  instagramLink: INSTAGRAM_LINK,
  mapsLink: MAPS_LINK,
  whatsappLink: WHATSAPP_LINK,
  ORDER_LINK,
  INSTAGRAM_LINK,
  MAPS_LINK,
  WHATSAPP_LINK,
  name: "Bistrô1994",
  city: "Maturéia - PB",
  slogan: "Cozinha regional contemporânea, hambúrgueres artesanais, pizzas e pratos preparados na hora",

  hero: {
    badge: "HAMBÚRGUERES & PIZZAS GOURMET",
    title: "VAI CONTINUAR SOFRENDO?",
    titleHighlight: "SOFRENDO",
    subtitle: "VENHA LOGO COMER ESSE HAMBÚRGUER!",
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
    street: "Av. José Jerônimo da Silva, 736",
    neighborhood: "Centro",
    locality: "Maturéia",
    region: "PB",
    postalCode: "58737-000",
    full: "Av. José Jerônimo da Silva, 736 — Maturéia - PB, 58737-000",
  },

  phone: {
    display: "(83) 99875-2113",
    whatsappHref: WHATSAPP_LINK,
  },

  delivery: {
    title: "Delivery Bistrô1994",
    description: "Peça pelo nosso cardápio digital oficial no Takeat. Entregamos quentinho no conforto da sua casa!",
  },

  reservation: {
    title: "Atendimento & Reservas",
    description: "Espaço acolhedor e gastronomia contemporânea no clima serrano de Maturéia. Fale conosco no WhatsApp.",
  },

  testimonials: {
    title: "O QUE DIZEM SOBRE O BISTRÔ",
    subtitle: "Depoimentos reais de quem já se apaixonou pelos nossos hambúrgueres e pratos.",
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
        text: "Pizza de brigadeiro no capricho e hambúrguer artesanal suculento... brabo! Repito sempre.",
        src: "/photos/depoito-3.webp",
      },
      {
        name: "Ana Oliveira",
        text: "Delivery pelo Takeat chegou super rápido e quentinho. Melhor experiência de Maturéia!",
        src: "/photos/depoito-4.webp",
      },
    ],
  },

  menu: {
    title: "NOSSO CARDÁPIO",
    subtitle: "Hambúrgueres artesanais, porções, pratos regionais e sobremesas feitos com paixão em Maturéia - PB.",
    orderCta: "Pedir pelo Cardápio Completo (Takeat)",
    categories: [
      {
        id: "hamburguer",
        label: "Hambúrgueres Artesanais",
        items: [
          {
            nome: "Bistrô Clássico",
            descricao: "Pão brioche dourado na manteiga, blend exclusivo 100% bovino, molho cheddar cremoso, alface e tomate.",
            preco: "R$ 18,00",
            src: "/photos/burger-gourmet.webp",
          },
          {
            nome: "Bistrô Cheddar Bacon",
            descricao: "Pão brioche na manteiga, blend bovino suculento, molho cheddar da casa, bacon crocante, alface e tomate.",
            preco: "R$ 22,00",
            src: "/photos/burger-bacon.webp",
          },
          {
            nome: "Bistrô Grego",
            descricao: "Blend bovino artesanal, catupiry, vinagrete da casa, batata palha, molho de alho e barbecue no pão brioche.",
            preco: "R$ 20,00",
            src: "/photos/hamburguer-close.webp",
          },
          {
            nome: "Bistrô Sertanejo",
            descricao: "Blend de carne bovina, muçarela derretida, generosa carne de sol desfiada, picles de cebola roxa, alface e tomate.",
            preco: "R$ 28,00",
            src: "/photos/hamburguer-batata-coca.webp",
          },
        ],
      },
      {
        id: "porcoes",
        label: "Entradas & Porções",
        items: [
          {
            nome: "Costela Suína ao Barbecue",
            descricao: "Costela macia assada lentamente com exclusivo molho barbecue de rapadura. Acompanha fritas ou macaxeira e farofa de castanha.",
            preco: "R$ 85,00",
            src: "/photos/porcao-costela.webp",
          },
          {
            nome: "Bolinhos de Carne de Sol (7 un)",
            descricao: "Carne de sol desfiada envolta em massa de macaxeira cremosa e queijo coalho, empanados e fritos. Uma explosão regional.",
            preco: "R$ 25,00",
            src: "/photos/prato-regional.webp",
          },
          {
            nome: "Pastel de Carne de Sol na Nata (5 un)",
            descricao: "Pastéis dourados e crocantes recheados com carne de sol desfiada em molho de nata extremamente cremoso.",
            preco: "R$ 25,00",
            src: "/photos/depoito-2.webp",
          },
          {
            nome: "Mesa Farta Bistrô",
            descricao: "Costela suína ao barbecue de rapadura + Frango do Coronel + batata frita + macaxeira frita. Ideal para a família toda!",
            preco: "R$ 128,00",
            src: "/photos/porcao-batata.webp",
          },
        ],
      },
      {
        id: "massas",
        label: "Massas & Pratos",
        items: [
          {
            nome: "Fettuccine Sertanejo",
            descricao: "Fettuccine envolvido em cremoso molho de nata e parmesão, com carne de sol desfiada e cubos de queijo coalho grelhado.",
            preco: "R$ 40,00",
            src: "https://takeat-imgs.takeat.app/c3d3e417dd03fe2ba8c00878016d8b6f.webp",
          },
          {
            nome: "Filé ao Molho Madeira com Fettuccine",
            descricao: "Tiras de filé mignon ao molho madeira encorpado com fettuccine ao molho branco cremoso, parmesão fresco e bacon.",
            preco: "R$ 48,00",
            src: "https://takeat-imgs.takeat.app/9156703ac40e73aaba9d799968e3df17.webp",
          },
          {
            nome: "Camarão com Fettuccine",
            descricao: "Massa artesanal envolta em molho branco com camarões grelhados na manteiga e finalizada com ervas frescas.",
            preco: "R$ 46,00",
            src: "https://takeat-imgs.takeat.app/4d977e2156870b29afc5a6fdd0088970.webp",
          },
          {
            nome: "Filé à Parmegiana com Fettuccine",
            descricao: "Filé mignon empanado coberto com molho artesanal de tomate e queijo derretido, com fettuccine bem temperado.",
            preco: "R$ 42,00",
            src: "https://takeat-imgs.takeat.app/9b33756b0296f13c15b4b31e1fc20ffa.webp",
          },
        ],
      },
      {
        id: "pizzas-sobremesas",
        label: "Pizzas & Sobremesas",
        items: [
          {
            nome: "Pizzas Gourmet Artesanais",
            descricao: "Massa artesanal de fermentação lenta (8 fatias). Sabores clássicos e especiais com queijos nobres e ingredientes frescos.",
            preco: "Consulte opções",
            src: "/photos/pizzas-coca.webp",
          },
          {
            nome: "Pizza Doce Brigadeiro & M&M's",
            descricao: "Generosa camada de brigadeiro cremoso finalizada com confeitos crocantes de M&M's. Sobremesa irresistível!",
            preco: "R$ 30,00",
            src: "/photos/sobremesa-bolo.webp",
          },
          {
            nome: "Brownie da Terra",
            descricao: "Brownie artesanal de banana-da-terra grelhada com chocolate. Servido com sorvete de creme e farofa crocante regional.",
            preco: "R$ 15,00",
            src: "https://takeat-imgs.takeat.app/173010f043f6be2157d544e51ea29617.webp",
          },
          {
            nome: "Pudim do Sertão",
            descricao: "Pudim ultra cremoso com calda artesanal de rapadura e base crocante de castanha de caju e biscoito amanteigado.",
            preco: "R$ 12,00",
            src: "https://takeat-imgs.takeat.app/377662c5799d914d75992b586b54e94f.webp",
          },
        ],
      },
    ],
  },

  location: {
    title: "COMO CHEGAR",
    mapsEmbed: "https://maps.google.com/maps?q=Av.+Jos%C3%A9+Jer%C3%B4nimo+da+Silva%2C+736%2C+Matur%C3%A9ia+-+PB%2C+58737-000&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
};

export default config;
