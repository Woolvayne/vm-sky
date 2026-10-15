import { Suspense } from "react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/home/hero";
import { PlanCards } from "@/components/home/plan-cards";
import { FeatureGrid, HowItWorks, OsMarquee, CtaSection } from "@/components/home/sections";
import { Faq } from "@/components/home/faq";
import { Reveal } from "@/components/site/reveal";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <OsMarquee />

        <section className="relative py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-xs tracking-[0.3em] text-aurora-400 uppercase">
                Tarife
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-mist-100 md:text-5xl">
                Klare Preise, ehrliche Ressourcen
              </h2>
              <p className="mt-5 text-mist-300">
                Alle Preise gelten für 30 Tage und enthalten die IPv4-Adresse,
                den 1&nbsp;Gbit/s-Port sowie die DDoS-Filterung. Verlängere
                wann immer du willst — für 30 bis 365 Tage.
              </p>
            </Reveal>
            <div className="mt-16">
              <Suspense
                fallback={
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="glass-card h-96 animate-pulse rounded-3xl"
                      />
                    ))}
                  </div>
                }
              >
                <PlanCards />
              </Suspense>
            </div>
          </div>
        </section>

        <FeatureGrid />
        <HowItWorks />

        <section id="faq" className="relative py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-xs tracking-[0.3em] text-aurora-400 uppercase">
                FAQ
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-mist-100 md:text-5xl">
                Häufige Fragen
              </h2>
            </Reveal>
            <div className="mt-14">
              <Faq />
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
