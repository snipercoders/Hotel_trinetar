"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/data/site";

const links = [
  ["#home", "Home"], ["#stays", "Stays"], ["#about", "About"],
  ["#experiences", "Experiences"], ["#moments", "Moments"], ["#location", "How to reach us"], ["#faqs", "FAQs"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setPortalReady(true), 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  useEffect(() => {
    const openMenu = () => setOpen(true);
    window.addEventListener("open-mobile-menu", openMenu);
    return () => window.removeEventListener("open-mobile-menu", openMenu);
  }, []);

  const openBooking = () => {
    setOpen(false);
    if (document.querySelector("#home")) window.dispatchEvent(new Event("open-booking"));
    else window.open(`https://wa.me/${site.whatsapp}`, "_blank", "noopener,noreferrer");
  };

  return <><header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white/90 text-navy shadow-sm backdrop-blur-md">
    <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-8 md:h-[76px]">
      <a href="#home" onClick={() => setOpen(false)} aria-label={`${site.name} home`} className="relative z-20 block h-10 w-[226px] md:h-[52px] md:w-[294px]">
        <Image src="/images/logo.png" alt={`${site.name} ${site.sub}`} width={543} height={96} className="h-full w-full object-contain object-left" />
      </a>
      <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
        {links.slice(1).map(([href, label]) => <a key={href} href={href} className="text-sm text-navy transition hover:text-deodar">{label}</a>)}
        <button type="button" onClick={openBooking} className="rounded-full bg-roof px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-roof/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deodar">Book Now</button>
      </nav>
      <div className="relative z-20 flex items-center gap-2 xl:hidden">
        <button type="button" onClick={openBooking} className="rounded-full bg-roof px-4 py-2.5 text-xs font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deodar">Book</button>
        <button type="button" onClick={() => setOpen(true)} aria-label="Open navigation menu" aria-expanded={open} aria-controls="mobile-navigation" className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-3 text-xs font-semibold text-navy shadow-sm focus-visible:outline-2 focus-visible:outline-deodar"><Menu size={18}/><span>Menu</span></button>
      </div>
    </div>
  </header><div aria-hidden="true" className="h-14 md:h-[76px]"/>{portalReady && createPortal(<>
    {open && <button type="button" aria-label="Close navigation menu" onClick={() => setOpen(false)} className="fixed inset-0 z-[90] cursor-default bg-navy/55 backdrop-blur-sm xl:hidden"/>}
    <nav id="mobile-navigation" aria-label="Mobile navigation" aria-hidden={!open} className={`fixed inset-0 z-[110] flex h-[100dvh] min-h-0 w-full flex-col overflow-y-auto overscroll-contain bg-white px-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-[calc(env(safe-area-inset-top)+1rem)] text-navy shadow-2xl transition-transform duration-300 sm:px-10 xl:hidden ${open ? "translate-x-0" : "pointer-events-none translate-x-full"}`}>
      <div className="flex shrink-0 items-center justify-between border-b border-line pb-4"><a href="#home" onClick={() => setOpen(false)} aria-label={`${site.name} home`} className="relative block h-10 w-52"><Image src="/images/logo.png" alt={`${site.name} ${site.sub}`} fill sizes="208px" className="object-contain object-left"/></a><button type="button" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} aria-label="Close navigation menu" className="rounded-full border border-line p-3 text-navy shadow-sm focus-visible:outline-2 focus-visible:outline-deodar"><X size={20}/></button></div>
      <p className="mt-5 shrink-0 text-[10px] font-semibold uppercase tracking-[.28em] text-deodar">Discover Patnitop</p>
      <div className="mt-2 flex shrink-0 flex-col">{links.slice(1).map(([href, label], index) => <a key={href} href={href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} style={{ transitionDelay: open ? `${index * 35}ms` : "0ms" }} className="group flex min-h-14 items-center justify-between border-b border-line py-3 font-display text-[26px] leading-tight text-navy transition hover:text-deodar sm:text-3xl">
        {label}<ArrowUpRight size={19} className="text-deodar transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
      </a>)}</div>
      <button type="button" tabIndex={open ? 0 : -1} onClick={openBooking} className="mt-5 inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-roof px-7 text-sm font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-deodar">Book your stay <ArrowUpRight size={17} /></button>
      <p className="mt-4 shrink-0 text-center text-xs tracking-wide text-navy/55">A quieter pace, among the mountains you can enjoy.</p>
    </nav>
  </>, document.body)}</>;
}
