export const PHONE = "79990001133";
export const EMAIL = "call54@eda.ru";
export const ADRESS = "просп. Победы 20";
export const SCHEDULE = "Пн-Вс 9:00- 23:30";
export const EXPRESSDELIVERYCOST = 200; // Стоимость экспресс доставки
export const TIPS = 50; // размер чаевых

export const PIZZASIZE = {
  small: 30,
  large: 54,
};
export const ROLLIAMOUNT = {
  small: 4,
  large: 8,
};

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
  ORDERSURL: "http://localhost:3900/orders",
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
