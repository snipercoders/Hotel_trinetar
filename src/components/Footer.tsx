import Image from "next/image";
import { site } from "@/data/site";

const footerLinks = [["#home", "Home"], ["#stays", "Stays"], ["#experiences", "Experiences"], ["#moments", "Gallery"], ["#location", "Find us"], ["#faqs", "FAQs"]];

export default function Footer() {
  return <footer className="border-t border-line bg-paper px-5 py-12 text-navy sm:px-8 sm:py-16">
    <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_1fr] lg:gap-14">
      <div>
        <a href="#home" aria-label={`${site.name} ${site.sub}`} className="block w-[210px] max-w-full"><Image src="/images/logo.png" alt={`${site.name} ${site.sub}`} width={543} height={96} className="h-auto w-full" /></a>
        <p className="mt-5 max-w-sm text-sm leading-6 text-navy/75">A welcoming mountain stay in Patnitop, Jammu & Kashmir.</p>
        <p className="mt-4 max-w-sm text-sm leading-6 text-navy/75">{site.address}</p>
      </div>
      <nav aria-label="Footer links" className="flex flex-col items-start gap-3">
        <h2 className="mb-1 text-xs font-semibold uppercase tracking-[.2em] text-deodar">Explore</h2>
        {footerLinks.map(([href, label]) => <a key={href} href={href} className="text-sm text-navy/80 transition hover:text-deodar">{label}</a>)}
      </nav>
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-[.2em] text-deodar">Plan your stay</h2>
        <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="mt-4 block text-base font-medium text-navy transition hover:text-deodar">{site.phone}</a>
        <a href={`mailto:${site.email}`} className="mt-2 block break-all text-sm text-navy/75 transition hover:text-deodar">{site.email}</a>
        <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full bg-roof px-5 py-3 text-sm font-semibold text-white transition hover:bg-roof/90">WhatsApp us</a>
      </div>
    </div>
    <div className="mx-auto mt-10 max-w-7xl border-t border-line pt-5 text-xs text-navy/60">© 2026 {site.name} {site.sub}. All rights reserved.</div>
  </footer>;
}
