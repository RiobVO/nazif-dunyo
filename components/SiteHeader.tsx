"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { COMPANY, NAV } from "@/data/company";

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    setSolid(value > 40);
  });

  // Первый экран светлый — до скролла хедер идёт тёмным текстом по бумаге,
  // после — инвертируется вместе с фоном.
  const onLight = !solid && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid && !open ? "bg-ink" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-6 px-5 py-5 sm:px-8 lg:px-10">
          <a
            href="#top"
            className={`text-display text-[15px] tracking-[0.16em] uppercase transition-colors duration-300 ${
              onLight ? "text-ink" : "text-paper"
            }`}
          >
            {COMPANY.name}
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-[14px] transition-colors duration-300 hover:text-core ${
                  onLight ? "text-ink/70" : "text-paper/80"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={COMPANY.phoneHref}
              className={`text-data transition-colors duration-300 hover:text-core ${
                onLight ? "text-ink" : "text-paper"
              }`}
            >
              {COMPANY.phone}
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`text-data transition-colors duration-300 lg:hidden ${
              onLight ? "text-ink" : "text-paper"
            }`}
          >
            {open ? "Закрыть" : "Меню"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-5 pt-24 pb-10 lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-display border-b border-graphite py-4 text-[clamp(30px,9vw,44px)] text-paper"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-10 flex flex-col gap-2">
              <a href={COMPANY.phoneHref} className="text-data text-core">
                {COMPANY.phone}
              </a>
              <p className="text-data text-blade">{COMPANY.hoursShort}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
