import type { Metadata } from "next";
import {
  Golos_Text,
  Inter_Tight,
  JetBrains_Mono,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

// Archivo из proposal не поддерживает кириллицу — заменён на Golos Text
// (тот же класс нейтрального гротеска, есть кириллица и вес 900).
const display = Golos_Text({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "900"],
});

const sans = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
});

// Антиква для второй строки заголовка первого экрана: контраст гротеска
// и высококонтрастной серифной строки — приём, взятый с Fenix.
const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Nazif Dunyo — ЛДСП, ЛМДФ, столешницы. Ташкент",
  description:
    "Материалы для мебельного производства: ЛДСП, ЛМДФ, столешницы, кромка. Распил в размер и подбор декоров. Ташкент, Сергелийский район.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${serif.variable} h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
