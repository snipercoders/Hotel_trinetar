"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { reveal, SectionTitle } from "./shared";

export default function Reviews() {
  return <section id="reviews" className="bg-deodar-light px-5 py-20 sm:px-8 md:py-24"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Kind words" title="Guest notes"/><div className="grid gap-4 md:grid-cols-3">{site.reviews.map((review, index) => <motion.blockquote key={index} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-7"><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-deodar">Sample review</p><p className="font-display text-xl leading-8 text-navy">“{review.quote}”</p><footer className="mt-6 text-xs font-semibold uppercase tracking-widest text-navy/55">{review.name}</footer></motion.blockquote>)}</div><a href={site.tripadvisorUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-deodar underline decoration-deodar/50 underline-offset-4 hover:text-navy">See us on Tripadvisor <ArrowUpRight size={15}/></a></div></section>;
}
