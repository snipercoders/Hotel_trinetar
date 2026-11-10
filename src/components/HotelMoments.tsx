"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const moments = [
  {
    title: "A room to unwind",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "The warmth of a getaway",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Make memories together",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function HotelMoments() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (direction: -1 | 1) => {
    track.current?.scrollBy({ left: direction * track.current.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section className="bg-forest px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24" aria-labelledby="hotel-moments-title">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-10 flex items-end justify-between animate-rise sm:mb-12">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-crimson">A glimpse of your stay</p>
            <h2 id="hotel-moments-title" className="font-display text-3xl text-white/90 sm:text-4xl md:text-5xl">Moments at Hotel Trinetar</h2>
          </div>
          <div className="hidden gap-3 sm:flex">
            <button type="button" onClick={() => scroll(-1)} aria-label="Previous moments" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-crimson hover:bg-crimson"><ArrowLeft size={18} /></button>
            <button type="button" onClick={() => scroll(1)} aria-label="Next moments" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-crimson hover:bg-crimson"><ArrowRight size={18} /></button>
          </div>
        </div>
        <div ref={track} className="flex snap-x snap-mandatory gap-5 overflow-x-auto animate-rise-delay-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {moments.map((moment) => (
            <div key={moment.title} className="min-w-[82vw] snap-center overflow-hidden border border-white/10 bg-charcoal sm:min-w-[47%] lg:min-w-0 lg:flex-1">
              <div
                role="img"
                aria-label={moment.title}
                className="h-[260px] bg-cover bg-center transition duration-700 hover:scale-[1.02] sm:h-[320px] lg:h-[360px]"
                style={{ backgroundImage: `url("${moment.image}")` }}
              />
              <p className="px-5 py-4 text-center font-display text-xl text-white/85">{moment.title}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-center gap-3 sm:hidden">
          <button type="button" onClick={() => scroll(-1)} aria-label="Previous moments" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white"><ArrowLeft size={17} /></button>
          <button type="button" onClick={() => scroll(1)} aria-label="Next moments" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white"><ArrowRight size={17} /></button>
        </div>
      </div>
    </section>
  );
}
