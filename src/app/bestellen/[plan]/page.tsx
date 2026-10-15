import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { plans } from "@/db/schema";
import { computeMonthlyCents } from "@/config/site";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/reveal";
import { OrderForm } from "@/components/order/order-form";

export const metadata: Metadata = {
  title: "Server bestellen",
};

interface Props {
  params: Promise<{ plan: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}

export default async function OrderPage({ params, searchParams }: Props) {
  const { plan: planId } = await params;
  const query = await searchParams;

  let planName: string;
  let cores: number;
  let ramGb: number;
  let nvmeGb: number;
  let monthlyCents: number;

  if (planId === "custom") {
    cores = clamp(Number(query.cores ?? 4), 1, 16);
    ramGb = clamp(Number(query.ram ?? 8), 1, 64);
    nvmeGb = clamp(Number(query.disk ?? 80), 10, 800);
    planName = "Custom-Konfiguration";
    monthlyCents = computeMonthlyCents({ cores, ramGb, nvmeGb });
  } else {
    const [plan] = await db
      .select()
      .from(plans)
      .where(eq(plans.id, planId))
      .limit(1)
      .catch(() => []);
    if (!plan) notFound();
    planName = plan.name;
    cores = plan.cores;
    ramGb = plan.ramGb;
    nvmeGb = plan.nvmeGb;
    monthlyCents = plan.monthlyCents;
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 md:pt-40">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal className="mb-10">
            <p className="font-mono text-xs tracking-[0.3em] text-aurora-400 uppercase">
              Bestellung
            </p>
            <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-mist-100 md:text-5xl">
              {planName} <span className="text-gradient">konfigurieren</span>
            </h1>
            <p className="mt-4 max-w-xl text-mist-300">
              Wähle Betriebssystem und Laufzeit, hinterlege deine Daten — fertig.
              Die Provisionierung startet nach Zahlungseingang automatisch.
            </p>
          </Reveal>
          <OrderForm
            planId={planId}
            planName={planName}
            cores={cores}
            ramGb={ramGb}
            nvmeGb={nvmeGb}
            monthlyCents={monthlyCents}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
