import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/reveal";
import { StatusLookup } from "@/components/status/status-lookup";

export const metadata: Metadata = {
  title: "Bestellstatus",
  description: "Prüfe den Status deiner Server-Bestellung.",
};

export default async function StatusPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const nr = typeof query.nr === "string" ? query.nr : "";
  const email = typeof query.email === "string" ? query.email : "";

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 md:pt-40">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs tracking-[0.3em] text-aurora-400 uppercase">
              Bestellstatus
            </p>
            <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-mist-100 md:text-5xl">
              Wo steht <span className="text-gradient">mein Server?</span>
            </h1>
            <p className="mt-4 text-mist-300">
              Gib deine Bestellnummer und die E-Mail-Adresse aus der Bestellung
              ein, um den aktuellen Status abzufragen.
            </p>
          </Reveal>
          <div className="mt-12">
            <StatusLookup initialNumber={nr} initialEmail={email} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
