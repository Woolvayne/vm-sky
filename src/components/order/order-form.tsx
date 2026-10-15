"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Server,
  AlertTriangle,
} from "lucide-react";
import { osOptions, runtimeOptions } from "@/config/site";
import { formatPrice } from "@/lib/utils";

export interface OrderFormProps {
  planId: string;
  planName: string;
  cores: number;
  ramGb: number;
  nvmeGb: number;
  monthlyCents: number;
}

type Phase =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | {
      kind: "success";
      orderNumber: string;
      totalCents: number;
      sandbox: boolean;
    };

export function OrderForm(props: OrderFormProps) {
  const [os, setOs] = useState<(typeof osOptions)[number]["id"]>("debian-12");
  const [runtime, setRuntime] = useState(30);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [legalAccepted, setLegalAccepted] = useState(false);
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });

  const factor = runtimeOptions.find((r) => r.days === runtime)?.factor ?? 1;
  const totalCents = useMemo(() => {
    const isWindows = osOptions.find((o) => o.id === os)?.windows ?? false;
    const monthly = props.monthlyCents + (isWindows ? 599 : 0);
    return monthly * factor;
  }, [os, factor, props.monthlyCents]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!legalAccepted || phase.kind === "submitting") return;
    setPhase({ kind: "submitting" });
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: props.planId,
          cores: props.cores,
          ramGb: props.ramGb,
          nvmeGb: props.nvmeGb,
          os,
          runtimeDays: runtime,
          firstName,
          lastName,
          email,
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        orderNumber?: string;
        totalCents?: number;
        sandbox?: boolean;
      };
      if (!res.ok || !data.ok) {
        setPhase({ kind: "error", message: data.error ?? "Unbekannter Fehler." });
        return;
      }
      setPhase({
        kind: "success",
        orderNumber: data.orderNumber ?? "-",
        totalCents: data.totalCents ?? totalCents,
        sandbox: data.sandbox ?? false,
      });
    } catch {
      setPhase({
        kind: "error",
        message: "Netzwerkfehler — bitte versuche es erneut.",
      });
    }
  }

  if (phase.kind === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card ring-glow rounded-3xl p-10 text-center"
      >
        <CheckCircle2 className="mx-auto h-14 w-14 text-aurora-400" />
        <h2 className="font-display mt-6 text-3xl font-semibold text-mist-100">
          Bestellung eingegangen
        </h2>
        <p className="mt-3 text-mist-300">
          Deine Bestellnummer lautet
        </p>
        <p className="mt-2 inline-block rounded-xl border border-aurora-400/30 bg-aurora-400/10 px-5 py-2.5 font-mono text-lg font-semibold text-aurora-300">
          {phase.orderNumber}
        </p>
        <p className="mt-5 text-sm leading-relaxed text-mist-300">
          Gesamtbetrag: <strong className="text-mist-100">{formatPrice(phase.totalCents)}</strong>
          <br />
          {phase.sandbox
            ? "Der Server wird nach Zahlungseingang manuell bzw. über die angebundene Upstream-API provisioniert. Du erhältst alle Details per E-Mail."
            : "Dein Server wird jetzt automatisch provisioniert. Die Zugangsdaten erhältst du in Kürze per E-Mail."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={`/status?nr=${phase.orderNumber}&email=${encodeURIComponent(email)}`}
            className="rounded-full bg-aurora-400 px-6 py-3 text-sm font-semibold text-ink-950 transition-all hover:bg-aurora-300"
          >
            Bestellstatus verfolgen
          </Link>
          <Link
            href="/vps"
            className="rounded-full border border-ink-500 px-6 py-3 text-sm text-mist-100 transition-colors hover:border-aurora-400/50 hover:text-aurora-300"
          >
            Weiteren Server bestellen
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div className="space-y-6">
        <div className="glass-card rounded-3xl p-8">
          <h3 className="font-display flex items-center gap-2 text-lg font-semibold text-mist-100">
            <Server className="h-5 w-5 text-aurora-400" />
            Betriebssystem & Laufzeit
          </h3>
          <div className="mt-5">
            <label className="text-sm font-medium text-mist-300">System-Image</label>
            <div className="mt-3 flex flex-wrap gap-2">
              {osOptions.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => setOs(option.id)}
                  className={
                    os === option.id
                      ? "rounded-full border border-aurora-400/60 bg-aurora-400/10 px-4 py-2 text-sm text-aurora-300"
                      : "rounded-full border border-ink-500 px-4 py-2 text-sm text-mist-300 hover:text-mist-100"
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-7">
            <label className="text-sm font-medium text-mist-300">Laufzeit (Vorkasse)</label>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {runtimeOptions.map((option) => (
                <button
                  type="button"
                  key={option.days}
                  onClick={() => setRuntime(option.days)}
                  className={
                    runtime === option.days
                      ? "rounded-2xl border border-aurora-400/60 bg-aurora-400/10 px-3 py-3 text-sm font-semibold text-aurora-300"
                      : "rounded-2xl border border-ink-500 px-3 py-3 text-sm text-mist-300 hover:text-mist-100"
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-mist-600">
              Keine automatische Verlängerung — du entscheidest jedes Mal neu.
            </p>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8">
          <h3 className="font-display text-lg font-semibold text-mist-100">
            Deine Daten
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-mist-300" htmlFor="firstName">
                Vorname
              </label>
              <input
                id="firstName"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-ink-500 bg-ink-800/60 px-4 py-3 text-sm text-mist-100 outline-none placeholder:text-mist-600 focus:border-aurora-400/60"
                placeholder="Max"
              />
            </div>
            <div>
              <label className="text-sm text-mist-300" htmlFor="lastName">
                Nachname
              </label>
              <input
                id="lastName"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-ink-500 bg-ink-800/60 px-4 py-3 text-sm text-mist-100 outline-none placeholder:text-mist-600 focus:border-aurora-400/60"
                placeholder="Mustermann"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-mist-300" htmlFor="email">
                E-Mail-Adresse
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-ink-500 bg-ink-800/60 px-4 py-3 text-sm text-mist-100 outline-none placeholder:text-mist-600 focus:border-aurora-400/60"
                placeholder="max@beispiel.de"
              />
              <p className="mt-2 text-xs text-mist-600">
                An diese Adresse senden wir Rechnung und Server-Zugangsdaten.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="glass-card ring-glow h-fit rounded-3xl p-8 lg:sticky lg:top-24">
          <p className="font-mono text-xs tracking-widest text-mist-500 uppercase">
            Zusammenfassung
          </p>
          <h3 className="font-display mt-2 text-2xl font-semibold text-mist-100">
            {props.planName}
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex justify-between text-mist-300">
              <span>vCores</span>
              <strong className="text-mist-100">{props.cores} × Ryzen</strong>
            </li>
            <li className="flex justify-between text-mist-300">
              <span>RAM</span>
              <strong className="text-mist-100">{props.ramGb} GB</strong>
            </li>
            <li className="flex justify-between text-mist-300">
              <span>NVMe</span>
              <strong className="text-mist-100">{props.nvmeGb} GB</strong>
            </li>
            <li className="flex justify-between text-mist-300">
              <span>System</span>
              <strong className="text-mist-100">
                {osOptions.find((o) => o.id === os)?.label}
              </strong>
            </li>
            <li className="flex justify-between text-mist-300">
              <span>Laufzeit</span>
              <strong className="text-mist-100">{runtime} Tage</strong>
            </li>
          </ul>
          <div className="mt-6 border-t border-ink-600/50 pt-5 text-center">
            <p className="font-display text-4xl font-semibold text-mist-100">
              {formatPrice(totalCents)}
            </p>
            <p className="mt-1 text-xs text-mist-500">einmalig, inkl. MwSt.</p>
          </div>

          <label className="mt-6 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-mist-400">
            <input
              type="checkbox"
              checked={legalAccepted}
              onChange={(e) => setLegalAccepted(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-aurora-400"
            />
            <span>
              Ich habe die{" "}
              <Link href="/agb" target="_blank" className="text-aurora-300 underline">
                AGB
              </Link>
              , die{" "}
              <Link href="/datenschutz" target="_blank" className="text-aurora-300 underline">
                Datenschutzerklärung
              </Link>{" "}
              und die{" "}
              <Link href="/widerruf" target="_blank" className="text-aurora-300 underline">
                Widerrufsbelehrung
              </Link>{" "}
              gelesen und akzeptiere sie. Ich stimme der sofortigen
              Vertragserfüllung zu.
            </span>
          </label>

          <AnimatePresence>
            {phase.kind === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                {phase.message}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={!legalAccepted || phase.kind === "submitting"}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-aurora-400 py-3.5 text-sm font-semibold text-ink-950 transition-all hover:bg-aurora-300 hover:shadow-[0_0_28px_rgba(62,234,191,0.35)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {phase.kind === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Wird verarbeitet …
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                Zahlungspflichtig bestellen
              </>
            )}
          </button>
          <Link
            href="/vps"
            className="mt-4 inline-flex w-full items-center justify-center gap-1.5 text-sm text-mist-500 transition-colors hover:text-mist-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Auswahl
          </Link>
        </div>
      </div>
    </form>
  );
}
