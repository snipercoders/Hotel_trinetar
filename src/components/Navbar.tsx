"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/data/site";

const links = [
  ["#home", "Home"], ["#stays", "Stays"], ["#about", "About"],
  ["#experiences", "Experiences"], ["#moments", "Moments"], ["#location", "How to reach us"], ["#faqs", "FAQs"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return <header className="fixed inset-x-0 top-0 z-50">
    <div className="relative z-20 flex items-center justify-between px-6 py-5 md:px-10">
      <Link href="#home" onClick={() => setOpen(false)} className="max-w-[calc(100vw-6rem)] truncate font-display text-base font-bold uppercase tracking-[.12em] text-white drop-shadow sm:text-xl sm:tracking-widest md:text-2xl" aria-label={`${site.name} home`}>
        {site.name} <span className="text-crimson">{site.sub}</span>
      </Link>
      <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="site-navigation" className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-forest text-white shadow-[0_8px_28px_rgba(0,0,0,0.45)] transition duration-300 hover:scale-105 hover:border-crimson hover:text-crimson focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crimson md:absolute md:bottom-auto md:right-10 md:top-5">
        {open ? <X size={23} /> : <Menu size={23} />}
      </button>
    </div>
    <div className={`fixed inset-0 z-10 bg-forest/75 backdrop-blur-[2px] transition-opacity duration-300 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden="true" onClick={() => setOpen(false)} />
    <nav id="site-navigation" aria-label="Main navigation" aria-hidden={!open} className={`fixed inset-x-4 bottom-4 top-24 z-10 flex flex-col justify-between overflow-y-auto rounded-[2rem] border border-white/10 bg-forest px-7 py-9 shadow-2xl transition duration-300 sm:inset-x-6 sm:bottom-6 sm:px-12 sm:py-12 md:inset-x-8 md:bottom-7 md:top-28 md:px-16 md:py-14 ${open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"}`}>
      <div className="grid flex-1 items-center gap-10 md:grid-cols-2">
        <div className="flex flex-col items-start gap-2 sm:gap-3">
          {links.map(([href, label], index) => <a key={href} href={href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} style={{ transitionDelay: open ? `${index * 45}ms` : "0ms" }} className="group flex items-center gap-3 font-display text-3xl leading-tight tracking-tight text-white transition duration-300 hover:translate-x-1 hover:text-crimson sm:text-4xl md:text-5xl">
            {label}<ArrowUpRight className="text-crimson transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={20} />
          </a>)}
        </div>
        <div className="hidden text-center md:block"><p className="font-display text-5xl font-bold uppercase tracking-[0.12em] text-crimson">{site.name}</p><p className="mt-3 text-xs font-semibold uppercase tracking-[0.45em] text-white/75">{site.sub} · Patnitop</p><p className="mt-10 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Mountains · Comfort · Hospitality</p></div>
      </div>
      <div className="flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-7"><p className="text-sm text-slate-400">A peaceful stay in the heart of Patnitop.</p><a href={`https://wa.me/${site.whatsapp}`} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-crimson px-6 py-3.5 font-semibold text-white transition hover:bg-crimson/80 sm:self-auto">Book your stay <ArrowUpRight size={18} /></a></div>
    </nav>
  </header>;
}
