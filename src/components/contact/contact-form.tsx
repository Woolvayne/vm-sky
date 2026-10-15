"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<
    "idle" | "sending" | "sent" | { error: string }
  >("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setState({ error: data.error ?? "Senden fehlgeschlagen." });
        return;
      }
      setState("sent");
    } catch {
      setState({ error: "Netzwerkfehler — bitte erneut versuchen." });
    }
  }

  if (state === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card ring-glow rounded-3xl p-10 text-center"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-aurora-400" />
        <h2 className="font-display mt-5 text-2xl font-semibold text-mist-100">
          Nachricht gesendet
        </h2>
        <p className="mt-3 text-sm text-mist-300">
          Danke für deine Nachricht — wir melden uns in der Regel innerhalb von
          24 Stunden bei dir.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="glass-card space-y-4 rounded-3xl p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="text-sm text-mist-300">
            Name
          </label>
          <input
            id="c-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-ink-500 bg-ink-800/60 px-4 py-3 text-sm text-mist-100 outline-none placeholder:text-mist-600 focus:border-aurora-400/60"
            placeholder="Max Mustermann"
          />
        </div>
        <div>
          <label htmlFor="c-email" className="text-sm text-mist-300">
            E-Mail
          </label>
          <input
            id="c-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-ink-500 bg-ink-800/60 px-4 py-3 text-sm text-mist-100 outline-none placeholder:text-mist-600 focus:border-aurora-400/60"
            placeholder="max@beispiel.de"
          />
        </div>
      </div>
      <div>
        <label htmlFor="c-subject" className="text-sm text-mist-300">
          Betreff
        </label>
        <input
          id="c-subject"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-ink-500 bg-ink-800/60 px-4 py-3 text-sm text-mist-100 outline-none placeholder:text-mist-600 focus:border-aurora-400/60"
          placeholder="Frage zu meinem Server"
        />
      </div>
      <div>
        <label htmlFor="c-message" className="text-sm text-mist-300">
          Nachricht
        </label>
        <textarea
          id="c-message"
          required
          minLength={10}
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1.5 w-full resize-y rounded-xl border border-ink-500 bg-ink-800/60 px-4 py-3 text-sm text-mist-100 outline-none placeholder:text-mist-600 focus:border-aurora-400/60"
          placeholder="Wie können wir helfen?"
        />
      </div>
      <AnimatePresence>
        {typeof state === "object" && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300"
          >
            <AlertTriangle className="h-4 w-4 shrink-0" />
            {state.error}
          </motion.p>
        )}
      </AnimatePresence>
      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-aurora-400 py-3.5 text-sm font-semibold text-ink-950 transition-all hover:bg-aurora-300 disabled:opacity-40"
      >
        {state === "sending" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        Nachricht senden
      </button>
    </form>
  );
}
