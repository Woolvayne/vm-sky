/**
 * Zentrale Marken- und Tarif-Konfiguration.
 * Alle Angaben lassen sich hier an einer Stelle anpassen.
 */

export const site = {
  name: "NimbusNode",
  legalName: "NimbusNode (Musterfirma – bitte im Impressum eintragen)",
  domain: "nimbusnode.de",
  tagline: "KVM-Server. Made for builders.",
  description:
    "Virtuelle KVM-Server auf AMD-Ryzen-Hardware in Deutschland. NVMe-Speicher, DDoS-Filter, 1 Gbit/s-Anbindung – online in etwa einer Minute, ohne Abo und ohne Vertragslaufzeit.",
  supportEmail: "support@nimbusnode.de",
  abuseEmail: "abuse@nimbusnode.de",
  locale: "de-DE",
  currency: "EUR",
} as const;

/**
 * Preislogik des Resellers.
 * Einkauf erfolgt upstream zum Selbstkostenpreis; der Verkaufspreis
 * erhält auf den Gesamttarif eine Marge von +1,00 € je 30-Tage-Intervall.
 */
export const pricing = {
  /** Einkaufspreise je Einheit und 30 Tage (in Cent) – Selbstkosten upstream */
  coreCents: 104, // 1,04 € je vCore
  ramGbCents: 50, // 0,50 € je GB RAM
  nvme10GbCents: 20, // 0,20 € je 10 GB NVMe
  networkCents: 250, // 2,50 € Pauschale (IPv4 + 1 Gbit/s + DDoS-Filter)
  /** Verkaufs-Marge: +1,00 € je Tarif und 30 Tage */
  marginCents: 100,
  windowsLicenseCents: 599, // Aufpreis Windows Server je 30 Tage
  marginNote: "Preise inkl. 19 % MwSt. – Reseller-Marge bereits enthalten",
} as const;

export function computeMonthlyCents(input: {
  cores: number;
  ramGb: number;
  nvmeGb: number;
  windows?: boolean;
}): number {
  const base =
    input.cores * pricing.coreCents +
    input.ramGb * pricing.ramGbCents +
    Math.ceil(input.nvmeGb / 10) * pricing.nvme10GbCents +
    pricing.networkCents +
    pricing.marginCents;
  return base + (input.windows ? pricing.windowsLicenseCents : 0);
}

export const osOptions = [
  { id: "debian-12", label: "Debian 12", windows: false },
  { id: "ubuntu-2404", label: "Ubuntu 24.04 LTS", windows: false },
  { id: "almalinux-9", label: "AlmaLinux 9", windows: false },
  { id: "rocky-9", label: "Rocky Linux 9", windows: false },
  { id: "windows-2022", label: "Windows Server 2022", windows: true },
] as const;

export const runtimeOptions = [
  { days: 30, label: "30 Tage", factor: 1 },
  { days: 90, label: "90 Tage", factor: 3 },
  { days: 180, label: "180 Tage", factor: 6 },
  { days: 365, label: "365 Tage", factor: 12 },
] as const;

export const features = [
  "KVM-Vollvirtualisierung",
  "AMD Ryzen 7 3700X @ 4,4 GHz",
  "DDR4-Arbeitsspeicher",
  "NVMe-SSD-Speicher",
  "1 Gbit/s-Anbindung",
  "IPv4-Adresse inklusive",
  "DDoS-Filter inklusive",
  "Zwei Backup-Slots",
  "Konsole im Browser",
  "Standort Deutschland",
];
