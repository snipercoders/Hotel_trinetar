"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { reveal } from "./shared";

export default function About() {
  const reduce = useReducedMotion();
  const stats = [[site.highwayDistance, "to National Highway"], [site.nagTempleDistance, "to Nag Temple"], [site.roomCount, "rooms"], [site.altitude, "above sea level"]];
  return <section id="about" className="bg-white px-5 py-20 sm:px-8 md:py-28"><div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-14">
    <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative h-[340px] overflow-hidden rounded-2xl bg-paper sm:h-[460px] lg:h-[540px]"><Image src="/images/hero.jpg" alt="Illustrative image of a red-roofed hotel among deodar trees" fill sizes="(max-width: 768px) 90vw, 50vw" className="object-cover" /></motion.div>
    <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}><p className="text-[11px] font-semibold uppercase tracking-[.28em] text-deodar">A stay in the mountains</p><h2 className="mt-3 font-display text-4xl text-navy sm:text-5xl">A little closer to stillness</h2><p className="mt-6 max-w-xl leading-7 text-navy/75">Find a welcoming base for your time in Patnitop, with the Shivalik Mountains and local sights all around.</p><div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4">{stats.map(([value, label]) => <div key={label} className="rounded-xl bg-deodar-light p-4 sm:p-5"><p className="font-display text-xl text-navy sm:text-2xl">{value}</p><p className="mt-1 text-xs text-navy/65 sm:text-sm">{label}</p></div>)}</div></motion.div>
  </div></section>;
}
