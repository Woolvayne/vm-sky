import type { Metadata } from "next";
import { Mail, ShieldAlert, Clock3 } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Kontaktiere das ${site.name}-Team – Support, Vertrieb und Abuse-Meldungen.`,
};

export default function KontaktPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 md:pt-40">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs tracking-[0.3em] text-aurora-400 uppercase">
              Kontakt
            </p>
            <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-mist-100 md:text-5xl">
              Wir sind <span className="text-gradient">für dich da</span>
            </h1>
            <p className="mt-4 text-mist-300">
              Fragen zu Tarifen, technische Probleme oder ein individuelles
              Angebot? Schreib uns einfach.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <Reveal delay={0.1}>
              <div className="space-y-4">
                <div className="glass-card rounded-3xl p-6">
                  <Mail className="h-6 w-6 text-aurora-400" />
                  <h3 className="font-display mt-3 font-semibold text-mist-100">
                    Support
                  </h3>
                  <p className="mt-1.5 text-sm text-mist-300">
                    Allgemeine Fragen und technische Hilfe:
                  </p>
                  <a
                    href={`mailto:${site.supportEmail}`}
                    className="mt-2 inline-block font-mono text-sm text-aurora-300 hover:underline"
                  >
                    {site.supportEmail}
                  </a>
                </div>
                <div className="glass-card rounded-3xl p-6">
                  <ShieldAlert className="h-6 w-6 text-flare-400" />
                  <h3 className="font-display mt-3 font-semibold text-mist-100">
                    Abuse-Meldungen
                  </h3>
                  <p className="mt-1.5 text-sm text-mist-300">
                    Rechtsverletzungen oder Missbrauch melden:
                  </p>
                  <a
                    href={`mailto:${site.abuseEmail}`}
                    className="mt-2 inline-block font-mono text-sm text-aurora-300 hover:underline"
                  >
                    {site.abuseEmail}
                  </a>
                </div>
                <div className="glass-card rounded-3xl p-6">
                  <Clock3 className="h-6 w-6 text-pulse-400" />
                  <h3 className="font-display mt-3 font-semibold text-mist-100">
                    Antwortzeit
                  </h3>
                  <p className="mt-1.5 text-sm text-mist-300">
                    Wir antworten in der Regel innerhalb von 24 Stunden —
                    bei dringenden Störungen deutlich schneller.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
