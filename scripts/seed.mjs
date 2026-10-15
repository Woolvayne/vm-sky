/**
 * Seeding der Tarife (Reseller-Preise = Einkauf + 1,00 € Marge je Einheit).
 *
 * Ausführen mit:  node scripts/seed.mjs
 */
import { readFileSync } from "node:fs";
import pg from "pg";

// .env einlesen (einfach, ohne Abhängigkeiten)
try {
  const env = readFileSync(".env", "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
    }
  }
} catch {
  // .env nicht vorhanden – DATABASE_URL muss gesetzt sein
}

const DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@127.0.0.1:5432/app_db";

// Einkaufspreise je Einheit und 30 Tage (Cent) + 1,00 € Marge je Tarif
const CORE = 104; // 1,04 € je vCore
const RAM_GB = 50; // 0,50 € je GB RAM
const NVME_10GB = 20; // 0,20 € je 10 GB NVMe
const NETWORK = 250; // 2,50 € Pauschale (IPv4 + 1 Gbit/s + DDoS-Filter)
const MARGIN = 100; // +1,00 € Reseller-Marge je Tarif und 30 Tage

const monthly = (cores, ramGb, nvmeGb) =>
  cores * CORE +
  ramGb * RAM_GB +
  Math.ceil(nvmeGb / 10) * NVME_10GB +
  NETWORK +
  MARGIN;

const tariffs = [
  {
    id: "nano",
    name: "Nano",
    tagline: "Für Bots & kleine Projekte",
    cores: 2,
    ramGb: 4,
    nvmeGb: 40,
    highlighted: false,
    sortOrder: 1,
  },
  {
    id: "standard",
    name: "Standard",
    tagline: "Websites, Shops & Tools",
    cores: 4,
    ramGb: 8,
    nvmeGb: 80,
    highlighted: false,
    sortOrder: 2,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Game-Server & Datenbanken",
    cores: 6,
    ramGb: 16,
    nvmeGb: 160,
    highlighted: true,
    sortOrder: 3,
  },
  {
    id: "max",
    name: "Max",
    tagline: "CI, Cluster & mehrere Dienste",
    cores: 8,
    ramGb: 32,
    nvmeGb: 320,
    highlighted: false,
    sortOrder: 4,
  },
];

const pool = new pg.Pool({ connectionString: DATABASE_URL });

async function main() {
  const client = await pool.connect();
  try {
    for (const t of tariffs) {
      await client.query(
        `INSERT INTO plans (id, name, tagline, cores, ram_gb, nvme_gb, monthly_cents, highlighted, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name,
           tagline = EXCLUDED.tagline,
           cores = EXCLUDED.cores,
           ram_gb = EXCLUDED.ram_gb,
           nvme_gb = EXCLUDED.nvme_gb,
           monthly_cents = EXCLUDED.monthly_cents,
           highlighted = EXCLUDED.highlighted,
           sort_order = EXCLUDED.sort_order`,
        [
          t.id,
          t.name,
          t.tagline,
          t.cores,
          t.ramGb,
          t.nvmeGb,
          monthly(t.cores, t.ramGb, t.nvmeGb),
          t.highlighted,
          t.sortOrder,
        ],
      );
      console.log(
        `Tarif "${t.name}" gespeichert: ${(monthly(t.cores, t.ramGb, t.nvmeGb) / 100).toFixed(2)} € / 30 Tage`,
      );
    }
    console.log("Seeding abgeschlossen.");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error("Seeding fehlgeschlagen:", err);
  process.exit(1);
});
