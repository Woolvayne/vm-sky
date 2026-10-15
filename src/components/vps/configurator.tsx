"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Cpu, HardDrive, MemoryStick, ArrowRight } from "lucide-react";
import { computeMonthlyCents, osOptions } from "@/config/site";
import { formatPrice } from "@/lib/utils";

function Slider({
  icon: Icon,
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  icon: typeof Cpu;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-mist-300">
          <Icon className="h-4 w-4 text-aurora-400" />
          {label}
        </label>
        <span className="font-mono text-sm font-semibold text-mist-100">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-aurora-400"
      />
      <div className="mt-1 flex justify-between font-mono text-[11px] text-mist-600">
        <span>
          {min} {unit}
        </span>
        <span>
          {max} {unit}
        </span>
      </div>
    </div>
  );
}

export function Configurator() {
  const router = useRouter();
  const [cores, setCores] = useState(4);
  const [ram, setRam] = useState(8);
  const [disk, setDisk] = useState(80);
  const [os, setOs] = useState<(typeof osOptions)[number]["id"]>("debian-12");

  const isWindows = osOptions.find((o) => o.id === os)?.windows ?? false;
  const monthlyCents = useMemo(
    () => computeMonthlyCents({ cores, ramGb: ram, nvmeGb: disk, windows: isWindows }),
    [cores, ram, disk, isWindows],
  );

  const order = () => {
    const params = new URLSearchParams({
      cores: String(cores),
      ram: String(ram),
      disk: String(disk),
      os,
    });
    router.push(`/bestellen/custom?${params.toString()}`);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div className="glass-card rounded-3xl p-8 md:p-10">
        <h3 className="font-display text-xl font-semibold text-mist-100">
          Ressourcen zusammenstellen
        </h3>
        <p className="mt-2 text-sm text-mist-500">
          Stelle deinen Server exakt so zusammen, wie du ihn brauchst. Der
          Preis berechnet sich aus Kernen, RAM, NVMe und Netzwerkpauschale.
        </p>
        <div className="mt-9 space-y-9">
          <Slider
            icon={Cpu}
            label="vCores (AMD Ryzen)"
            value={cores}
            min={1}
            max={16}
            step={1}
            unit="Kerne"
            onChange={setCores}
          />
          <Slider
            icon={MemoryStick}
            label="Arbeitsspeicher"
            value={ram}
            min={1}
            max={64}
            step={1}
            unit="GB"
            onChange={setRam}
          />
          <Slider
            icon={HardDrive}
            label="NVMe-Speicher"
            value={disk}
            min={10}
            max={800}
            step={10}
            unit="GB"
            onChange={setDisk}
          />
          <div>
            <label className="text-sm font-medium text-mist-300">
              Betriebssystem
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              {osOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setOs(option.id)}
                  className={
                    os === option.id
                      ? "rounded-full border border-aurora-400/60 bg-aurora-400/10 px-4 py-2 text-sm text-aurora-300"
                      : "rounded-full border border-ink-500 px-4 py-2 text-sm text-mist-300 transition-colors hover:border-ink-500/80 hover:text-mist-100"
                  }
                >
                  {option.label}
                  {option.windows && (
                    <span className="ml-1.5 text-[11px] text-flare-400">+Lizenz</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card ring-glow h-fit rounded-3xl p-8 lg:sticky lg:top-24">
        <p className="font-mono text-xs tracking-widest text-mist-500 uppercase">
          Deine Konfiguration
        </p>
        <ul className="mt-5 space-y-3 text-sm">
          <li className="flex justify-between border-b border-ink-600/40 pb-3 text-mist-300">
            <span>vCores</span>
            <strong className="text-mist-100">{cores} × Ryzen 7</strong>
          </li>
          <li className="flex justify-between border-b border-ink-600/40 pb-3 text-mist-300">
            <span>RAM</span>
            <strong className="text-mist-100">{ram} GB DDR4</strong>
          </li>
          <li className="flex justify-between border-b border-ink-600/40 pb-3 text-mist-300">
            <span>NVMe</span>
            <strong className="text-mist-100">{disk} GB</strong>
          </li>
          <li className="flex justify-between border-b border-ink-600/40 pb-3 text-mist-300">
            <span>Netzwerk</span>
            <strong className="text-mist-100">1 Gbit/s + IPv4</strong>
          </li>
          <li className="flex justify-between text-mist-300">
            <span>System</span>
            <strong className="text-mist-100">
              {osOptions.find((o) => o.id === os)?.label}
            </strong>
          </li>
        </ul>
        <div className="mt-7 text-center">
          <motion.p
            key={monthlyCents}
            initial={{ scale: 0.94, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="font-display text-5xl font-semibold text-mist-100"
          >
            {formatPrice(monthlyCents)}
          </motion.p>
          <p className="mt-1 text-sm text-mist-500">pro 30 Tage, inkl. MwSt.</p>
        </div>
        <button
          onClick={order}
          className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-aurora-400 py-3.5 text-sm font-semibold text-ink-950 transition-all hover:bg-aurora-300 hover:shadow-[0_0_28px_rgba(62,234,191,0.35)]"
        >
          Diese Konfiguration bestellen
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
        <p className="mt-4 text-center text-[11px] leading-relaxed text-mist-600">
          Kein Abo. Abgerechnet wird im Voraus für 30–365 Tage vom Guthaben.
        </p>
      </div>
    </div>
  );
}
