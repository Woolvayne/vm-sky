"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";

const script: Array<{ cmd?: string; out?: string; pause?: number }> = [
  { cmd: "nimbus create --plan pro --os ubuntu-2404", pause: 900 },
  { out: "→ Reserviere KVM-Instanz auf ryzen-fra1-07 …", pause: 700 },
  { out: "→ NVMe-Volume wird erstellt (160 GB) …", pause: 700 },
  { out: "→ IPv4 zugewiesen · DDoS-Filter aktiv", pause: 650 },
  { out: "→ Starte VM …", pause: 900 },
  { out: "✓ online in 58 s — ssh root@203.0.113.42", pause: 3200 },
];

export function HeroTerminal() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);

  const command = useMemo(() => script[0].cmd ?? "", []);

  useEffect(() => {
    if (step === 0 && typed < command.length) {
      const t = setTimeout(() => setTyped((v) => v + 1), 40);
      return () => clearTimeout(t);
    }
    if (step === 0 && typed >= command.length) {
      const t = setTimeout(() => setStep(1), 500);
      return () => clearTimeout(t);
    }
    if (step > 0 && step < script.length) {
      const t = setTimeout(() => setStep((s) => s + 1), script[step]?.pause ?? 600);
      return () => clearTimeout(t);
    }
    const restart = setTimeout(() => {
      setStep(0);
      setTyped(0);
    }, 4200);
    return () => clearTimeout(restart);
  }, [step, typed, command]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.21, 0.65, 0.35, 1] }}
      className="glass-card ring-glow relative w-full max-w-xl rounded-2xl"
    >
      <div className="flex items-center gap-2 border-b border-ink-600/50 px-5 py-3.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-mist-500">
          nimbus-cli — provisionierung
        </span>
      </div>
      <div className="min-h-[220px] space-y-2 px-5 py-5 font-mono text-[13px] leading-relaxed">
        <p className="text-mist-100">
          <span className="mr-2 text-aurora-400">$</span>
          {command.slice(0, typed)}
          {step === 0 && <span className="animate-blink text-aurora-300">▍</span>}
        </p>
        {script.slice(1, step).map((line, i) => (
          <motion.p
            key={`${line.out}-${i}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className={line.out?.startsWith("✓") ? "text-aurora-300" : "text-mist-500"}
          >
            {line.out}
          </motion.p>
        ))}
        {step > 0 && step < script.length && (
          <p className="text-mist-500">
            <span className="animate-blink text-aurora-300">▍</span>
          </p>
        )}
      </div>
    </motion.div>
  );
}
