import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { Spec } from "@/components/sections/Spec";
import { Surfaces } from "@/components/sections/Surfaces";
import { DecorExplorer } from "@/components/sections/DecorExplorer";
import { Process } from "@/components/sections/Process";
import { Wholesale } from "@/components/sections/Wholesale";
import { Contact } from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Spec />
        <Surfaces />
        <DecorExplorer />
        <Process />
        <Wholesale />
        <Contact />
      </main>
    </>
  );
}
