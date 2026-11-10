"use client";

import Image from "next/image";
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

  return <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white/90 text-navy shadow-sm backdrop-blur-md">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8 sm:py-4">
      <a href="#home" onClick={() => setOpen(false)} aria-label={`${site.name} home`} className="relative z-20 block w-[190px] sm:w-[230px]">
        <Image src="/images/logo.png" alt={`${site.name} ${site.sub}`} width={543} height={96} className="h-auto w-full" />
      </a>
      <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
        {links.slice(1).map(([href, label]) => <a key={href} href={href} className="text-sm text-navy transition hover:text-deodar">{label}</a>)}
        <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="rounded-full bg-roof px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-roof/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deodar">Book Now</a>
      </nav>
      <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation" className="relative z-20 rounded-full border border-line bg-white p-2.5 text-navy shadow-sm transition hover:border-deodar hover:text-deodar focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deodar xl:hidden">
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
    </div>
    <nav id="mobile-navigation" aria-label="Mobile navigation" aria-hidden={!open} className={`fixed inset-0 z-10 flex flex-col justify-center gap-5 overflow-y-auto bg-white px-8 pb-10 pt-24 transition duration-300 sm:gap-6 sm:px-14 xl:hidden ${open ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"}`}>
      {links.map(([href, label], index) => <a key={href} href={href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} style={{ transitionDelay: open ? `${index * 35}ms` : "0ms" }} className="group flex items-center justify-between border-b border-line py-2 font-display text-3xl text-navy transition hover:text-deodar sm:text-4xl">
        {label}<ArrowUpRight size={20} className="text-deodar" />
      </a>)}
      <a href={`https://wa.me/${site.whatsapp}`} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="mt-3 inline-flex items-center justify-center gap-2 self-start rounded-full bg-roof px-7 py-3.5 text-sm font-semibold text-white shadow-sm">Book Now <ArrowUpRight size={17} /></a>
    </nav>
  </header>;
}
