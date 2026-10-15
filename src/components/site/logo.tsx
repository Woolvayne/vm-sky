import Link from "next/link";
import { site } from "@/config/site";

export function Logo({ withWordmark = true }: { withWordmark?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center">
        <svg viewBox="0 0 36 36" className="h-9 w-9" aria-hidden="true">
          <defs>
            <linearGradient id="nb-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7cf8d4" />
              <stop offset="55%" stopColor="#6ea8ff" />
              <stop offset="100%" stopColor="#b78bff" />
            </linearGradient>
          </defs>
          <rect
            x="2.5"
            y="2.5"
            width="31"
            height="31"
            rx="10"
            fill="none"
            stroke="url(#nb-g)"
            strokeWidth="2"
          />
          <path
            d="M11 24.5v-13l8 9.5v-9.5M21 24.5l4-10"
            fill="none"
            stroke="url(#nb-g)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="absolute inset-0 -z-10 rounded-xl bg-aurora-400/20 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
      </span>
      {withWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-mist-100">
          {site.name}
          <span className="text-aurora-400">.</span>
        </span>
      )}
    </Link>
  );
}
