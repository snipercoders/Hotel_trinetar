import PageHeader from "@/components/PageHeader";
import { site } from "@/data/site";

export default function Contact() {
  return (
    <>
      <PageHeader accent="Contact" title="Us" text="Call or WhatsApp to check availability and book." />
      <section className="mx-auto max-w-xl space-y-6 px-6 py-20 text-center">
        <p className="text-white/80">{site.address}</p>
        <a href={`tel:${site.phone}`} className="block text-2xl text-crimson">{site.phone}</a>
        <a
          href={`https://wa.me/${site.whatsapp}?text=Hi, I would like to book a stay at Hotel Trinetar`}
          className="inline-block rounded-full bg-crimson px-10 py-3 text-sm uppercase tracking-widest transition hover:bg-crimson/80"
        >
          Book on WhatsApp
        </a>
      </section>
    </>
  );
}
