"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

const categories = ["All stays", "Rooms", "Experiences"] as const;
type Category = (typeof categories)[number];

const highlights: { title: string; subtitle: string; category: Exclude<Category, "All stays">; image: string; href: string }[] = [
  {
    title: "A room above the clouds",
    subtitle: "Comfort shaped by the mountains",
    category: "Rooms",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85",
    href: "/tariff",
  },
  {
    title: "Into the deodar forest",
    subtitle: "Find your quiet among the trees",
    category: "Experiences",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85",
    href: "/gallery",
  },
  {
    title: "A slower kind of stay",
    subtitle: "Make Patnitop your own escape",
    category: "Rooms",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85",
    href: "/contact",
  },
];

export default function StayHighlights() {
  const [category, setCategory] = useState<Category>("All stays");
  const track = useRef<HTMLDivElement>(null);
  const visibleHighlights = useMemo(
    () => category === "All stays" ? highlights : highlights.filter((item) => item.category === category),
    [category],
  );

  const move = (direction: -1 | 1) => {
    track.current?.scrollBy({ left: direction * track.current.clientWidth * 0.72, behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden bg-charcoal py-20 text-white sm:py-24" aria-labelledby="stay-highlights-title">
      <div className="mx-auto max-w-[1600px]">
        <div className="px-6 text-center animate-rise">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-crimson">Hotel Trinetar · Patnitop</p>
          <h2 id="stay-highlights-title" className="font-display text-3xl font-medium text-white/90 sm:text-4xl md:text-5xl">
            Enter a world of mountain calm
          </h2>
          <div className="mx-auto mt-6 flex max-w-xs items-center justify-center gap-3 text-crimson" aria-hidden="true">
            <span className="h-px flex-1 bg-crimson/45" /><span className="text-2xl leading-none">∞</span><span className="h-px flex-1 bg-crimson/45" />
          </div>
          <div className="mt-8 flex justify-center gap-7 sm:gap-12" role="tablist" aria-label="Explore hotel highlights">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={category === item}
                onClick={() => {
                  setCategory(item);
                  if (track.current) track.current.scrollLeft = 0;
                }}
                className={`border-b pb-2 text-sm transition sm:text-base ${category === item ? "border-crimson text-white" : "border-transparent text-white/60 hover:text-white"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-8">
          <div ref={track} className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 animate-rise-delay-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5 sm:px-10">
            {visibleHighlights.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group min-w-[82vw] snap-center overflow-hidden border border-white/15 bg-forest sm:min-w-[48vw] lg:min-w-[31vw]"
              >
                <div
                  role="img"
                  aria-label={item.subtitle}
                  className="relative h-[300px] bg-cover bg-center transition duration-700 group-hover:scale-[1.02] sm:h-[380px] lg:h-[430px]"
                  style={{ backgroundImage: `linear-gradient(0deg, rgba(6,17,12,.25), transparent 48%), url("${item.image}")` }}
                >
                  <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-forest/50 text-white opacity-0 transition group-hover:opacity-100">
                    <ArrowUpRight size={19} />
                  </span>
                </div>
                <div className="min-h-[94px] px-5 py-4 text-center sm:px-7">
                  <h3 className="font-display text-xl text-white/90 sm:text-2xl">{item.title}</h3>
                  <p className="mt-1 text-sm text-white/55">{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-3 lg:flex">
            <button type="button" aria-label="Scroll highlights left" onClick={() => move(-1)} className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-crimson/50 bg-forest/90 text-white transition hover:bg-crimson">
              <ArrowLeft size={20} />
            </button>
            <button type="button" aria-label="Scroll highlights right" onClick={() => move(1)} className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-crimson/50 bg-forest/90 text-white transition hover:bg-crimson">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
