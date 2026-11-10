import Image from "next/image";
import PageHeader from "@/components/PageHeader";

const imgs = ["g1", "g2", "g3", "g4", "g5", "g6"];

export default function Gallery() {
  return (
    <>
      <PageHeader accent="Photo" title="Gallery" />
      <section className="mx-auto grid max-w-7xl gap-4 px-6 py-20 sm:grid-cols-2 lg:grid-cols-3">
        {imgs.map((g) => (
          <div key={g} className="group relative h-72 overflow-hidden rounded-xl bg-charcoal">
            <Image src={`/images/${g}.jpg`} alt="Hotel Trinetar" fill className="object-cover transition duration-700 group-hover:scale-110" />
          </div>
        ))}
      </section>
    </>
  );
}
