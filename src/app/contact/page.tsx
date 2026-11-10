import PageHeader from "@/components/PageHeader";
import { site } from "@/data/site";

export default function Contact() {
  return (
    <>
      <PageHeader accent="Contact" title="Us" text="Call or WhatsApp to check availability and book." />
      <section className="mx-auto max-w-xl space-y-6 px-5 py-16 text-center text-navy sm:px-6 sm:py-20">
        <p className="text-navy/75">{site.address}</p>
        <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="block text-2xl font-medium text-navy hover:text-deodar">{site.phone}</a>
        <a
          href={`https://wa.me/${site.whatsapp}?text=Hi, I would like to book a stay at Hotel Trinetar`}
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-full bg-roof px-10 py-3 text-sm font-semibold text-white uppercase tracking-widest shadow-sm transition hover:bg-roof/90"
        >
          Book on WhatsApp
        </a>
      </section>
    </>
  );
}
