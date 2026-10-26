# Bistrô1994 — Landing Page One-Page

Site estático em **Vite + React + Tailwind CSS** com **GSAP + ScrollTrigger** e **Lenis** (smooth scroll), feito para ser linkado no Google Meu Negócio / Google Maps e funcionar como vitrine do restaurante em Matureia - PB.

---

## 🚀 Começando

```bash
npm install
npm run dev      # servidor de desenvolvimento (http://localhost:5173)
npm run build    # build de produção em /dist
npm run preview  # pré-visualizar o build localmente
```

**Nota sobre o CSS:** O Tailwind CSS é processado via PostCSS (`postcss.config.js`) e empacotado automaticamente pelo Vite no bundle CSS (`dist/assets/*.css`). Não há dependência de arquivos CSS externos — o `index.html` referencia o CSS gerado pelo Vite diretamente. Após editar `src/index.css`, basta rodar `npm run build` para regenerar.

Deploy em Vercel, Netlify ou GitHub Pages (build estático, sem backend).

---

## 📁 Estrutura

```
src/
  config.js           # TODOS os textos, links, horários, endereço e depoimentos (edite aqui!)
  lib/hours.js        # Cálculo de horário de funcionamento (abertura/fechamento)
  App.jsx             # Orquestra as seções + Lenis + ScrollTrigger
  main.jsx            # Entry point React
  index.css           # Variáveis de tema (cores, fontes) e utilitários Tailwind
  components/
    Hero.jsx
    BurgerAssembly.jsx
    PizzaAssembly.jsx
    Testimonials.jsx
    Menu.jsx
    Delivery.jsx
    Location.jsx
    Footer.jsx
    MobileCTA.jsx
public/
  logo.svg            # Placeholder — troque pelo arquivo oficial do restaurante
  burger/
    layers.json       # Lista das camadas do hambúrguer (01-pao-baixo … 04-pao-cima)
    01-pao-baixo.webp
    02-alface-tomate.webp
    03-hamburguer-cheddar.webp
    04-pao-cima.webp
  pizza/
    pizza.json        # Lista das fatias e dados de saída
    pizza-calabresa-fatia-1.webp … 8.webp
    pizza-chocolate-fatia-1.webp … 8.webp
  photos/
    hero-bg.webm / mp4 — vídeo de fundo do hero
    hero-fallback.webp — poster do vídeo
    depoito-*.webp    — fotos dos depoimentos
    *.webp            — fotos do cardápio / galeria
  og-image.webp       # Imagem para compartilhamento (Open Graph)
```

---

## ✏️ O que você precisa substituir (checklist)

| Onde | O que trocar | Como |
|------|--------------|------|
| `public/logo.svg` | Logo oficial do Bistrô1994 | Substitua o arquivo por um SVG vetorial com o nome "bistrô 1994" |
| `src/config.js` | Endereço, telefone/WhatsApp, links, horários, textos, depoimentos, categorias do cardápio | Edite as variáveis e o objeto `config` |
| `public/burger/layers.json` + `public/burger/*.webp` | Camadas reais do hambúrguer (903×739 px, com transparência) | Coloque as 4 imagens e ajuste o JSON |
| `public/pizza/pizza.json` + `public/pizza/*.webp` | Fatias da pizza calabresa e chocolate | Coloque as 8 fatias de cada e ajuste o JSON |
| `public/photos/hero-bg.webm` (ou `.mp4`) | Vídeo de fundo dramático do hero | Pode substituir por imagem estática no `Hero.jsx` |
| `public/photos/hero-fallback.webp` | Imagem de estande para o vídeo | Foto de hambúrguer em close, fundo escuro |
| `public/og-image.webp` | Imagem de compartilhamento nas redes | 1200×630 px recomendado |
| `public/photos/depoito-*.webp` | Fotos dos pratos nos depoimentos | Use fotos reais dos pratos |
| `src/config.js` → `location.mapsEmbed` | Link de embed do Google Maps | Gere no Google Maps → Compartilhar → Incorporar um mapa |

---

## 🎨 Customização rápida

Todas as cores e fontes estão em `src/index.css` (variáveis CSS do Tailwind):

- `--color-oil` → fundo principal (#0B2B26)
- `--color-gold` → destaque dourado (#F5A800)
- `--color-fire` → destaque laranja (#FF8A00)
- `--color-cream` → texto off-white (#F4EFE6)
- `--font-display` → títulos (Anton)
- `--font-serif` → destaques itálicos (Playfair Display)
- `--font-sans` → corpo (Inter)

---

## ♿ Acessibilidade

- `prefers-reduced-motion`: parallax e pin são desativados; o hambúrguer aparece já montado.
- Todas as imagens têm `alt` e carregamento lazy (`loading="lazy"`).
- Contraste respeitado entre texto off-white e fundo verde-petróleo/preto.

---

## 📱 Mobile

- Barra fixa inferior com "Pedir" e "Como chegar" em telas ≤ 768px.
- Parallax simplificado em mobile para não pesar.

---

## 🔍 SEO

- `title`, `meta description`, Open Graph e Twitter Card em `index.html`.
- JSON-LD `schema.org/Restaurant` embutido em `index.html` (name, servesCuisine, openingHoursSpecification, address, telephone, url, sameAs, menu, acceptsReservations).

Lembre-se de atualizar a URL canônica e as meta tags OG com o domínio real antes de publicar.
