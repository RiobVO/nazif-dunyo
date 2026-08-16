import { px } from "./photos";

export type DecorCategory = "wood" | "light" | "dark" | "stone" | "plain";

export type Decor = {
  id: string;
  name: string;
  category: DecorCategory;
  /** Описание кадра текстуры: идёт в placeholder и в alt реального фото. */
  frame: string;
  /** Описание интерьерного кадра с этим декором. */
  interiorFrame: string;
  /** Временный референс текстуры (стоковое фото, см. data/photos.ts). */
  texture: string;
  /** Временный референс применения в интерьере. */
  interior: string;
};

export const DECOR_CATEGORIES: { id: DecorCategory | "all"; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "wood", label: "Дерево" },
  { id: "light", label: "Светлые" },
  { id: "dark", label: "Тёмные" },
  { id: "stone", label: "Камень" },
  { id: "plain", label: "Однотонные" },
];

/**
 * Названия — ходовые рыночные декоры ЛДСП (встречаются в каталогах Kronospan,
 * Egger, Swisspan). Номера ND-XX внутренние, демонстрационные.
 *
 * TODO: replace with real Nazif Dunyo catalog — артикулы производителя,
 * фактическое наличие и толщины по прайсу.
 */
export const DECORS: Decor[] = [
  {
    id: "ND-01",
    name: "Дуб Крафт золотой",
    category: "wood",
    frame: "текстура ЛДСП «дуб крафт золотой», фронтально, рассеянный свет, 1:1",
    interiorFrame: "кухонные фасады в тёплом дубе, дневной свет, 3:2",
    texture: px(37225886, 1400),
    interior: px(8089082, 1200),
  },
  {
    id: "ND-02",
    name: "Дуб Сонома",
    category: "wood",
    frame: "текстура ЛДСП «дуб сонома», фронтально, рассеянный свет, 1:1",
    interiorFrame: "светлая кухня с фасадами под дуб, дневной свет, 3:2",
    texture: px(6544938, 1400),
    interior: px(4030908, 1200),
  },
  {
    id: "ND-03",
    name: "Орех тёмный",
    category: "wood",
    frame: "текстура ЛДСП под тёмный орех, фронтально, рассеянный свет, 1:1",
    interiorFrame: "встроенный шкаф из тёмного ореха, боковой свет, 3:2",
    texture: px(5225594, 1400),
    interior: px(8146322, 1200),
  },
  {
    id: "ND-04",
    name: "Ясень серый",
    category: "wood",
    frame: "текстура ЛДСП под серый ясень, фронтально, рассеянный свет, 1:1",
    interiorFrame: "корпусная мебель в сером ясене, дневной свет, 3:2",
    texture: px(129721, 1400),
    interior: px(6283972, 1200),
  },
  {
    id: "ND-05",
    name: "Белый альпийский",
    category: "light",
    frame: "текстура белого ЛМДФ, фронтально, рассеянный свет, 1:1",
    interiorFrame: "белые матовые фасады кухни, дневной свет, 3:2",
    texture: px(14583331, 1400),
    interior: px(7535073, 1200),
  },
  {
    id: "ND-06",
    name: "Кашемир",
    category: "light",
    frame: "текстура ЛДСП цвета кашемир, фронтально, рассеянный свет, 1:1",
    interiorFrame: "кухонный гарнитур в цвете кашемир, мягкий свет, 3:2",
    texture: px(4737954, 1400),
    interior: px(94865, 1200),
  },
  {
    id: "ND-07",
    name: "Графит",
    category: "dark",
    frame: "текстура ЛДСП цвета графит, фронтально, рассеянный свет, 1:1",
    interiorFrame: "графитовая кухня со светлой столешницей, 3:2",
    texture: px(13778388, 1400),
    interior: px(2398375, 1200),
  },
  {
    id: "ND-08",
    name: "Антрацит",
    category: "dark",
    frame: "текстура чёрного матового ЛМДФ, фронтально, рассеянный свет, 1:1",
    interiorFrame: "чёрные матовые фасады в интерьере кухни, 3:2",
    texture: px(7599717, 1400),
    interior: px(7061393, 1200),
  },
  {
    id: "ND-09",
    name: "Мрамор Леванто",
    category: "stone",
    frame: "текстура столешницы под светлый мрамор, фронтально, 1:1",
    interiorFrame: "островная столешница под светлый мрамор, 3:2",
    texture: px(3847492, 1400),
    interior: px(6969865, 1200),
  },
  {
    id: "ND-10",
    name: "Бетон Чикаго",
    category: "plain",
    frame: "текстура ЛДСП под бетон, фронтально, рассеянный свет, 1:1",
    interiorFrame: "рабочая зона с фасадами под бетон, 3:2",
    texture: px(3964666, 1400),
    interior: px(7167061, 1200),
  },
];
