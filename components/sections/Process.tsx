"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { MaterialFrame } from "@/components/MaterialFrame";
import { PHOTOS } from "@/data/photos";
import { useMediaQuery } from "@/lib/useMediaQuery";

const STEPS = [
  {
    n: "01",
    title: "Карта раскроя",
    text: "Присылаете спецификацию или размеры деталей — считаем расход листа.",
    frame: "раскроечный станок в работе, летящая стружка, боковой свет, 4:3",
    src: PHOTOS.processPlan,
  },
  {
    n: "02",
    title: "Раскрой",
    text: "Режем плиту в размер, детали складываем по карте.",
    frame: "руки укладывают детали в стопку по карте раскроя, 4:3",
    src: PHOTOS.processCut,
  },
  {
    n: "03",
    title: "Кромка",
    text: "Оклеиваем торцы кромкой, подобранной к декору плиты.",
    frame:
      "кромкооблицовочный станок, лента кромки заходит на деталь, 4:3",
    src: PHOTOS.processEdge,
  },
  {
    n: "04",
    title: "Выдача",
    text: "Собираем заказ в пакет и отдаём со склада в Сергели.",
    frame:
      "готовая стопка деталей, обвязанная стрейчем, у ворот склада, 4:3",
    src: PHOTOS.processPack,
  },
];

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [step, setStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-96vw"]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setStep(Math.min(STEPS.length - 1, Math.max(0, Math.floor(value * 4))));
  });

  // Sticky-рельс только на десктопе и только без prefers-reduced-motion:
  // в остальных случаях маршрут разворачивается вертикально.
  const rail = isDesktop && !reduce;

  const heading = (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <h2 className="text-display max-w-[14ch] text-[clamp(34px,6vw,64px)]">
        Распил, кромка, подбор
      </h2>
      <p className="max-w-[40ch] text-[17px] leading-[1.5] text-ink/70">
        Привозите карту раскроя — отдаём готовые детали в размер.
      </p>
    </div>
  );

  if (!rail) {
    return (
      <section id="services" className="bg-paper py-20 text-ink sm:py-28">
        <div className="px-5 sm:px-8 lg:px-10">{heading}</div>
        <ol className="mt-14 space-y-14 px-5 sm:px-8 lg:px-10">
          {STEPS.map((item) => (
            <li key={item.n} className="border-l border-ink/20 pl-5 sm:pl-8">
              <span className="text-data text-core">{item.n}</span>
              <div className="group mt-4 w-full max-w-[560px]">
                <MaterialFrame
                  frame={item.frame}
                  ratio="4/3"
                  src={item.src}
                  zoom
                  sizes="(max-width: 1023px) 92vw, 640px"
                />
              </div>
              <h3 className="text-display mt-5 text-[clamp(24px,6vw,34px)]">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[38ch] text-[16px] leading-[1.5] text-ink/70">
                {item.text}
              </p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section id="services" ref={ref} className="relative h-[240svh] bg-paper text-ink">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="px-10">{heading}</div>

        <div className="mt-10 px-10">
          <div className="relative h-px w-full bg-ink/20">
            {/* Прогресс маршрута: заливка линии по мере прокрутки секции */}
            <motion.span
              style={{ scaleX: scrollYProgress }}
              className="absolute inset-0 h-px origin-left bg-core"
            />
            {STEPS.map((item, index) => (
              <span
                key={item.n}
                className={`text-data absolute -translate-x-1/2 pt-3 transition-colors duration-200 ${
                  index === step ? "text-core" : "text-ink/35"
                }`}
                style={{ left: `${(index / (STEPS.length - 1)) * 100}%` }}
              >
                {item.n}
              </span>
            ))}
          </div>
        </div>

        <motion.div style={{ x }} className="mt-14 flex gap-8 px-10 will-change-transform">
          {STEPS.map((item) => (
            <div key={item.n} className="group w-[44vw] shrink-0">
              <MaterialFrame
                frame={item.frame}
                ratio="4/3"
                src={item.src}
                zoom
                sizes="50vw"
              />
              <h3 className="text-display mt-5 text-[28px]">{item.title}</h3>
              <p className="mt-2 max-w-[34ch] text-[16px] leading-[1.5] text-ink/70">
                {item.text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
