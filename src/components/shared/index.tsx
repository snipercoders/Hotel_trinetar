"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Menu, X } from "lucide-react";
import { faq } from "@/data/site";
import { whatsappHref } from "./data";
export { phoneHref, whatsappHref } from "./data";

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>{children}</motion.div>;
}

export function Counter({ value, label }: { value: string; label: string }) {
  return <div className="border-l border-line pl-4"><p className="font-display text-2xl text-navy">{value}</p><p className="mt-1 text-xs text-navy/70">{label}</p></div>;
}

export function BookingBar({ compact = false }: { compact?: boolean }) {
  const [arrival, setArrival] = useState(""); const [departure, setDeparture] = useState(""); const [guests, setGuests] = useState("2");
  const message = `Hello, I'd like to enquire about a stay at Hotel Trinetar. Check-in: ${arrival || "not selected"}; check-out: ${departure || "not selected"}; guests: ${guests}.`;
  return <div className={`grid grid-cols-2 gap-2 rounded-2xl border border-line bg-white p-3 text-navy shadow-lg sm:grid-cols-[1fr_1fr_.7fr_auto] sm:items-end ${compact ? "max-w-3xl" : "max-w-4xl"}`}>
    <label className="min-w-0 text-[10px] font-semibold uppercase tracking-widest text-navy/60">Check-in<input aria-label="Check-in" type="date" value={arrival} onChange={e => setArrival(e.target.value)} className="mt-1 block w-full min-w-0 rounded px-1 py-1 text-xs text-navy focus-visible:outline-2 focus-visible:outline-deodar" /></label>
    <label className="min-w-0 text-[10px] font-semibold uppercase tracking-widest text-navy/60">Check-out<input aria-label="Check-out" type="date" value={departure} onChange={e => setDeparture(e.target.value)} className="mt-1 block w-full min-w-0 rounded px-1 py-1 text-xs text-navy focus-visible:outline-2 focus-visible:outline-deodar" /></label>
    <label className="min-w-0 text-[10px] font-semibold uppercase tracking-widest text-navy/60">Guests<select value={guests} onChange={e => setGuests(e.target.value)} className="mt-1 block w-full rounded bg-white py-1 text-xs text-navy focus-visible:outline-2 focus-visible:outline-deodar">{[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}</select></label>
    <a href={whatsappHref(message)} target="_blank" rel="noreferrer" className="col-span-2 flex min-h-11 items-center justify-center rounded-full bg-roof px-5 text-sm font-semibold text-white hover:bg-roof/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deodar sm:col-span-1">Check availability</a>
  </div>;
}

export function Accordion() {
  const [open, setOpen] = useState<number | null>(null);
  return <div className="divide-y divide-line border-y border-line">{faq.map((item, i) => <div key={item.q}><button aria-expanded={open === i} aria-controls={`answer-${i}`} onClick={() => setOpen(open === i ? null : i)} className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left font-display text-lg focus-visible:outline-2 focus-visible:outline-deodar">{item.q}<span aria-hidden="true" className="text-deodar">{open === i ? "−" : "+"}</span></button>{open === i && <p id={`answer-${i}`} className="max-w-2xl pb-5 text-sm leading-7 text-navy/75">{item.a}</p>}</div>)}</div>;
}

const gallery = ["demo-hotel.jpg", "demo-room.jpg", "experience-sheet.png", "hero-mobile.png", "demo-hotel.jpg", "demo-room.jpg"];
export function Lightbox({ style = "grid" }: { style?: "grid" | "masonry" }) {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  useEffect(() => { const key = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); if (active !== null && e.key === "ArrowRight") setActive((active + 1) % gallery.length); if (active !== null && e.key === "ArrowLeft") setActive((active + gallery.length - 1) % gallery.length); }; window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); }, [active]);
  return <><div className={style === "masonry" ? "columns-2 gap-3 md:columns-3" : "grid grid-cols-2 gap-2 md:grid-cols-4"}>{gallery.map((src, i) => <button key={`${src}-${i}`} onClick={() => setActive(i)} aria-label={`View gallery image ${i + 1}`} className={`relative mb-3 block w-full overflow-hidden bg-paper focus-visible:outline-2 focus-visible:outline-deodar ${i % 3 === 0 ? "aspect-[.82]" : "aspect-[1.2]"}`}><Image src={`/images/${src}`} alt={`Hotel Trinetar and Patnitop sample image ${i + 1}`} fill sizes="(max-width: 640px) 48vw, 25vw" className="object-cover" /></button>)}</div>
  <AnimatePresence>{active !== null && <motion.div role="dialog" aria-modal="true" aria-label="Image viewer" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.18 }} onClick={() => setActive(null)} className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/95 p-5"><button aria-label="Close gallery" onClick={() => setActive(null)} className="absolute right-4 top-4 rounded-full bg-white p-3 text-navy focus-visible:outline-2 focus-visible:outline-deodar"><X/></button><button aria-label="Previous image" onClick={e => { e.stopPropagation(); setActive((active + gallery.length - 1) % gallery.length); }} className="absolute left-3 rounded-full bg-white p-3 text-navy"><ArrowLeft/></button><Image src={`/images/${gallery[active]}`} alt={`Hotel Trinetar and Patnitop sample image ${active + 1}`} width={1200} height={900} onClick={e => e.stopPropagation()} className="max-h-[85vh] w-auto max-w-[82vw] object-contain"/><button aria-label="Next image" onClick={e => { e.stopPropagation(); setActive((active + 1) % gallery.length); }} className="absolute right-3 top-1/2 rounded-full bg-white p-3 text-navy"><ArrowRight/></button></motion.div>}</AnimatePresence></>;
}

