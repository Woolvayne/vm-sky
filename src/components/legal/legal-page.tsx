import type { ReactNode } from "react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/reveal";

export function LegalPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 md:pt-40">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-aurora-400 uppercase">
              Rechtliches
            </p>
            <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-mist-100 md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-sm text-mist-500">{subtitle}</p>
          </Reveal>
          <div className="prose-legal mt-12">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
