import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/data/site";
import SiteChrome from "@/components/shared/SiteChrome";

export const metadata: Metadata = {
  title: "Hotel Trinetar Resorts | Patnitop, Jammu & Kashmir",
  description: "Find a quieter pace in Patnitop at Hotel Trinetar Resorts, among the Shivalik Mountains.",
  openGraph: { title: "Hotel Trinetar Resorts | Patnitop", description: "A mountain stay in Patnitop, Jammu & Kashmir.", type: "website", locale: "en_IN" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Hotel", name: `${site.name} ${site.sub}`, telephone: site.phone, email: site.email, address: { "@type": "PostalAddress", streetAddress: site.address, addressLocality: "Patnitop", addressRegion: "Jammu & Kashmir", addressCountry: "IN" } }) }} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