export function DrawerNav() {
  const [open, setOpen] = useState(false); const reduce = useReducedMotion(); const links = [["#stays", "Stays"], ["#about", "About"], ["#experiences", "Experiences"], ["#moments", "Moments"], ["#location", "Reach us"], ["#faqs", "FAQs"]];
  return <><button onClick={() => setOpen(true)} aria-label="Open menu" className="rounded-full border border-line p-3 focus-visible:outline-2 focus-visible:outline-deodar"><Menu/></button><AnimatePresence>{open && <motion.nav initial={reduce ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduce ? 0 : 24 }} transition={{ duration: reduce ? 0 : 0.2 }} aria-label="Main navigation" className="fixed inset-0 z-[70] flex flex-col gap-5 overflow-y-auto bg-paper p-8 pt-20"><button onClick={() => setOpen(false)} aria-label="Close menu" className="absolute right-5 top-5 rounded-full p-3 focus-visible:outline-2 focus-visible:outline-deodar"><X/></button>{links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-line py-3 font-display text-3xl focus-visible:outline-2 focus-visible:outline-deodar">{label}</a>)}<a href={whatsappHref()} className="mt-3 rounded-full bg-roof px-6 py-4 text-center font-semibold text-white">Book Now</a></motion.nav>}</AnimatePresence></>;
}

export function DevSwitcher() {
  if (process.env.NODE_ENV === "production") return null;
  return <nav aria-label="Layout previews" className="fixed bottom-3 right-3 z-[90] flex gap-1 rounded-full border border-line bg-white/95 p-1.5 text-xs shadow-lg backdrop-blur"><Link href="/layout-a" className="rounded-full px-3 py-2 hover:bg-paper focus-visible:outline-2 focus-visible:outline-deodar">A</Link><Link href="/layout-b" className="rounded-full px-3 py-2 hover:bg-paper focus-visible:outline-2 focus-visible:outline-deodar">B</Link><Link href="/layout-c" className="rounded-full px-3 py-2 hover:bg-paper focus-visible:outline-2 focus-visible:outline-deodar">C</Link></nav>;
}

export function StickyBook() {
  const [show, setShow] = useState(false); const reduce = useReducedMotion();
  useEffect(() => { const update = () => setShow(window.scrollY > window.innerHeight * 0.82); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  return <AnimatePresence>{show && <motion.a initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduce ? 0 : 10 }} transition={{ duration: reduce ? 0 : 0.2 }} href={whatsappHref()} className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-roof px-6 py-3 text-sm font-semibold text-white shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deodar">Book Now</motion.a>}</AnimatePresence>;
}
