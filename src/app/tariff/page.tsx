import PageHeader from "@/components/PageHeader";
import { rooms } from "@/data/site";

export default function Tariff() {
  return (
    <>
      <PageHeader accent="Room" title="Tariff" text="Rates vary by season. Call to confirm." />
      <section className="mx-auto max-w-3xl px-6 py-20">
        {rooms.map((r) => (
          <div key={r.name} className="flex items-center justify-between border-b border-white/10 py-6">
            <div>
              <p className="font-display text-2xl">{r.name}</p>
              <p className="text-sm text-white/60">{r.note}</p>
            </div>
            <p className="text-xl text-crimson">{r.price}</p>
          </div>
        ))}
      </section>
    </>
  );
}
