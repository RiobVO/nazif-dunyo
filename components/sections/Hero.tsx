"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { MaterialFrame } from "@/components/MaterialFrame";
import { COMPANY } from "@/data/company";
import { DECORS } from "@/data/decors";
import { PHOTOS } from "@/data/photos";

const SLIDES = [
  {
    src: PHOTOS.heroSurface,
    title: "Срез плиты",
    meta: "ЛДСП · 18 мм",
    frame:
      "торец ЛДСП крупным планом, видна структура стружки и кромка, жёсткий боковой свет, 21:9",
  },
  {
    src: DECORS[0].texture,
    title: DECORS[0].name,
    meta: `${DECORS[0].id} · дерево`,
    frame: DECORS[0].frame,
  },
  {
    src: DECORS[8].texture,
    title: DECORS[8].name,
    meta: `${DECORS[8].id} · камень`,
    frame: DECORS[8].frame,
  },
  {
    src: PHOTOS.surfaceBoard,
    title: "Склад в Сергели",
    meta: "листы в наличии",
    frame: "листы ЛДСП, поставленные вертикально у стены склада, боковой свет, 21:9",
  },
];

const SLIDE_MS = 5000;

/** Слово как отдельный span — чтобы строка раскрывалась по словам, а не целиком. */
function Words({
  text,
  className = "",
  delay = 0,
  reduce,
}: {
  text: string;
  className?: string;
  delay?: number;
  reduce: boolean | null;
}) {
  return (
    <span className={`inline-flex flex-wrap justify-center gap-x-[0.25em] ${className}`}>
      {/* Маска реврила выше строки: иначе overflow-hidden срезает выносные
          элементы («д», «р», «у», «Ц») и запятые. Отрицательные margin
          возвращают исходный межстрочный интервал. */}
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="-mt-[0.1em] -mb-[0.26em] overflow-hidden pt-[0.1em] pb-[0.26em]"
        >
          <motion.span
            className="inline-block"
            initial={reduce ? undefined : { y: "105%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.85,
              delay: delay + index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Прогресс берётся от глобального scrollY в пикселях, а не от target-секции:
  // с overflow-x: clip на html прогресс секции почти не растёт.
  const { scrollY } = useScroll();

  // Скролл только подталкивает композицию: кадр чуть наезжает, типографика
  // отстаёт. Размеры бокса не меняются — иначе под ним открывается пустота.
  const imageScale = useTransform(scrollY, [0, 700], [1, 1.09]);
  const frameY = useTransform(scrollY, [0, 700], [0, -40]);
  const typeY = useTransform(scrollY, [0, 700], [0, 46]);

  useEffect(() => {
    if (reduce || paused) return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % SLIDES.length),
      SLIDE_MS,
    );
    return () => window.clearInterval(timer);
  }, [reduce, paused]);

  const slide = SLIDES[active];

  return (
    <section
      id="top"
      className="hero-shell relative flex min-h-[100svh] flex-col bg-paper text-ink"
    >
      <div className="hero-body flex flex-1 flex-col justify-center pt-24 pb-6 lg:pt-28">
        <motion.div
          style={reduce ? undefined : { y: frameY }}
          className="hero-frame relative mx-auto h-[40svh] w-[92vw] overflow-hidden bg-ink lg:h-[46svh]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={slide.src}
              className="absolute inset-0"
              initial={reduce ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            >
              <motion.div
                style={reduce ? undefined : { scale: imageScale }}
                className="absolute inset-0"
              >
                <MaterialFrame
                  fit="fill"
                  ratio="21/9"
                  src={slide.src}
                  frame={slide.frame}
                  priority={active === 0}
                  sizes="100vw"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Раскрытие кадра при загрузке: створки расходятся от центра.
              Рендерятся всегда — условный рендер ломал бы гидрацию при
              prefers-reduced-motion, поэтому гасится только анимация. */}
          <motion.span
            aria-hidden
            className="absolute inset-x-0 top-0 z-20 bg-paper"
            initial={{ height: reduce ? "0%" : "50%" }}
            animate={{ height: "0%" }}
            transition={{ duration: reduce ? 0 : 1.15, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.span
            aria-hidden
            className="absolute inset-x-0 bottom-0 z-20 bg-paper"
            initial={{ height: reduce ? "0%" : "50%" }}
            animate={{ height: "0%" }}
            transition={{ duration: reduce ? 0 : 1.15, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-6 bg-gradient-to-t from-ink/80 to-transparent p-4 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.title}
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <p className="text-[13px] leading-tight whitespace-nowrap text-paper sm:text-[15px]">
                  {slide.title}
                </p>
                <p className="text-data mt-1 whitespace-nowrap text-core max-[359px]:hidden">
                  {slide.meta}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex shrink-0 gap-2" role="group" aria-label="Кадры">
              {SLIDES.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Кадр ${index + 1}: ${item.title}`}
                  aria-current={index === active}
                  className="tap w-8 justify-center"
                >
                  <span
                    className={`block h-[2px] w-full transition-colors duration-300 ${
                      index === active ? "bg-core" : "bg-paper/35 hover:bg-paper/70"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          style={reduce ? undefined : { y: typeY }}
          className="hero-type mt-7 px-5 text-center sm:px-8 lg:mt-9"
        >
          {/* Ширина в px, а не в ch: ch считается от базового кегля h1
              и схлопывал бы строки в узкую колонку */}
          <h1 className="mx-auto max-w-[920px] leading-[0.98]">
            <Words
              reduce={reduce}
              delay={0.55}
              text="ЛДСП, ЛМДФ, столешницы"
              className="text-display text-[clamp(26px,3.7vw,52px)] tracking-[-0.02em] uppercase"
            />
            <Words
              reduce={reduce}
              delay={0.75}
              text="для мебельного производства"
              className="mt-1 font-[family-name:var(--font-serif)] text-[clamp(28px,4.3vw,60px)] leading-[1.06] font-normal text-ink/90 italic"
            />
          </h1>

          <motion.p
            initial={reduce ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.15 }}
            className="hero-lede mx-auto mt-5 max-w-[54ch] text-[15px] leading-[1.6] text-ink/65 sm:text-[16px]"
          >
            Ташкент, Сергели. Держим склад плиты, режем лист в размер по вашей
            карте раскроя и подбираем декор под проект.
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.35 }}
        className="safe-bottom safe-x flex flex-col items-center justify-between gap-1 border-t border-ink/12 py-1 sm:flex-row sm:py-4 lg:px-10"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
          <a
            href={COMPANY.phoneHref}
            className="text-data tap text-ink transition-colors duration-150 hover:text-core"
          >
            {COMPANY.phone}
          </a>
          <span className="text-data text-ink/45">{COMPANY.hoursShort}</span>
        </div>

        <a
          href="#materials"
          className="text-data tap group hidden items-center gap-3 text-ink/45 transition-colors duration-150 hover:text-ink sm:flex"
        >
          Смотреть материалы
          <span className="relative block h-6 w-px overflow-hidden bg-ink/25">
            <motion.span
              className="absolute inset-x-0 top-0 block h-2 bg-core"
              animate={reduce ? { y: 8 } : { y: [-8, 24] }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
              }
            />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
