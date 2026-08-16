"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MaterialFrame } from "@/components/MaterialFrame";
import { PHOTOS } from "@/data/photos";

const TERMS = [
  "оптовые партии",
  "подбор под спецификацию",
  "отгрузка со склада в Сергели",
];

export function Wholesale() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="wholesale"
      ref={ref}
      className="relative bg-ink lg:grid lg:grid-cols-12 lg:gap-10 lg:py-32"
    >
      <div className="relative h-[62svh] overflow-hidden lg:col-span-5 lg:h-[84svh]">
        <motion.div style={reduce ? undefined : { y }} className="absolute inset-[-6%]">
          <MaterialFrame
            fit="fill"
            ratio="3/4"
            frame="складской пролёт с вертикально стоящими пакетами плит, перспектива вглубь, естественный свет из окна, 3:4"
            src={PHOTOS.warehouse}
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        </motion.div>
      </div>

      <div className="relative z-10 -mt-12 px-5 sm:px-8 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:px-0 lg:pt-[180px]">
        <motion.h2
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-display bg-ink py-4 pr-4 text-[clamp(30px,5vw,56px)] text-paper lg:bg-transparent lg:py-0 lg:pr-0"
        >
          Мебельным производствам и дизайнерам
        </motion.h2>

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.5, delay: 0.07, ease: "easeOut" }}
          className="mt-6 max-w-[44ch] text-[17px] leading-[1.55] text-paper/70"
        >
          Держим повторяемость декора между партиями и считаем объём по вашей
          спецификации.
        </motion.p>

        <ul className="mt-10 border-t border-graphite">
          {TERMS.map((term, index) => (
            <motion.li
              key={term}
              initial={reduce ? undefined : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
              className="text-data border-b border-graphite py-4 text-paper/85"
            >
              {term}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
