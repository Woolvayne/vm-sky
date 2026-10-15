import Link from "next/link";
import { ArrowRight, Cpu, MapPin, ShieldCheck, Timer } from "lucide-react";
import { AuroraBackground } from "@/components/site/aurora";
import { Reveal } from "@/components/site/reveal";
import { HeroTerminal } from "./hero-terminal";

const chips = [
  { icon: Timer, label: "online in ~60 Sekunden" },
  { icon: MapPin, label: "Rechenzentrum Deutschland" },
  { icon: ShieldCheck, label: "DDoS-Filter inklusive" },
  { icon: Cpu, label: "AMD Ryzen 7 @ 4,4 GHz" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <AuroraBackground />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-aurora-400/30 bg-aurora-400/10 px-4 py-1.5 font-mono text-xs tracking-wide text-aurora-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-aurora-400" />
                </span>
                KVM-VPS · FRA1 · sofort verfügbar
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display mt-6 text-5xl leading-[1.04] font-semibold tracking-tight text-mist-100 md:text-7xl">
                Dein Server.
                <br />
                <span className="text-gradient">In einer Minute.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-mist-300">
                Virtuelle KVM-Server auf eigener Ryzen-Hardware in Deutschland.
                NVMe-Speicher, 1&nbsp;Gbit/s-Port und DDoS-Schutz sind immer dabei.
                Kein Abo, keine Kündigungsfrist — du lädst Guthaben auf und
                verlängerst, wann du willst.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/vps"
                  className="group inline-flex items-center gap-2 rounded-full bg-aurora-400 px-7 py-3.5 font-semibold text-ink-950 transition-all hover:bg-aurora-300 hover:shadow-[0_0_36px_rgba(62,234,191,0.4)]"
                >
                  Tarife ansehen
                  <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/vps#konfigurator"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-500 px-7 py-3.5 font-medium text-mist-100 transition-colors hover:border-aurora-400/50 hover:text-aurora-300"
                >
                  Selbst konfigurieren
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.45}>
              <ul className="mt-11 flex flex-wrap gap-x-6 gap-y-3">
                {chips.map((chip) => (
                  <li
                    key={chip.label}
                    className="flex items-center gap-2 text-sm text-mist-500"
                  >
                    <chip.icon className="h-4 w-4 text-aurora-400" />
                    {chip.label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="animate-float w-full max-w-xl">
              <HeroTerminal />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
