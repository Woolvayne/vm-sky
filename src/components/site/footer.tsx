import Link from "next/link";
import { Logo } from "./logo";
import { site } from "@/config/site";

const productLinks = [
  { href: "/vps", label: "VPS-Tarife" },
  { href: "/vps#konfigurator", label: "Konfigurator" },
  { href: "/status", label: "Bestellstatus" },
  { href: "/kontakt", label: "Support" },
];

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/widerruf", label: "Widerruf" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-ink-600/40 bg-ink-900/60">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist-500">
              KVM-Server auf Ryzen-Hardware in deutschen Rechenzentren.
              Ohne Abo, ohne Vertragsbindung – einfach aufladen, starten,
              verlängern, solange du willst.
            </p>
            <p className="mt-5 font-mono text-xs text-mist-600">
              {new Date().getFullYear()} {site.name} · Standort: Deutschland
            </p>
          </div>
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-mist-500">
              Produkt
            </p>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-mist-300 transition-colors hover:text-aurora-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-mist-500">
              Rechtliches
            </p>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-mist-300 transition-colors hover:text-aurora-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
