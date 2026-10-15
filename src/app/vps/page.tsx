import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { AuroraBackground } from "@/components/site/aurora";
import { Reveal } from "@/components/site/reveal";
import { PlanCards } from "@/components/home/plan-cards";
import { Configurator } from "@/components/vps/configurator";
import { CtaSection } from "@/components/home/sections";

export const metadata: Metadata = {
  title: "VPS-Tarife & Konfigurator",
  description:
    "KVM-VPS auf AMD Ryzen in Deutschland: fertige Tarife oder individuell konfiguriert. NVMe, 1 Gbit/s, DDoS-Schutz inklusive — ohne Abo.",
};

export default function VpsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-36 pb-16 md:pt-44">
          <AuroraBackground />
          <div className="relative mx-auto max-w-7xl px-5 md:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-xs tracking-[0.3em] text-aurora-400 uppercase">
                VPS-Tarife
              </p>
              <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-mist-100 md:text-6xl">
                Wähle deine <span className="text-gradient">Leistungsklasse</span>
              </h1>
              <p className="mt-5 text-mist-300">
                Preise pro 30 Tage inklusive IPv4-Adresse, 1&nbsp;Gbit/s-Port und
                DDoS-Filter. Alle Tarife laufen auf AMD Ryzen 7 3700X @ 4,4&nbsp;GHz
                mit DDR4-RAM in Deutschland.
              </p>
            </Reveal>
            <div className="mt-16">
              <Suspense
                fallback={
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="glass-card h-96 animate-pulse rounded-3xl" />
                    ))}
                  </div>
                }
              >
                <PlanCards />
              </Suspense>
            </div>
          </div>
        </section>

        <section id="konfigurator" className="relative scroll-mt-24 py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-xs tracking-[0.3em] text-aurora-400 uppercase">
                Konfigurator
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-mist-100 md:text-5xl">
                Baue deinen eigenen Server
              </h2>
              <p className="mt-5 text-mist-300">
                Kerne, RAM und NVMe frei wählbar — der Preis passt sich live an.
              </p>
            </Reveal>
            <div className="mt-14">
              <Configurator />
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
