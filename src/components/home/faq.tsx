"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Wie schnell ist mein Server nach der Bestellung bereit?",
    a: "Nach Zahlungseingang wird dein Server automatisch provisioniert und ist in der Regel innerhalb von etwa einer Minute einsatzbereit. Du erhältst die Zugangsdaten per E-Mail und kannst dich sofort per SSH, Remote Desktop oder über die Browser-Konsole verbinden.",
  },
  {
    q: "Gibt es eine Vertragslaufzeit oder ein Abo?",
    a: "Nein. Du zahlst im Voraus für 30 bis 365 Tage — nichts verlängert sich automatisch. Läuft ein Server aus, wird er gestoppt. Wenn du innerhalb von 7 Tagen verlängerst, geht es nahtlos weiter.",
  },
  {
    q: "Welche Betriebssysteme kann ich nutzen?",
    a: "Debian, Ubuntu, AlmaLinux und Rocky Linux stehen als fertige Images bereit. Auch Windows Server 2022 ist gegen einen kleinen Lizenzaufpreis verfügbar. Du hast vollen Root- bzw. Administrator-Zugriff und kannst installieren, was du brauchst.",
  },
  {
    q: "Wo stehen die Server?",
    a: "Alle Server laufen auf AMD-Ryzen-Hardware in einem deutschen Rechenzentrum. Damit profitierst du von niedrigen Latenzen in ganz Europa und der Verarbeitung deiner Daten unter EU-Recht (DSGVO).",
  },
  {
    q: "Ist DDoS-Schutz wirklich inklusive?",
    a: "Ja. Jeder Server ist ohne Aufpreis an unseren mehrstufigen DDoS-Filter angeschlossen. Angriffe werden automatisch erkannt und gefiltert, bevor sie deine Anwendung erreichen.",
  },
  {
    q: "Welche Zahlungsarten akzeptiert ihr?",
    a: "Du kannst dein Guthaben per Kreditkarte, PayPal, SEPA-Überweisung oder mit Kryptowährungen aufladen. Die Server kosten werden dann bequem vom Guthaben abgebucht.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={cn(
              "glass-card mb-3 overflow-hidden rounded-2xl transition-colors",
              isOpen && "border-aurora-400/30",
            )}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-display font-medium text-mist-100">
                {item.q}
              </span>
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink-500 text-mist-300 transition-transform duration-300",
                  isOpen && "rotate-45 border-aurora-400/50 text-aurora-300",
                )}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.21, 0.65, 0.35, 1] }}
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-mist-300">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
