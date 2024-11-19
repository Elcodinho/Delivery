export const PHONE = "79990001133";
export const EMAIL = "call54@eda.ru";
export const ADRESS = "просп. Победы 20";
export const SCHEDULE = "Пн-Вс 9:00- 23:30";
export const POINTSADRESS = [
  {
    adress: "г. Симферополь, проспект Победы 20",
    email: EMAIL,
    schedule: SCHEDULE,
    phone: PHONE,
  },
  {
    adress: "г. Симферополь, ул. Ленина, д. 113",
    email: EMAIL,
    schedule: SCHEDULE,
    phone: PHONE,
  },
  {
    adress: "г. Симферополь, ул. Севастопольская, д. 1",
    email: EMAIL,
    schedule: SCHEDULE,
    phone: PHONE,
  },
]; // Адреса пунктов доставки
export const URL = {
  FEEDBACKURL: "http://localhost:3500/feedback",
  SUGGESTIONSURL: "http://localhost:3600/suggestions",
  MENUURL: "http://localhost:3700/menu",
  SUPPLEMENTSURL: "http://localhost:3800/supplements",
}; // Url адреса файлов с данными

export const SECONDARYNAV = {
  aboutContactsNav: [
    { name: "О ресторане", path: "/about" },
    { name: "Контакты", path: "/contacts" },
  ],

  privacyPersonalNav: [
    { name: "Публичная оферта", path: "/privacy" },
    { name: "Политика обработки персональных данных", path: "/personaldata" },
  ],
}; // Массивы для вторичной навигации страниц

//
export const cart = [
  {
    subCat: "rolli",
    slug: "california-crab",
    name: "Калифорния с краб миксом",
    description:
      "рис, нори, крабовый микс, сливочный сыр, свежий огурец, икра масаго, кунжут",
    amount: 1,
    price: 390,
    size: 8,
    image:
      "https://res.cloudinary.com/dynzztjct/image/upload/v1731659883/california-crab_zwfltz.webp",
  },
  {
    subCat: "rolli",
    slug: "california-losos",
    name: "Калифорния с лососем",
    description:
      "рис, нори, сливочный сыр, филе лосося слабой соли, икра масаго, свежий огурец",
    amount: 2,
    price: 270,
    size: 4,
    image:
      "https://res.cloudinary.com/dynzztjct/image/upload/v1731659884/california-losos_or20bk.webp",
  },
  {
    category: "pizza",
    type: "classic",
    slug: "syrniy-tsiplenok-pizza",
    name: "Сырный Цыпленок",
    description:
      "итальянская мука, соус сливочный, куриное филе, сыр моцарелла, помидоры черри, масло чесночное, зелень",
    amount: 2,
    price: 890,
    size: 54,
    image:
      "https://res.cloudinary.com/dynzztjct/image/upload/v1731659601/sirniy-tsiplenok_n1bnp5.webp",
    supplements: ["Курица копченая", "Перец чили"],
  },
  {
    slug: "sushi-avocado",
    name: "Суши авокадо",
    description: "рис, авокадо",
    amount: 2,
    price: 75,
    image:
      "https://res.cloudinary.com/dynzztjct/image/upload/v1731660081/sushi-avocado_kf1mud.webp",
  },
  {
    slug: "burger-chiz",
    name: "Бургер Чиз",
    description:
      "нежный сырный соус, натуральная говяжья котлета, сыр чеддер, свежие овощи под булочкой бриошь",
    amount: 3,
    price: 570,
    image:
      "https://res.cloudinary.com/dynzztjct/image/upload/v1731659119/chiz_b5wgaj.webp",
  },
  {
    category: "pizza",
    type: "rimskaya",
    slug: "pizza-rimskaya-syrniy-tsiplenok",
    name: "Пицца римская Сырный Цыпленок",
    description:
      "Тесто для римской пиццы, соус сливочный, куриное филе, сыр моцарелла, помидоры черри, масло чесночное, зелень",
    amount: 1,
    price: 630,
    image:
      "https://res.cloudinary.com/dynzztjct/image/upload/v1731659746/rimskaya-sirniy-tsiplenok_g6bf2p.webp",
  },
];
