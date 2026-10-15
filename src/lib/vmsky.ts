/**
 * Anbindung an die Upstream-API (VMSky Reseller-API).
 *
 * Konfiguration über Umgebungsvariablen (serverseitig, niemals NEXT_PUBLIC_*):
 *   VMSKY_API_BASE  – Basis-URL der API, z. B. https://api.vmsky.de/v1
 *   VMSKY_API_KEY   – Dein API-Schlüssel aus dem Reseller-Vertrag
 *
 * Solange kein Schlüssel gesetzt ist, läuft die Integration im
 * "Sandbox"-Modus: Bestellungen werden lokal gespeichert und als
 * "pending" markiert, damit du sie manuell oder nachträglich per
 * API provisionieren kannst. Passe die Payload-Felder unten an die
 * offizielle API-Dokumentation deines Vertrags an.
 */

const API_BASE = process.env.VMSKY_API_BASE ?? "https://api.vmsky.de/v1";
const API_KEY = process.env.VMSKY_API_KEY;

export interface ProvisionPayload {
  orderNumber: string;
  cores: number;
  ramGb: number;
  nvmeGb: number;
  os: string;
  runtimeDays: number;
  customerEmail: string;
}

export interface ProvisionResult {
  ok: boolean;
  sandbox: boolean;
  upstreamServerId?: string;
  message: string;
}

export function isUpstreamConfigured(): boolean {
  return Boolean(API_KEY);
}

export async function provisionServer(
  payload: ProvisionPayload,
): Promise<ProvisionResult> {
  if (!API_KEY) {
    return {
      ok: true,
      sandbox: true,
      message:
        "Upstream-API nicht konfiguriert (VMSKY_API_KEY fehlt) – Bestellung im Sandbox-Modus gespeichert.",
    };
  }

  try {
    const res = await fetch(`${API_BASE}/servers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        reference: payload.orderNumber,
        cpu: payload.cores,
        memory_mb: payload.ramGb * 1024,
        disk_gb: payload.nvmeGb,
        image: payload.os,
        period_days: payload.runtimeDays,
        customer_email: payload.customerEmail,
      }),
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return {
        ok: false,
        sandbox: false,
        message: `Upstream-Fehler ${res.status}: ${text.slice(0, 200)}`,
      };
    }

    const data = (await res.json().catch(() => ({}))) as {
      id?: string | number;
    };
    return {
      ok: true,
      sandbox: false,
      upstreamServerId: data.id != null ? String(data.id) : undefined,
      message: "Server wurde beim Upstream-Anbieter provisioniert.",
    };
  } catch (error) {
    return {
      ok: false,
      sandbox: false,
      message: `Upstream nicht erreichbar: ${error instanceof Error ? error.message : "unbekannt"}`,
    };
  }
}

export async function fetchUpstreamStatus(
  serverId: string,
): Promise<{ status: string } | null> {
  if (!API_KEY) return null;
  try {
    const res = await fetch(`${API_BASE}/servers/${encodeURIComponent(serverId)}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = (await res.json().catch(() => ({}))) as { status?: string };
    return { status: data.status ?? "unknown" };
  } catch {
    return null;
  }
}
