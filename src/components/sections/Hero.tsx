"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Minus, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

function addDays(value: string, days: number) {
  const date = value ? new Date(`${value}T12:00:00`) : new Date();
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}-${`${date.getDate()}`.padStart(2, "0")}`;
}

function formatDate(value: string) {
  if (!value) return "Select date";
  return new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "2-digit", month: "short" }).format(new Date(`${value}T12:00:00`));
}

function DateField({ label, value, min, onChange }: { label: string; value: string; min: string; onChange: (value: string) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const openPicker = () => {
    const field = input.current;
    if (!field) return;
    if ("showPicker" in field && typeof field.showPicker === "function") field.showPicker();
    else field.focus();
  };
  return <div className="relative min-w-0">
    <span className="block text-[10px] font-semibold uppercase tracking-widest text-navy/60">{label}</span>
    <button type="button" onClick={openPicker} className="mt-1 flex min-h-12 w-full items-center gap-2 rounded-lg text-left text-base text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deodar">
      <CalendarDays size={18} className="shrink-0 text-deodar" aria-hidden="true"/><span className="truncate">{formatDate(value)}</span>
    </button>
    <input ref={input} aria-label={`${label} date`} type="date" value={value} min={min} onChange={(event) => onChange(event.target.value)} className="pointer-events-none absolute left-1/2 top-1/2 h-px w-px opacity-0" tabIndex={-1}/>
  </div>;
}

function GuestStepper({ guests, setGuests }: { guests: number; setGuests: (value: number) => void }) {
  return <div className="flex min-h-12 items-center justify-between gap-3">
    <span className="text-base text-navy">{guests} {guests === 1 ? "guest" : "guests"}</span>
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} disabled={guests <= 1} aria-label="Remove a guest" className="flex size-9 items-center justify-center rounded-full border border-line text-navy hover:border-deodar disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-deodar"><Minus size={16}/></button>
      <button type="button" onClick={() => setGuests(Math.min(10, guests + 1))} disabled={guests >= 10} aria-label="Add a guest" className="flex size-9 items-center justify-center rounded-full border border-line text-navy hover:border-deodar disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-deodar"><Plus size={16}/></button>
    </div>
  </div>;
}

export default function Hero() {
  const reduce = useReducedMotion();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [today, setToday] = useState("");
  const [guests, setGuests] = useState(2);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const minCheckout = checkIn ? addDays(checkIn, 1) : today ? addDays(today, 1) : "";
  const valid = Boolean(checkIn && checkOut && checkOut >= minCheckout);
  const message = `Hello, I'd like to enquire about a stay at ${site.name} ${site.sub}. Check-in: ${checkIn ? formatDate(checkIn) : "not selected"}; check-out: ${checkOut ? formatDate(checkOut) : "not selected"}; guests: ${guests}.`;
  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
  const openSheet = useCallback(() => {
    openerRef.current = document.activeElement as HTMLElement;
    setSheetOpen(true);
  }, []);

  useEffect(() => {
    const dateTimer = window.setTimeout(() => setToday(new Date().toISOString().slice(0, 10)), 0);
    const onOpen = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setDesktopOpen(true);
      else openSheet();
    };
    window.addEventListener("open-booking", onOpen);
    return () => { window.clearTimeout(dateTimer); window.removeEventListener("open-booking", onOpen); };
  }, [openSheet]);

  useEffect(() => {
    const hero = sectionRef.current;
    const footer = document.querySelector("footer");
    if (!hero || !("IntersectionObserver" in window)) return;
    const heroObserver = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.05 });
    heroObserver.observe(hero);
    const footerObserver = footer ? new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: 0.01 }) : null;
    if (footer && footerObserver) footerObserver.observe(footer);
    return () => { heroObserver.disconnect(); footerObserver?.disconnect(); };
  }, []);

  useEffect(() => {
    if (!sheetOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () => sheetRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([tabindex="-1"])') ?? [];
    focusables()[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setSheetOpen(false); return; }
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0], last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); openerRef.current?.focus(); };
  }, [sheetOpen]);

  const form = (compact = false) => <>
    <DateField label="Check-in" value={checkIn} min={today} onChange={(value) => { setCheckIn(value); if (checkOut && checkOut <= value) setCheckOut(addDays(value, 1)); }}/>
    <DateField label="Check-out" value={checkOut} min={minCheckout} onChange={setCheckOut}/>
    <div className="min-w-0"><span className="block text-[10px] font-semibold uppercase tracking-widest text-navy/60">Guests</span><GuestStepper guests={guests} setGuests={setGuests}/></div>
    <a href={valid ? whatsappUrl : undefined} aria-disabled={!valid} onClick={(event) => { if (!valid) event.preventDefault(); }} target="_blank" rel="noreferrer" className={`flex min-h-[52px] items-center justify-center rounded-full bg-roof px-5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-roof/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deodar ${!valid ? "cursor-not-allowed opacity-60" : ""}`}>{compact ? "Send on WhatsApp" : "Check availability"}</a>
  </>;

  return <>
    <section ref={sectionRef} id="home" className="relative flex min-h-[calc(100svh-56px)] flex-col justify-end overflow-visible bg-paper pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-20 md:min-h-[calc(100svh-76px)] md:justify-center md:pb-32">
      <motion.div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-paper" initial={reduce ? false : { scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: reduce ? 0 : 1.6, ease: "easeOut" }}>
        <Image src="/images/hero.jpg" alt="Hotel among deodar trees in the Shivalik Mountains" fill priority sizes="100vw" className="object-cover object-[62%_center]"/>
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-navy/70 via-navy/70 via-60% to-transparent md:bg-gradient-to-r md:from-navy/70 md:via-navy/70 md:via-55% md:to-transparent"/>
      <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.1 } } }} className="relative z-10 mx-auto mb-5 w-full max-w-7xl px-5 text-white sm:px-8 md:mb-0 md:translate-y-8">
        <motion.p variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5 } } }} className="text-xs font-medium uppercase tracking-widest text-white/80">Patnitop · Shivalik Mountains</motion.p>
        <h1 className="mt-3 max-w-[12ch] font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.02] text-white md:max-w-[14ch]">
          <motion.span className="block md:hidden" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.15 }}>Wake up</motion.span>
          <motion.span className="block md:hidden" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.25 }}>above the clouds</motion.span>
          <motion.span className="hidden md:block" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.15 }}>Wake up above</motion.span>
          <motion.span className="hidden md:block" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.25 }}>the clouds</motion.span>
        </h1>
        <motion.p initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : 0.35 }} className="mt-3 max-w-lg text-sm leading-6 text-white/90 sm:text-base">A quieter pace, among the mountains of Patnitop.</motion.p>
        <motion.button initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : 0.45 }} onClick={openSheet} className="mt-5 min-h-[52px] w-full rounded-full bg-roof px-6 text-sm font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden">Check availability</motion.button>
      </motion.div>
      <div className="absolute right-[max(2rem,calc((100vw-80rem)/2))] top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {[`${site.highwayDistance} from National Highway`, `Minutes from Nag Temple`].map((fact, index) => <motion.div key={fact} animate={reduce ? {} : { y: [0, -5, 0] }} transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }} className="rounded-full border border-white/20 bg-white/15 px-5 py-3 text-sm text-white shadow-sm backdrop-blur-md">{fact}</motion.div>)}
      </div>
      <div className="absolute inset-x-0 bottom-0 z-20 mx-auto hidden max-w-7xl translate-y-1/2 px-8 md:block">
        <div className="grid grid-cols-[1fr_1fr_1fr_1.1fr] items-center gap-5 rounded-2xl bg-white p-5 text-navy shadow-md">{form()}</div>
      </div>
    </section>

    <section aria-label="Hotel at a glance" className="bg-white px-5 py-6 md:pt-16 md:pb-8">
      <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-line">
        {[[site.highwayDistance, "from National Highway"], ["Minutes", "from Nag Temple"], [site.altitude, "altitude"]].map(([value, label]) => <div key={label} className="px-2 text-center first:pl-0 last:pr-0 md:px-10"><p className="font-display text-base sm:text-lg md:text-2xl">{value}</p><p className="mt-1 text-[10px] leading-4 text-navy/65 sm:text-xs">{label}</p></div>)}
      </div>
    </section>

    <AnimatePresence>
      {sheetOpen && <div className="fixed inset-0 z-[90] md:hidden" role="presentation">
        <motion.button aria-label="Close booking panel" onClick={() => setSheetOpen(false)} className="absolute inset-0 h-full w-full bg-navy/55" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
        <motion.div ref={sheetRef} role="dialog" aria-modal="true" aria-labelledby="booking-title" drag="y" dragDirectionLock dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.35 }} onDragEnd={(_, info) => { if (info.offset.y > 100 || info.velocity.y > 500) setSheetOpen(false); }} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={reduce ? { duration: 0 } : { type: "spring", damping: 30, stiffness: 320 }} className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white px-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-5 text-navy shadow-xl">
          <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-line"/><div className="mb-4 flex items-center justify-between"><h2 id="booking-title" className="font-display text-2xl">Plan your stay</h2><button type="button" onClick={() => setSheetOpen(false)} aria-label="Close booking panel" className="rounded-full p-2 focus-visible:outline-2 focus-visible:outline-deodar">×</button></div>
          <div className="grid grid-cols-2 gap-4">{form(true)}</div>
        </motion.div>
      </div>}
    </AnimatePresence>

    <AnimatePresence>{desktopOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] hidden md:block">
      <button aria-label="Close booking options" onClick={() => setDesktopOpen(false)} className="absolute inset-0 size-full cursor-default"/>
      <motion.div role="dialog" aria-modal="false" aria-labelledby="desktop-booking-title" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: reduce ? 0 : 0.18 }} className="absolute right-[max(2rem,calc((100vw-80rem)/2))] top-[88px] w-[min(94vw,600px)] rounded-2xl border border-line bg-white p-6 text-navy shadow-xl">
        <div className="mb-4 flex items-center justify-between"><h2 id="desktop-booking-title" className="font-display text-2xl">Check availability</h2><button type="button" onClick={() => setDesktopOpen(false)} aria-label="Close booking options" className="rounded-full px-3 py-1 text-2xl leading-none focus-visible:outline-2 focus-visible:outline-deodar">×</button></div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">{form(true)}</div>
      </motion.div>
    </motion.div>}</AnimatePresence>

    <AnimatePresence>{!heroVisible && !footerVisible && <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }} className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-line bg-white px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] shadow-lg md:hidden">
      <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="flex min-h-12 flex-1 items-center justify-center rounded-full border border-deodar text-sm font-semibold text-deodar focus-visible:outline-2 focus-visible:outline-deodar">Call</a><a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-roof text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-deodar">WhatsApp</a>
    </motion.div>}</AnimatePresence>
  </>;
}
