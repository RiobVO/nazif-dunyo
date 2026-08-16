/**
 * ВРЕМЕННЫЕ РЕФЕРЕНС-КАДРЫ.
 *
 * Это стоковые фотографии с Pexels (Pexels License: свободное использование,
 * атрибуция не требуется). Они НЕ являются фотографиями Nazif Dunyo и стоят
 * здесь только чтобы показать композицию с реальными изображениями.
 *
 * TODO: replace every URL with photos of Nazif Dunyo production and materials.
 * Описание нужного кадра для съёмки лежит в пропе `frame` соответствующего
 * <MaterialFrame> — оно же используется как alt.
 *
 * Убрать стоковые кадры целиком можно одной правкой: вернуть `undefined`
 * из функции px() — вся вёрстка вернётся к плейсхолдерам без изменений разметки.
 */

/** Строит URL кадра нужной ширины. */
export const px = (id: number, width = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

export const PHOTOS = {
  heroSurface: px(10838921, 2000),

  specBoard: px(37225886, 900),
  specMdf: px(14583331, 900),
  specWorktop: px(3847492, 900),
  specEdge: px(7479035, 900),

  surfaceBoard: px(7479035, 1400),
  surfaceMdf: px(5089122, 1400),
  surfaceWorktop: px(6969865, 1400),
  surfaceEdge: px(8089082, 1400),

  processPlan: px(37162555, 1400),
  processCut: px(5710853, 1400),
  processEdge: px(5710910, 1400),
  processPack: px(12278588, 1400),

  warehouse: px(12278570, 1400),
  gate: px(12278585, 2000),
} as const;
