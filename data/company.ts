/**
 * Контактные данные взяты из открытых справочников (top.uz, 2gis, yellowpages.uz)
 * и НЕ подтверждены компанией.
 * TODO: verify with Nazif Dunyo before publishing.
 */
export const COMPANY = {
  name: "NAZIF DUNYO",
  city: "Ташкент",
  // Разбито на строки вручную: автоперенос рвёт «р-н» по дефису
  addressLines: ["Ташкент,", "Сергелийский район,", "ул. Сугдиёна, 4А"],
  addressShort: "Ташкент, Сергели",
  phone: "+998 71 258-07-22",
  phoneHref: "tel:+998712580722",
  phoneSecond: "+998 71 258-19-06",
  phoneSecondHref: "tel:+998712581906",
  email: "nazif_dunyo@mail.ru",
  emailHref: "mailto:nazif_dunyo@mail.ru",
  hours: "Пн–Пт 9:00–18:00, перерыв 13:00–14:00",
  hoursShort: "Пн–Пт 9:00–18:00",
  landmark: "ориентир: хокимият Сергелийского района",
  // TODO: replace with real Telegram account
  telegram: "#",
} as const;

export const NAV = [
  { label: "Материалы", href: "#materials" },
  { label: "Декоры", href: "#decors" },
  { label: "Услуги", href: "#services" },
  { label: "Производствам", href: "#wholesale" },
  { label: "Контакты", href: "#contacts" },
] as const;
