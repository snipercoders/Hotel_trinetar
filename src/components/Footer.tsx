import Link from "next/link";
import { site } from "@/data/site";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/tariff", label: "Rooms & Tariff" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const nearbyPlaces = ["Patnitop", "Nathatop", "Sanasar", "Madhatop", "Nag Temple"];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-forest px-6 py-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="font-display text-2xl font-bold uppercase tracking-wide">
            {site.name} <span className="text-crimson">{site.sub}</span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/70">
            A welcoming mountain stay, surrounded by deodar forests in beautiful Patnitop.
          </p>
          <p className="mt-5 text-sm leading-6 text-white/70">{site.address}</p>
        </div>

        <nav aria-label="Explore" className="flex flex-col items-start gap-4">
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">Explore</h2>
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-white/70 transition hover:text-crimson">
              {link.label}
            </Link>
          ))}
        </nav>

        <div>
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white">Nearby destinations</h2>
          <ul className="space-y-4 text-sm text-white/70">
            {nearbyPlaces.map((place) => <li key={place}>{place}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">Plan your stay</h2>
          <p className="mt-5 text-sm leading-6 text-white/70">Speak with our team to plan your Patnitop getaway.</p>
          <a href={`tel:${site.phone}`} className="mt-5 block text-xl font-semibold tracking-wide text-white transition hover:text-crimson">
            {site.phone}
          </a>
          <a
            href={`https://wa.me/${site.whatsapp}?text=Hi, I would like to book a stay at Hotel Trinetar`}
            className="mt-5 inline-flex text-sm font-semibold text-crimson transition hover:text-white"
          >
            Chat with us on WhatsApp <span className="ml-2" aria-hidden="true">↗</span>
          </a>
          <a href={`mailto:${site.email}`} className="mt-3 block text-sm text-white/70 transition hover:text-white">
            {site.email}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/50">
        &copy; 2026 {site.name} {site.sub}. All rights reserved.
      </div>
    </footer>
  );
}
