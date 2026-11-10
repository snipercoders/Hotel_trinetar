"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { stays } from "@/data/site";
import { SectionTitle } from "./shared";

export default function Stays() {
  const [filter, setFilter] = useState("All stays");
  const [offset, setOffset] = useState(0);
  const visible = stays.filter((stay) => filter === "All stays" || stay.type === filter);
  const move = (direction: number) => setOffset((current) => (current + direction + visible.length) % visible.length);
  const cards = [...visible.slice(offset), ...visible.slice(0, offset)];

  return <section id="stays" className="bg-paper px-5 py-20 sm:px-8 md:py-28">
    <div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Find your place" title="Enter a world of mountain calm"/>
      <div className="mb-8 flex justify-center gap-5 sm:gap-8" role="tablist" aria-label="Filter stays">{["All stays", "Rooms", "Views"].map((tab) => <button key={tab} role="tab" aria-selected={filter === tab} onClick={() => { setFilter(tab); setOffset(0); }} className={`border-b-2 px-1 pb-2 text-sm transition focus-visible:outline-2 focus-visible:outline-deodar ${filter === tab ? "border-deodar text-navy" : "border-transparent text-navy/55 hover:text-deodar"}`}>{tab}</button>)}</div>
      <div className="relative"><button aria-label="Previous stay" onClick={() => move(-1)} className="absolute -left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-md transition hover:text-deodar focus-visible:outline-2 focus-visible:outline-deodar sm:flex"><ArrowLeft size={18}/></button>
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{cards.map((stay) => <motion.article layout key={stay.title} drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={(_, info) => { if (info.offset.x < -50) move(1); if (info.offset.x > 50) move(-1); }} whileTap={{ cursor: "grabbing" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="group min-w-0 overflow-hidden rounded-2xl border border-line bg-white shadow-sm"><div className="relative aspect-[.78] overflow-hidden bg-deodar-light"><Image src={stay.image} alt={stay.title} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 32vw" className="object-cover transition duration-700 group-hover:scale-[1.04]"/><div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent"/><div className="absolute inset-x-0 bottom-0 p-5 sm:p-6"><p className="text-[10px] uppercase tracking-[.24em] text-white/75">{stay.type}</p><h3 className="mt-2 font-display text-2xl text-white">{stay.title}</h3><p className="mt-2 text-sm text-white/85">{stay.subtitle}</p></div></div></motion.article>)}</motion.div>
        <button aria-label="Next stay" onClick={() => move(1)} className="absolute -right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-md transition hover:text-deodar focus-visible:outline-2 focus-visible:outline-deodar sm:flex"><ArrowRight size={18}/></button></div>
      <div className="mt-5 flex justify-center gap-2 sm:hidden"><button onClick={() => move(-1)} aria-label="Previous stay" className="rounded-full bg-white p-3 text-navy shadow-sm"><ArrowLeft size={18}/></button><button onClick={() => move(1)} aria-label="Next stay" className="rounded-full bg-white p-3 text-navy shadow-sm"><ArrowRight size={18}/></button></div>
    </div>
  </section>;
}
