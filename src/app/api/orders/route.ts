import { NextResponse } from "next/server";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { orders, plans } from "@/db/schema";
import {
  computeMonthlyCents,
  osOptions,
  pricing,
  runtimeOptions,
} from "@/config/site";
import { orderNumber } from "@/lib/utils";
import { provisionServer } from "@/lib/vmsky";

const createSchema = z.object({
  planId: z.string().min(1).max(32),
  cores: z.number().int().min(1).max(16),
  ramGb: z.number().int().min(1).max(64),
  nvmeGb: z.number().int().min(10).max(800),
  os: z.enum(osOptions.map((o) => o.id) as [string, ...string[]]),
  runtimeDays: z
    .number()
    .int()
    .refine((d) => runtimeOptions.some((r) => r.days === d), {
      message: "Ungültige Laufzeit",
    }),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ungültige Anfrage." },
      { status: 400 },
    );
  }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error:
          parsed.error.issues[0]?.message ?? "Bitte prüfe deine Eingaben.",
      },
      { status: 400 },
    );
  }
  const input = parsed.data;

  // Preis wird ausschließlich serverseitig berechnet.
  let planName: string;
  let monthlyCents: number;
  if (input.planId === "custom") {
    planName = "Custom-Konfiguration";
    monthlyCents = computeMonthlyCents({
      cores: input.cores,
      ramGb: input.ramGb,
      nvmeGb: input.nvmeGb,
    });
  } else {
    const [plan] = await db
      .select()
      .from(plans)
      .where(eq(plans.id, input.planId))
      .limit(1)
      .catch(() => []);
    if (!plan) {
      return NextResponse.json(
        { ok: false, error: "Tarif nicht gefunden." },
        { status: 404 },
      );
    }
    planName = plan.name;
    monthlyCents = plan.monthlyCents;
  }

  const isWindows =
    osOptions.find((o) => o.id === input.os)?.windows ?? false;
  const factor =
    runtimeOptions.find((r) => r.days === input.runtimeDays)?.factor ?? 1;
  const totalCents =
    (monthlyCents + (isWindows ? pricing.windowsLicenseCents : 0)) * factor;

  const number = orderNumber();

  try {
    await db.insert(orders).values({
      orderNumber: number,
      planId: input.planId,
      planName,
      cores: input.cores,
      ramGb: input.ramGb,
      nvmeGb: input.nvmeGb,
      os: input.os,
      runtimeDays: input.runtimeDays,
      totalCents,
      email: input.email.toLowerCase(),
      firstName: input.firstName,
      lastName: input.lastName,
      status: "pending",
    });
  } catch (error) {
    console.error("Bestellung konnte nicht gespeichert werden:", error);
    return NextResponse.json(
      { ok: false, error: "Bestellung konnte nicht gespeichert werden." },
      { status: 500 },
    );
  }

  // Upstream-Provisionierung über die Reseller-API (oder Sandbox ohne Key).
  const provision = await provisionServer({
    orderNumber: number,
    cores: input.cores,
    ramGb: input.ramGb,
    nvmeGb: input.nvmeGb,
    os: input.os,
    runtimeDays: input.runtimeDays,
    customerEmail: input.email,
  });

  const status = provision.sandbox
    ? "pending"
    : provision.ok
      ? "provisioning"
      : "failed";

  await db
    .update(orders)
    .set({
      status,
      upstreamServerId: provision.upstreamServerId ?? null,
      notes: provision.message,
    })
    .where(eq(orders.orderNumber, number))
    .catch(() => undefined);

  return NextResponse.json({
    ok: true,
    orderNumber: number,
    totalCents,
    status,
    sandbox: provision.sandbox,
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nr = searchParams.get("nr")?.trim() ?? "";
  const email = searchParams.get("email")?.trim().toLowerCase() ?? "";

  if (!nr || !email) {
    return NextResponse.json(
      { ok: false, error: "Bestellnummer und E-Mail sind erforderlich." },
      { status: 400 },
    );
  }

  const [order] = await db
    .select({
      orderNumber: orders.orderNumber,
      planName: orders.planName,
      cores: orders.cores,
      ramGb: orders.ramGb,
      nvmeGb: orders.nvmeGb,
      os: orders.os,
      runtimeDays: orders.runtimeDays,
      totalCents: orders.totalCents,
      status: orders.status,
      createdAt: orders.createdAt,
    })
    .from(orders)
    .where(and(eq(orders.orderNumber, nr), eq(orders.email, email)))
    .limit(1)
    .catch(() => []);

  if (!order) {
    return NextResponse.json(
      { ok: false, error: "Keine Bestellung mit diesen Daten gefunden." },
      { status: 404 },
    );
  }

  return NextResponse.json({ ok: true, order });
}
