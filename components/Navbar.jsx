"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { usePlan } from "./PlanContext";

const links = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/" || pathname.startsWith("/workout");
  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [open, setOpen] = useState(false);

  const navLinks = links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      onClick={() => setOpen(false)}
      className={`font-display text-sm uppercase tracking-widest transition-colors ${
        isActive(pathname, link.href)
          ? "text-accent border-b-2 border-accent pb-1"
          : "text-muted hover:text-white border-b-2 border-transparent pb-1"
      }`}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={32} height={32} priority />
          <span className="font-display text-xl font-bold tracking-wider">FITLOG</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">{navLinks}</div>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-accent px-3 py-1 font-display text-xs font-semibold uppercase tracking-wider text-ink"
          >
            Plan {plan.length}
          </Link>
          <Link
            href="/my-plan"
            className="rounded-full border border-accent px-3 py-1 font-display text-xs font-semibold uppercase tracking-wider text-accent"
          >
            Saved {saved.length}
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="ml-1 rounded p-1 text-white md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="flex flex-col gap-4 border-t border-line px-4 py-4 md:hidden">{navLinks}</div>
      )}
    </header>
  );
}
