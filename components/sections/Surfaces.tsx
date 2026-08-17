"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { MaterialFrame } from "@/components/MaterialFrame";
import { PHOTOS } from "@/data/photos";

const SURFACES = [
  {
    title: "ЛДСП",
    note: "Корпус, фасады, полки.",
    detail: "Декоры под дерево, камень и однотон",
    frame:
      "лист ЛДСП, поставленный вертикально у стены цеха, боковой свет, 3:4",
    src: PHOTOS.surfaceBoard,
    height: "lg:h-[80svh]",
  },
  {
    title: "ЛМДФ",
    note: "Фрезеровка и гнутые детали.",
    detail: "Матовая поверхность без бликов",
    frame: "стопка ЛМДФ сбоку, виден срез пакета, скользящий свет, 3:4",
    src: PHOTOS.surfaceMdf,
    height: "lg:h-[60svh]",
  },
  {
    title: "Столешницы",
    note: "Кухня и рабочие зоны.",
    detail: "Постформинг, обработанная кромка",
    frame: "столешница на верстаке под тёплым светом, снято под углом, 3:4",
    src: PHOTOS.surfaceWorktop,
    height: "lg:h-[100svh]",
  },
  {
    title: "Кромка и фурнитура",
    note: "Обработка торцов и сборка.",
    detail: "Подбирается к декору плиты",
    frame: "фрагмент готового фасада в интерьере, мягкий дневной свет, 3:4",
    src: PHOTOS.surfaceEdge,
    height: "lg:h-[70svh]",
  },
];

function SurfaceItem({
  index,
  onActive,
  children,
}: {
  index: number;
  onActive: (index: number) => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% -40% -45% -40%" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return <div ref={ref}>{children}</div>;
}

export function Surfaces() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = SURFACES[active];

  return (
    <section className="relative bg-ink py-20 lg:py-0">
      <div className="lg:grid lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="hidden lg:col-span-3 lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={reduce ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <span className="text-data text-core">
                0{active + 1} / 0{SURFACES.length}
              </span>
              <h3 className="text-display mt-4 text-[clamp(36px,3.6vw,56px)] text-paper">
                {current.title}
              </h3>
              <p className="mt-4 max-w-[24ch] text-[17px] leading-[1.5] text-paper/70">
                {current.note}
              </p>
              <p className="text-data mt-6 text-blade">{current.detail}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="lg:col-span-9 lg:py-[8svh]">
          <div className="rail flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 lg:flex-col lg:gap-28 lg:overflow-visible lg:px-0 lg:pb-0">
            {SURFACES.map((surface, index) => (
              <SurfaceItem key={surface.title} index={index} onActive={setActive}>
                <motion.div
                  initial={reduce ? undefined : { clipPath: "inset(100% 0 0 0)" }}
                  whileInView={
                    reduce ? undefined : { clipPath: "inset(0% 0 0 0)" }
                  }
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                  className={`group relative h-[62svh] w-[88vw] shrink-0 snap-center lg:w-full ${surface.height}`}
                >
                  <MaterialFrame
                    fit="fill"
                    ratio="3/4"
                    frame={surface.frame}
                    src={surface.src}
                    zoom
                    sizes="(max-width: 1023px) 88vw, 70vw"
                  />
                </motion.div>
              </SurfaceItem>
            ))}
          </div>
        </div>
      </div>

      <div className="safe-bottom safe-x sticky bottom-0 mt-6 border-t border-graphite bg-ink pt-5 lg:hidden">
        <span className="text-data text-core">
          0{active + 1} / 0{SURFACES.length}
        </span>
        <h3 className="text-display mt-2 text-[clamp(28px,8vw,40px)] text-paper">
          {current.title}
        </h3>
        <p className="mt-2 text-[15px] text-paper/70">{current.note}</p>
      </div>
    </section>
  );
}
