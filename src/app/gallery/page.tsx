import Image from "next/image";
import PageHeader from "@/components/PageHeader";

const imgs = ["demo-hotel.jpg", "demo-room.jpg", "experience-sheet.png", "hero-mobile.png", "hero.jpg", "demo-room.jpg"];

export default function Gallery() {
  return (
    <>
      <PageHeader accent="Photo" title="Gallery" />
      <section className="mx-auto grid max-w-7xl gap-4 px-6 py-20 sm:grid-cols-2 lg:grid-cols-3">
        {imgs.map((g, index) => (
          <div key={`${g}-${index}`} className="group relative h-72 overflow-hidden rounded-2xl bg-paper shadow-sm">
            <Image src={`/images/${g}`} alt={`Hotel Trinetar sample image ${index + 1}`} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
          </div>
        ))}
      </section>
    </>
  );
}
