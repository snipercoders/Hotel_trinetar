"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { SectionTitle } from "./shared";

const images = ["demo-hotel.jpg", "demo-room.jpg", "experience-sheet.png", "hero-mobile.png", "demo-hotel.jpg", "demo-room.jpg"];

export default function Moments() {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((current) => (current! + 1) % images.length);
      if (event.key === "ArrowLeft") setActive((current) => (current! - 1 + images.length) % images.length);
      if (event.key === "Tab") {
        const buttons = document.querySelectorAll<HTMLButtonElement>("[data-lightbox-control]");
        const first = buttons[0]; const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return <section id="moments" className="bg-white px-5 py-20 sm:px-8 md:py-28"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="A glimpse of Patnitop" title="Moments at Hotel Trinetar"/><div className="columns-2 gap-3 md:columns-3">{images.map((src, index) => <button key={`${src}-${index}`} onClick={() => setActive(index)} aria-label={`View gallery image ${index + 1}`} className={`mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl bg-paper focus-visible:outline-2 focus-visible:outline-deodar ${index % 3 === 0 ? "aspect-[.85]" : "aspect-[1.25]"}`}><Image src={`/images/${src}`} alt={`Hotel Trinetar and Patnitop sample image ${index + 1}`} width={800} height={1000} sizes="(max-width: 768px) 45vw, 30vw" className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"/></button>)}</div></div>
    <AnimatePresence>{active !== null && <motion.div role="dialog" aria-modal="true" aria-label="Image viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)} className="fixed inset-0 z-[70] flex items-center justify-center bg-navy/95 p-5"><button ref={closeRef} data-lightbox-control onClick={() => setActive(null)} aria-label="Close gallery" className="absolute right-5 top-5 rounded-full bg-white p-3 text-navy"><X/></button><button data-lightbox-control onClick={(event) => { event.stopPropagation(); setActive((active - 1 + images.length) % images.length); }} aria-label="Previous image" className="absolute left-3 rounded-full bg-white p-3 text-navy"><ArrowLeft/></button><Image src={`/images/${images[active]}`} alt={`Hotel Trinetar and Patnitop sample image ${active + 1}`} width={1200} height={900} onClick={(event) => event.stopPropagation()} className="max-h-[85vh] w-auto max-w-[85vw] object-contain"/><button data-lightbox-control onClick={(event) => { event.stopPropagation(); setActive((active + 1) % images.length); }} aria-label="Next image" className="absolute right-3 top-1/2 rounded-full bg-white p-3 text-navy"><ArrowRight/></button></motion.div>}</AnimatePresence>
  </section>;
}
