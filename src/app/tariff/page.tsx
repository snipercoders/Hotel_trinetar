import PageHeader from "@/components/PageHeader";
import { rooms } from "@/data/site";

export default function Tariff() {
  return (
    <>
      <PageHeader accent="Room" title="Tariff" text="Rates vary by season. Call to confirm." />
      <section className="mx-auto max-w-3xl px-5 py-16 text-navy sm:px-6 sm:py-20">
        {rooms.map((r) => (
          <div key={r.name} className="flex flex-col gap-3 border-b border-line py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-2xl">{r.name}</p>
              <p className="text-sm text-navy/60">{r.note}</p>
            </div>
            <p className="text-base font-semibold text-deodar">{r.price}</p>
          </div>
        ))}
      </section>
    </>
  );
}
