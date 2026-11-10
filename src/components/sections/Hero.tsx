"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { reveal } from "./shared";

export default function Hero() {
  const reduce = useReducedMotion();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const message = `Hello, I'd like to enquire about a stay at Hotel Trinetar. Check-in: ${checkIn || "not selected"}; check-out: ${checkOut || "not selected"}; guests: ${guests}.`;

  return <section id="home" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-4 pb-6 pt-28 sm:px-8 sm:pb-8 lg:px-12">
    <motion.div aria-hidden="true" className="absolute inset-0 bg-paper" animate={reduce ? {} : { scale: [1, 1.04] }} transition={{ duration: 28, repeat: Infinity, repeatType: "reverse", ease: "linear" }}>
      <Image src="/images/hero.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[62%_center]" />
    </motion.div>
    <div className="absolute inset-0 bg-gradient-to-r from-navy/75 via-navy/35 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-navy/10" />
    <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.14 } } }} className="relative mx-auto mb-8 w-full max-w-6xl text-left sm:mb-12">
      <motion.p variants={reveal} className="text-xs font-medium uppercase tracking-[.28em] text-white/90">Patnitop · Shivalik Mountains</motion.p>
      <motion.h1 variants={reveal} className="mt-5 max-w-3xl font-display text-[clamp(2.7rem,10vw,4.5rem)] leading-[1.03] text-white md:text-7xl lg:text-8xl">Wake up above<br className="hidden sm:block"/> the clouds</motion.h1>
      <motion.p variants={reveal} className="mt-5 max-w-lg text-sm leading-7 text-white/90 sm:text-base">A quieter pace, among the mountains of Patnitop.</motion.p>
    </motion.div>
    <div className="relative mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-1 gap-y-1 rounded-2xl border border-white/70 bg-white/95 p-2 text-navy shadow-md backdrop-blur-md sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(100px,.7fr)_auto] sm:items-center sm:gap-2 sm:rounded-full sm:p-2">
      {[{ label: "Check-in", value: checkIn, set: setCheckIn }, { label: "Check-out", value: checkOut, set: setCheckOut }].map((item) => <label key={item.label} className="min-w-0 rounded-xl px-2 py-1.5 text-[9px] uppercase tracking-[.12em] text-navy/60 sm:border-r sm:border-line sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-widest"><span className="block">{item.label}</span><input aria-label={item.label} type="date" value={item.value} onChange={(event) => item.set(event.target.value)} className="mt-0.5 block w-full min-w-0 bg-transparent text-xs normal-case tracking-normal text-navy focus-visible:outline-2 focus-visible:outline-deodar sm:mt-1 sm:text-sm" /></label>)}
      <label className="min-w-0 rounded-xl px-2 py-1.5 text-[9px] uppercase tracking-[.12em] text-navy/60 sm:border-r sm:border-line sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-widest"><span className="block">Guests</span><select value={guests} onChange={(event) => setGuests(event.target.value)} className="mt-0.5 w-full min-w-0 bg-transparent text-xs normal-case tracking-normal text-navy focus-visible:outline-2 focus-visible:outline-deodar sm:mt-1 sm:text-sm"><option value="1">1 guest</option>{[2, 3, 4, 5, 6].map((number) => <option key={number} value={number}>{number} guests</option>)}</select></label>
      <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" className="flex min-h-10 min-w-0 items-center justify-center gap-1 rounded-full bg-roof px-2 text-center text-xs font-semibold text-white shadow-sm transition hover:bg-roof/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deodar sm:min-h-12 sm:gap-2 sm:px-5 sm:text-sm">Check availability <ArrowUpRight size={15} className="shrink-0 sm:size-4"/></a>
    </div>
    <a href="#stays" aria-label="Scroll to stays" className="relative mx-auto mt-6 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[.22em] text-white/90">Scroll to explore <ArrowDown size={14}/></a>
  </section>;
}
