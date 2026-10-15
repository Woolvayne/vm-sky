import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { db } from "@/db";
import { plans, type Plan } from "@/db/schema";
import { asc } from "drizzle-orm";
import { formatPrice, cn } from "@/lib/utils";
import { features } from "@/config/site";
import { Reveal } from "@/components/site/reveal";

async function getPlans(): Promise<Plan[]> {
  try {
    return await db.select().from(plans).orderBy(asc(plans.sortOrder));
  } catch {
    return [];
  }
}

export async function PlanCards() {
  const list = await getPlans();

  if (list.length === 0) {
    return (
      <p className="text-center text-mist-500">
        Tarife werden geladen — bitte Datenbank seeden.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {list.map((plan, i) => (
        <Reveal key={plan.id} delay={i * 0.08} className="h-full">
          <article
            className={cn(
              "glass-card group relative flex h-full flex-col rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2",
              plan.highlighted
                ? "ring-glow border-aurora-400/40"
                : "hover:border-ink-500",
            )}
          >
            {plan.highlighted && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-aurora-400 px-4 py-1 text-xs font-bold tracking-wide text-ink-950 uppercase">
                Meistgewählt
              </span>
            )}
            <p className="font-mono text-xs tracking-widest text-mist-500 uppercase">
              {plan.tagline}
            </p>
            <h3 className="font-display mt-2 text-2xl font-semibold text-mist-100">
              {plan.name}
            </h3>
            <p className="mt-5 flex items-baseline gap-1.5">
              <span className="font-display text-4xl font-semibold text-mist-100">
                {formatPrice(plan.monthlyCents)}
              </span>
              <span className="text-sm text-mist-500">/ 30 Tage</span>
            </p>
            <ul className="mt-6 space-y-2.5 border-t border-ink-600/50 pt-6 text-sm">
              <li className="flex justify-between text-mist-300">
                <span>vCores</span>
                <strong className="text-mist-100">{plan.cores} × Ryzen</strong>
              </li>
              <li className="flex justify-between text-mist-300">
                <span>RAM</span>
                <strong className="text-mist-100">{plan.ramGb} GB DDR4</strong>
              </li>
              <li className="flex justify-between text-mist-300">
                <span>Speicher</span>
                <strong className="text-mist-100">{plan.nvmeGb} GB NVMe</strong>
              </li>
            </ul>
            <ul className="mt-5 space-y-2 text-[13px] text-mist-500">
              {features.slice(5, 9).map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 shrink-0 text-aurora-400" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={`/bestellen/${plan.id}`}
              className={cn(
                "mt-auto inline-flex items-center justify-center gap-1.5 rounded-full pt-3 pb-3 text-sm font-semibold transition-all",
                plan.highlighted
                  ? "mt-7 bg-aurora-400 text-ink-950 hover:bg-aurora-300 hover:shadow-[0_0_28px_rgba(62,234,191,0.35)]"
                  : "mt-7 border border-ink-500 text-mist-100 group-hover:border-aurora-400/50 group-hover:text-aurora-300",
              )}
            >
              Jetzt bestellen
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
