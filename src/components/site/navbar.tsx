"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/vps", label: "Tarife" },
  { href: "/vps#konfigurator", label: "Konfigurator" },
  { href: "/#ablauf", label: "Ablauf" },
  { href: "/#faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-ink-600/50 bg-ink-950/80 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-mist-300 transition-colors hover:bg-ink-700/60 hover:text-mist-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/status"
            className="text-sm text-mist-300 transition-colors hover:text-mist-100"
          >
            Bestellstatus
          </Link>
          <Link
            href="/vps"
            className="group inline-flex items-center gap-1.5 rounded-full bg-aurora-400 px-4.5 py-2 text-sm font-semibold text-ink-950 transition-all hover:bg-aurora-300 hover:shadow-[0_0_28px_rgba(62,234,191,0.35)]"
          >
            Server starten
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full text-mist-100 md:hidden"
          aria-label="Menü öffnen"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-ink-600/50 bg-ink-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-sm text-mist-300 hover:bg-ink-700/60 hover:text-mist-100"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/status"
                className="rounded-xl px-4 py-3 text-sm text-mist-300 hover:bg-ink-700/60"
              >
                Bestellstatus
              </Link>
              <Link
                href="/vps"
                className="mt-2 rounded-xl bg-aurora-400 px-4 py-3 text-center text-sm font-semibold text-ink-950"
              >
                Server starten
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
