"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Loader2,
  Clock3,
  Cog,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { osOptions } from "@/config/site";

interface OrderResult {
  orderNumber: string;
  planName: string;
  cores: number;
  ramGb: number;
  nvmeGb: number;
  os: string;
  runtimeDays: number;
  totalCents: number;
  status: string;
  createdAt: string;
}

const statusMeta: Record<
  string,
  { label: string; icon: typeof Clock3; className: string }
> = {
  pending: {
    label: "Zahlung ausstehend",
    icon: Clock3,
    className: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
  },
  provisioning: {
    label: "Wird provisioniert",
    icon: Cog,
    className: "border-pulse-400/30 bg-pulse-400/10 text-pulse-400",
  },
  active: {
    label: "Aktiv",
    icon: CheckCircle2,
    className: "border-aurora-400/30 bg-aurora-400/10 text-aurora-300",
  },
  failed: {
    label: "Fehlgeschlagen",
    icon: XCircle,
    className: "border-red-400/30 bg-red-400/10 text-red-300",
  },
};

export function StatusLookup({
  initialNumber = "",
  initialEmail = "",
}: {
  initialNumber?: string;
  initialEmail?: string;
}) {
  const [nr, setNr] = useState(initialNumber);
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderResult | null>(null);

  async function lookup(e?: React.FormEvent) {
    e?.preventDefault();
    if (!nr || !email) return;
    setLoading(true);
    setError(null);
    setOrder(null);
    try {
      const res = await fetch(
        `/api/orders?nr=${encodeURIComponent(nr)}&email=${encodeURIComponent(email)}`,
      );
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        order?: OrderResult;
      };
      if (!res.ok || !data.ok || !data.order) {
        setError(data.error ?? "Nichts gefunden.");
        return;
      }
      setOrder(data.order);
    } catch {
      setError("Netzwerkfehler — bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={lookup} className="glass-card rounded-3xl p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="nr" className="text-sm text-mist-300">
              Bestellnummer
            </label>
            <input
              id="nr"
              value={nr}
              onChange={(e) => setNr(e.target.value)}
              placeholder="NB-2026-ABC123"
              className="mt-1.5 w-full rounded-xl border border-ink-500 bg-ink-800/60 px-4 py-3 font-mono text-sm text-mist-100 outline-none placeholder:text-mist-600 focus:border-aurora-400/60"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm text-mist-300">
              E-Mail-Adresse
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="max@beispiel.de"
              className="mt-1.5 w-full rounded-xl border border-ink-500 bg-ink-800/60 px-4 py-3 text-sm text-mist-100 outline-none placeholder:text-mist-600 focus:border-aurora-400/60"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading || !nr || !email}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-aurora-400 py-3.5 text-sm font-semibold text-ink-950 transition-all hover:bg-aurora-300 disabled:opacity-40"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          Status abfragen
        </button>
      </form>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-2 rounded-2xl border border-red-400/30 bg-red-400/10 px-5 py-4 text-sm text-red-300"
          >
            <AlertTriangle className="h-4 w-4 shrink-0" />
            {error}
          </motion.p>
        )}
        {order && (
          <motion.div
            key={order.orderNumber}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card ring-glow mt-6 rounded-3xl p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-sm text-mist-500">
                  {order.orderNumber}
                </p>
                <h3 className="font-display mt-1 text-2xl font-semibold text-mist-100">
                  {order.planName}
                </h3>
              </div>
              {(() => {
                const meta = statusMeta[order.status] ?? statusMeta.pending;
                return (
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${meta.className}`}
                  >
                    <meta.icon className="h-4 w-4" />
                    {meta.label}
                  </span>
                );
              })()}
            </div>
            <ul className="mt-6 grid gap-3 border-t border-ink-600/50 pt-6 text-sm sm:grid-cols-2">
              <li className="flex justify-between text-mist-300">
                <span>Konfiguration</span>
                <strong className="text-mist-100">
                  {order.cores} vC · {order.ramGb} GB · {order.nvmeGb} GB NVMe
                </strong>
              </li>
              <li className="flex justify-between text-mist-300">
                <span>System</span>
                <strong className="text-mist-100">
                  {osOptions.find((o) => o.id === order.os)?.label ?? order.os}
                </strong>
              </li>
              <li className="flex justify-between text-mist-300">
                <span>Laufzeit</span>
                <strong className="text-mist-100">{order.runtimeDays} Tage</strong>
              </li>
              <li className="flex justify-between text-mist-300">
                <span>Betrag</span>
                <strong className="text-mist-100">
                  {formatPrice(order.totalCents)}
                </strong>
              </li>
              <li className="flex justify-between text-mist-300 sm:col-span-2">
                <span>Bestellt am</span>
                <strong className="text-mist-100">
                  {new Date(order.createdAt).toLocaleString("de-DE")}
                </strong>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
