"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MaterialFrame } from "@/components/MaterialFrame";
import { PHOTOS } from "@/data/photos";

/**
 * Значения — отраслевые стандарты плит и кромки (Kronospan, Egger, Swisspan),
 * а НЕ подтверждённое наличие на складе Nazif Dunyo: под каждой строкой стоит
 * сноска об этом.
 * TODO: replace with real spec from Nazif Dunyo price list.
 */
const SPEC_ROWS = [
  {
    n: "01",
    name: "ЛДСП",
    thickness: "16 / 18 мм",
    format: "2800×2070",
    use: "Корпус, фасады, полки",
    frame: "образец плиты ЛДСП под дерево, верхний рассеянный свет, 3:4",
    src: PHOTOS.specBoard,
  },
  {
    n: "02",
    name: "ЛМДФ",
    thickness: "16 / 18 мм",
    format: "2800×2070",
    use: "Фасады, фрезеровка, гнутые детали",
    frame: "образец однотонного матового ЛМДФ, верхний рассеянный свет, 3:4",
    src: PHOTOS.specMdf,
  },
  {
    n: "03",
    name: "Столешницы",
    thickness: "26 / 38 мм",
    format: "3050×600",
    use: "Кухня, рабочие зоны, подоконники",
    frame: "срез столешницы с постформингом, верхний рассеянный свет, 3:4",
    src: PHOTOS.specWorktop,
  },
  {
    n: "04",
    name: "Кромка и фурнитура",
    thickness: "0,4 / 2 мм",
    format: "22 / 42 мм",
    use: "Обработка торцов, сборка",
    frame: "кромка ПВХ в рулоне рядом с деталью, верхний рассеянный свет, 3:4",
    src: PHOTOS.specEdge,
  },
];

export function Spec() {
  const reduce = useReducedMotion();

  return (
    <section id="materials" className="bg-paper py-20 text-ink sm:py-28">
      <div className="px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-display max-w-[16ch] text-[clamp(34px,6vw,64px)]">
            Что есть на складе
          </h2>
          <p className="max-w-[42ch] text-[17px] leading-[1.5] text-ink/70">
            Плита, МДФ, столешница, кромка — под один проект, одним заказом.
          </p>
        </div>
      </div>

      <div className="mt-14 lg:mt-20">
        {SPEC_ROWS.map((row, index) => (
          <motion.div
            key={row.n}
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.42, ease: "easeOut", delay: index * 0.06 }}
            className="border-t border-ink/15 last:border-b"
          >
            <div className="flex flex-col gap-6 px-5 py-8 sm:px-8 lg:grid lg:grid-cols-[64px_96px_1fr_auto] lg:items-center lg:gap-10 lg:px-10 lg:py-9">
              <span className="text-data text-ink/40">{row.n}</span>

              {/* До lg образец идёт баннером 16:9, на lg — узкой колонкой 3:4 */}
              <div className="group relative aspect-[16/9] w-full lg:aspect-[3/4] lg:w-24">
                <MaterialFrame
                  fit="fill"
                  frame={row.frame}
                  ratio="3/4"
                  src={row.src}
                  zoom
                  sizes="(max-width: 1023px) 100vw, 200px"
                />
              </div>

              <h3 className="text-display text-[clamp(28px,5vw,44px)]">
                {row.name}
              </h3>

              <dl className="grid grid-cols-2 gap-x-8 gap-y-3 lg:flex lg:items-baseline lg:gap-10 lg:text-right">
                <div>
                  <dt className="text-data text-ink/40">Толщина</dt>
                  <dd className="text-data mt-1 text-ink">{row.thickness}</dd>
                </div>
                <div>
                  <dt className="text-data text-ink/40">Формат</dt>
                  <dd className="text-data mt-1 text-ink">{row.format}</dd>
                </div>
                <div className="col-span-2 lg:max-w-[24ch] lg:text-right">
                  <dt className="text-data text-ink/40">Применение</dt>
                  <dd className="mt-1 text-[15px] leading-[1.4] text-ink/80">
                    {row.use}
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-data mt-8 max-w-[70ch] px-5 leading-[1.7] text-ink/40 sm:px-8 lg:px-10">
        Указаны стандартные параметры плит и кромки заводов Kronospan, Egger,
        Swisspan. Фактическое наличие, декоры и цены — по прайсу, уточняйте по
        телефону
      </p>
    </section>
  );
}
