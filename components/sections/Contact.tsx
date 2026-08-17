"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MaterialFrame } from "@/components/MaterialFrame";
import { COMPANY } from "@/data/company";
import { PHOTOS } from "@/data/photos";

export function Contact() {
  const reduce = useReducedMotion();

  return (
    <section
      id="contacts"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ink pt-28 pb-8"
    >
      <div aria-hidden className="absolute inset-0 opacity-[0.18]">
        <MaterialFrame
          fit="fill"
          ratio="21/9"
          frame="ворота склада снаружи, утренний свет, видна погрузка пакетов плит, 21:9"
          src={PHOTOS.gate}
          sizes="100vw"
        />
      </div>

      <div className="relative px-5 sm:px-8 lg:px-10">
        <h2 className="sr-only">Контакты</h2>
        <p className="text-display max-w-[20ch] text-[clamp(38px,7vw,104px)] text-paper">
          {COMPANY.addressLines.map((line, index) => (
            <motion.span
              key={line}
              initial={reduce ? undefined : { opacity: 0, y: 28 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 0.55, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </p>

        <motion.div
          initial={reduce ? undefined : { scaleX: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-10 h-px w-full origin-left bg-graphite"
        />

        <p className="mt-8 max-w-[52ch] text-[17px] leading-[1.55] text-paper/70">
          Подберём материалы под ваш проект — приезжайте с размерами или
          отправьте спецификацию.
        </p>
      </div>

      <div className="safe-bottom safe-x relative mt-14 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3 lg:flex-row lg:gap-10">
            <a
              href={COMPANY.phoneHref}
              className="text-data tap border-b border-graphite text-paper transition-colors duration-150 hover:text-core lg:border-none"
            >
              {COMPANY.phone}
            </a>
            <a
              href={COMPANY.emailHref}
              className="text-data tap border-b border-graphite text-paper transition-colors duration-150 hover:text-core lg:border-none"
            >
              {COMPANY.email}
            </a>
            <p className="text-data border-b border-graphite pb-3 text-blade lg:border-none lg:pb-0">
              {COMPANY.hours}
            </p>
            <p className="text-data text-blade">{COMPANY.landmark}</p>
          </div>

          <a
            href={COMPANY.telegram}
            className="text-data inline-flex items-center justify-center border border-paper px-8 py-4 text-paper transition-colors duration-150 hover:bg-paper hover:text-ink max-lg:w-full"
          >
            Написать в Telegram
          </a>
        </div>

        <p className="text-data mt-10 text-graphite">
          {COMPANY.name} · {COMPANY.city}
        </p>
      </div>
    </section>
  );
}
