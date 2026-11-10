"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faq } from "@/data/site";
import { SectionTitle } from "./shared";

export default function FAQs() {
  const [open, setOpen] = useState<number | null>(null);
  return <section id="faqs" className="bg-paper px-5 py-20 sm:px-8 md:py-24"><div className="mx-auto max-w-3xl"><SectionTitle eyebrow="Good to know" title="A few helpful answers"/><div className="divide-y divide-line border-y border-line">{faq.map((item, index) => <div key={item.q} className="py-1"><button aria-expanded={open === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left font-display text-lg text-navy focus-visible:outline-2 focus-visible:outline-deodar sm:text-xl">{item.q}<Plus size={19} className={`shrink-0 text-deodar transition-transform ${open === index ? "rotate-45" : ""}`}/></button><AnimatePresence initial={false}>{open === index && <motion.div id={`faq-answer-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="max-w-2xl pb-5 text-sm leading-7 text-navy/70">{item.a}</p></motion.div>}</AnimatePresence></div>)}</div></div></section>;
}
