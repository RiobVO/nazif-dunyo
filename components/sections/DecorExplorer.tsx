"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MaterialFrame } from "@/components/MaterialFrame";
import { DECOR_CATEGORIES, DECORS, type DecorCategory } from "@/data/decors";

const SWIPE_THRESHOLD = 40;

export function DecorExplorer() {
  const reduce = useReducedMotion();
  const [category, setCategory] = useState<DecorCategory | "all">("all");
  const [activeId, setActiveId] = useState(DECORS[0].id);
  const tabsRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const visible = useMemo(
    () =>
      category === "all"
        ? DECORS
        : DECORS.filter((decor) => decor.category === category),
    [category],
  );

  const activeIndex = Math.max(
    0,
    visible.findIndex((decor) => decor.id === activeId),
  );
  const active = visible[activeIndex] ?? visible[0];

  const selectCategory = (next: DecorCategory | "all") => {
    setCategory(next);
    const nextList =
      next === "all" ? DECORS : DECORS.filter((decor) => decor.category === next);
    if (!nextList.some((decor) => decor.id === activeId)) {
      setActiveId(nextList[0].id);
    }
  };

  const step = (delta: number) => {
    const next = (activeIndex + delta + visible.length) % visible.length;
    setActiveId(visible[next].id);
  };

  return (
    <section id="decors" className="bg-ink">
      <div className="flex h-[100svh] flex-col">
        <div
          className="relative flex-1 overflow-hidden border-b border-graphite lg:flex-[72]"
          onTouchStart={(event) => {
            touchStart.current = {
              x: event.touches[0].clientX,
              y: event.touches[0].clientY,
            };
          }}
          onTouchEnd={(event) => {
            if (!touchStart.current) return;
            const dx = event.changedTouches[0].clientX - touchStart.current.x;
            const dy = event.changedTouches[0].clientY - touchStart.current.y;
            // Жест засчитывается только как горизонтальный: иначе обычная
            // вертикальная прокрутка страницы перелистывала бы декоры.
            if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.5) {
              step(dx < 0 ? 1 : -1);
            }
            touchStart.current = null;
          }}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={active.id}
              initial={reduce ? undefined : { opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <MaterialFrame
                fit="fill"
                ratio="1/1"
                frame={active.frame}
                src={active.texture}
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/60" />

          {/* Отступ сверху — чтобы фильтры не уходили под фиксированный хедер */}
          <div className="rail absolute inset-x-5 top-20 flex gap-x-2 overflow-x-auto sm:inset-x-8 lg:inset-x-10 lg:top-24 lg:justify-end lg:gap-x-3 lg:overflow-visible">
            {DECOR_CATEGORIES.map((item) => {
              const selected = item.id === category;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectCategory(item.id)}
                  aria-pressed={selected}
                  className={`text-data tap shrink-0 px-2 pb-1 transition-colors duration-150 ${
                    selected
                      ? "border-b border-core text-core"
                      : "border-b border-transparent text-paper/70 hover:text-paper"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 lg:inset-x-10 lg:bottom-8">
            <div className="flex items-end justify-between gap-6">
              <div aria-live="polite">
                <motion.h3
                  key={`${active.id}-title`}
                  initial={reduce ? undefined : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  className="text-display text-[clamp(30px,5vw,60px)] text-paper"
                >
                  {active.name}
                </motion.h3>
                <p className="text-data mt-3 text-core">
                  {active.id} · {DECOR_CATEGORIES.find((c) => c.id === active.category)?.label}
                </p>
              </div>

              <motion.div
                key={`${active.id}-interior`}
                initial={reduce ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.32, delay: reduce ? 0 : 0.12 }}
                className="group hidden w-[320px] border border-graphite lg:block"
              >
                <MaterialFrame
                  frame={active.interiorFrame}
                  ratio="3/2"
                  src={active.interior}
                  zoom
                  sizes="360px"
                />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="shrink-0 px-5 py-5 sm:px-8 lg:flex-[28] lg:px-10 lg:py-8">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="text-display text-[clamp(22px,3vw,34px)] text-paper">
              Декоры
            </h2>
            <p className="hidden max-w-[46ch] text-[15px] leading-[1.5] text-paper/60 lg:block">
              Дерево, камень, однотонные — что есть в наличии и что возим под
              заказ.
            </p>
          </div>

          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Декоры"
            aria-orientation="horizontal"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                step(1);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                step(-1);
              }
            }}
            className="rail mt-5 flex gap-3 overflow-x-auto pb-1 lg:mt-6 lg:gap-4"
          >
            {visible.map((decor) => {
              const selected = decor.id === active.id;
              return (
                <button
                  key={decor.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(decor.id)}
                  className={`group relative size-[72px] shrink-0 lg:size-[120px] ${
                    selected
                      ? "outline-2 outline-core"
                      : "outline-1 outline-graphite hover:outline-blade"
                  }`}
                >
                  <MaterialFrame
                    fit="fill"
                    ratio="1/1"
                    frame={decor.frame}
                    src={decor.texture}
                    sizes="160px"
                  />
                  <span className="text-data absolute inset-x-0 bottom-0 truncate bg-ink/85 px-1 py-1 text-[11px] text-paper/90">
                    {decor.id}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-data mt-4 text-blade">
            <span className="lg:hidden">Свайп по поверхности — следующий декор · </span>
            Названия — ходовые декоры рынка; артикул и наличие уточняйте по прайсу
          </p>
        </div>
      </div>
    </section>
  );
}
