import { motion } from "framer-motion";

export const reveal = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } } as const;

export function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10 text-center sm:mb-12">
    <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-deodar">{eyebrow}</p>
    <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl md:text-5xl">{title}</h2>
    <div className="mx-auto mt-5 flex max-w-44 items-center gap-3 text-deodar" aria-hidden="true"><span className="h-px flex-1 bg-deodar/45"/><span className="text-lg">∞</span><span className="h-px flex-1 bg-deodar/45"/></div>
  </motion.div>;
}
