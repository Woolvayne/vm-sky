import Link from "next/link";
import {
  ArrowRight,
  CloudUpload,
  CreditCard,
  Gauge,
  HardDrive,
  KeyRound,
  LifeBuoy,
  Network,
  Server,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { AuroraBackground } from "@/components/site/aurora";

/* ------------------------------ Feature-Grid ----------------------------- */

const featureItems = [
  {
    icon: Server,
    title: "Echte KVM-Virtualisierung",
    text: "Kein Container, keine geteilten Kernel: Jeder Server läuft als vollwertige KVM-VM mit garantierten Ressourcen und eigenem Kernel.",
  },
  {
    icon: Gauge,
    title: "Ryzen-Leistung",
    text: "AMD Ryzen 7 3700X mit bis zu 4,4 GHz Boost Taktzahl und DDR4-RAM — gebaut für kompilieren, rendern, hosten und skalieren.",
  },
  {
    icon: HardDrive,
    title: "NVMe-Speicher",
    text: "Lokale NVMe-SSDs liefern hohe IOPS und niedrige Latenz — spürbar schneller bei Datenbanken, Builds und Bootvorgängen.",
  },
  {
    icon: Network,
    title: "1 Gbit/s-Anbindung",
    text: "Voller Port ohne Drosselung für jeden Tarif. Traffic fair use — ideal für Webprojekte, APIs und Game-Server.",
  },
  {
    icon: ShieldCheck,
    title: "DDoS-Filterung",
    text: "Mehrstufiger Schicht-3/4/7-Filter erkennt und blockt Angriffe automatisch, bevor sie deine Dienste erreichen.",
  },
  {
    icon: KeyRound,
    title: "Voller Zugriff",
    text: "Root unter Linux, Administrator unter Windows — dazu Browser-Konsole für Notfälle und zwei Backup-Slots pro Server.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-aurora-400 uppercase">
            Warum NimbusNode
          </p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-mist-100 md:text-5xl">
            Hardware, auf die du dich verlassen kannst
          </h2>
          <p className="mt-5 text-mist-300">
            Wir betreiben unsere eigene Infrastruktur — das bedeutet kurze Wege,
            ehrliche Ressourcen und Support, der die Plattform wirklich kennt.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featureItems.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.08}>
              <article className="glass-card group h-full rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-aurora-400/30">
                <span className="inline-grid h-12 w-12 place-items-center rounded-2xl border border-aurora-400/25 bg-aurora-400/10 text-aurora-300 transition-colors group-hover:bg-aurora-400/20">
                  <item.icon className="h-5.5 w-5.5" />
                </span>
                <h3 className="font-display mt-5 text-lg font-semibold text-mist-100">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mist-300">
                  {item.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Ablauf -------------------------------- */

const steps = [
  {
    icon: Server,
    step: "01",
    title: "Tarif wählen oder konfigurieren",
    text: "Nimm einen fertigen Tarif oder stelle Kerne, RAM und NVMe im Konfigurator selbst zusammen — der Preis aktualisiert sich live.",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "Guthaben aufladen & bestellen",
    text: "Bezahle per Karte, PayPal, Überweisung oder Krypto. Der Server wird für 30 bis 365 Tage im Voraus vom Guthaben bezahlt.",
  },
  {
    icon: Timer,
    step: "03",
    title: "Einloggen & loslegen",
    text: "Rund eine Minute später ist dein Server online. Verbinde dich per SSH oder RDP — oder nutze die Konsole direkt im Browser.",
  },
];

export function HowItWorks() {
  return (
    <section id="ablauf" className="relative overflow-hidden py-24 md:py-32">
      <AuroraBackground />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-aurora-400 uppercase">
            So einfach geht&apos;s
          </p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-mist-100 md:text-5xl">
            In drei Schritten zum eigenen Server
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.12}>
              <article className="relative h-full">
                <div className="glass-card h-full rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-aurora-400/30">
                  <div className="flex items-center justify-between">
                    <span className="inline-grid h-12 w-12 place-items-center rounded-2xl border border-pulse-400/25 bg-pulse-400/10 text-pulse-400">
                      <s.icon className="h-5.5 w-5.5" />
                    </span>
                    <span className="font-display text-5xl font-bold text-ink-600">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="font-display mt-6 text-xl font-semibold text-mist-100">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist-300">
                    {s.text}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="absolute top-1/2 -right-5 hidden h-5 w-5 -translate-y-1/2 text-ink-500 md:block" />
                )}
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-12 text-center">
          <div className="glass-card mx-auto inline-flex max-w-full flex-wrap items-center justify-center gap-3 rounded-2xl px-6 py-4 text-sm text-mist-300">
            <CloudUpload className="h-4.5 w-4.5 text-aurora-400" />
            <span>
              Kein Abo, keine automatische Verlängerung: Läuft ein Server aus,
              wird er gestoppt — innerhalb von 7 Tagen setzt du ihn per
              Verlängerung nahtlos fort.
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Marquee -------------------------------- */

const marqueeItems = [
  "Debian 12",
  "Ubuntu 24.04 LTS",
  "AlmaLinux 9",
  "Rocky Linux 9",
  "Windows Server 2022",
  "Docker",
  "PostgreSQL",
  "Kubernetes",
  "Game-Server",
  "VPN & WireGuard",
];

export function OsMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-ink-600/40 bg-ink-900/40 py-5">
      <div className="animate-marquee flex w-max items-center gap-10">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-mono text-sm tracking-wide whitespace-nowrap text-mist-500"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-aurora-400/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- CTA ---------------------------------- */

export function CtaSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <div className="glass-card ring-glow relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center md:px-16 md:py-20">
            <div
              aria-hidden="true"
              className="absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full opacity-30 blur-[100px]"
              style={{
                background:
                  "radial-gradient(closest-side, #7cf8d4, #4a86ff 60%, transparent)",
              }}
            />
            <LifeBuoy className="mx-auto h-10 w-10 text-aurora-300" />
            <h2 className="font-display mt-6 text-3xl font-semibold tracking-tight text-mist-100 md:text-5xl">
              Bereit, wenn du es bist
            </h2>
            <p className="mx-auto mt-4 max-w-md text-mist-300">
              Starte deinen ersten Server noch heute — in rund einer Minute
              online, ohne Abo und ohne Vertragsbindung.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/vps"
                className="group inline-flex items-center gap-2 rounded-full bg-aurora-400 px-8 py-4 font-semibold text-ink-950 transition-all hover:bg-aurora-300 hover:shadow-[0_0_36px_rgba(62,234,191,0.4)]"
              >
                Jetzt Server starten
                <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full border border-ink-500 px-8 py-4 font-medium text-mist-100 transition-colors hover:border-aurora-400/50 hover:text-aurora-300"
              >
                Fragen? Kontakt
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
