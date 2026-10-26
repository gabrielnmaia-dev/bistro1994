/**
 * Destaques do cardápio exibidos na landing page.
 *
 * Este arquivo contém apenas uma VITRINE. O cardápio completo e o pedido
 * ficam no Takeat (TAKEAT_URL em src/config.js).
 *
 * Cada item segue o formato:
 *   { nome, descricao, foto, categoria, preco }
 *
 * - `preco` é opcional e está vazio de propósito: a seção NÃO exibe preços.
 * - Os itens abaixo são exemplos baseados no cardápio do Takeat. Revise os
 *   trechos marcados com "EDITAR" quando o cardápio mudar.
 */

export const MENU_CATEGORIES = [
  "Hambúrgueres",
  "Porções e Pratos",
  "Pizzas",
  "Sobremesas",
];

export const menuHighlights = [
  {
    nome: "Bistrô Clássico",
    descricao:
      "Pão brioche dourado na manteiga, blend bovino, cheddar cremoso, alface e tomate.",
    foto: "https://takeat-imgs.takeat.app/e51d249a0f8266767458e5c6c5a52c68.webp",
    categoria: "Hambúrgueres",
    preco: "",
  },
  {
    nome: "Bistrô Cheddar Bacon",
    descricao:
      "Blend bovino suculento, molho cheddar da casa, bacon crocante, alface e tomate.",
    foto: "https://takeat-imgs.takeat.app/07ff4530c2d600001396c7ef81c6e387.webp",
    categoria: "Hambúrgueres",
    preco: "",
  },
  {
    nome: "Bistrô Sertanejo",
    descricao:
      "Carne de sol desfiada, muçarela cremosa, picles de cebola roxa, alface e tomate.",
    foto: "https://takeat-imgs.takeat.app/27571e2d4c0cc9d67fc6f4517a89f279.webp",
    categoria: "Hambúrgueres",
    preco: "",
  },

  {
    nome: "Costela Suína ao Barbecue",
    descricao:
      "Costela assada lentamente, barbecue de rapadura, fritas ou macaxeira e farofa de castanha.",
    foto: "https://takeat-imgs.takeat.app/f90955d36a1e62b356787d17317de998.webp",
    categoria: "Porções e Pratos",
    preco: "",
  },
  {
    nome: "Bolinhos de Carne de Sol",
    descricao:
      "Massa de macaxeira, carne de sol e queijo coalho, empanados e fritos na hora.",
    foto: "https://takeat-imgs.takeat.app/7b027572423347ff58965765ea2f9e84.webp",
    categoria: "Porções e Pratos",
    preco: "",
  },
  {
    nome: "Fettuccine Sertanejo",
    descricao:
      "Fettuccine em molho cremoso de nata e parmesão, com carne de sol e queijo coalho grelhado.",
    foto: "https://takeat-imgs.takeat.app/c3d3e417dd03fe2ba8c00878016d8b6f.webp",
    categoria: "Porções e Pratos",
    preco: "",
  },

  {
    nome: "Pizza de Calabresa",
    descricao:
      "Massa artesanal de fermentação lenta, calabresa fatiada e queijo derretido.",
    foto: "/pizza/pizza-calabresa.webp",
    categoria: "Pizzas",
    preco: "",
  },
  {
    nome: "Pizza de Chocolate",
    descricao:
      "Massa artesanal com chocolate cremoso e finalização especial da casa.",
    foto: "/pizza/pizza-chocolate.webp",
    categoria: "Pizzas",
    preco: "",
  },

  {
    nome: "Pudim do Sertão",
    descricao:
      "Pudim ultra cremoso com calda de rapadura, castanha de caju e biscoito amanteigado.",
    foto: "https://takeat-imgs.takeat.app/377662c5799d914d75992b586b54e94f.webp",
    categoria: "Sobremesas",
    preco: "",
  },
  {
    nome: "Brownie da Terra",
    descricao:
      "Brownie de banana-da-terra grelhada com chocolate, sorvete de creme e farofa crocante.",
    foto: "https://takeat-imgs.takeat.app/173010f043f6be2157d544e51ea29617.webp",
    categoria: "Sobremesas",
    preco: "",
  },
];

export default menuHighlights;
