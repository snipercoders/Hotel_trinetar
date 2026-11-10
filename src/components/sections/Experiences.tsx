"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Flame, Mountain, Trees, Wind } from "lucide-react";
import { reveal, SectionTitle } from "./shared";

const items = [
  { icon: Wind, title: "Paragliding", text: "Take to the mountain air.", origin: "top left" },
  { icon: Mountain, title: "Nag Temple", text: "Visit a much-loved local landmark.", origin: "top right" },
  { icon: Trees, title: "Forest walks", text: "Find your own pace among the trees.", origin: "bottom left" },
  { icon: Flame, title: "Bonfire evenings", text: "End the day gathered around the fire.", origin: "bottom right" },
];

export default function Experiences() {
  return <section id="experiences" className="bg-paper px-5 py-20 sm:px-8 md:py-28"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Days well spent" title="Make room for the outdoors"/><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map(({ icon: Icon, title, text, origin }, index) => <motion.article key={title} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="group relative aspect-[.9] min-h-72 overflow-hidden rounded-2xl bg-deodar-light shadow-sm"><Image src="/images/experience-sheet.png" alt="" fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 44vw, 24vw" style={{ transform: "scale(2)", transformOrigin: origin }} className="object-cover transition-transform duration-700 group-hover:scale-[2.04]"/><div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent"/><div className="absolute inset-x-0 bottom-0 p-6 sm:p-7"><Icon size={21} className="mb-4 text-white"/><h3 className="font-display text-2xl text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-white/85">{text}</p></div></motion.article>)}</div></div></section>;
}
