import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Hotel Trinetar Resorts | Patnitop, Jammu & Kashmir",
  description: "Find a quieter pace in Patnitop at Hotel Trinetar Resorts, among the Shivalik Mountains.",
  openGraph: { title: "Hotel Trinetar Resorts | Patnitop", description: "A mountain stay in Patnitop, Jammu & Kashmir.", type: "website", locale: "en_IN" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Hotel", name: `${site.name} ${site.sub}`, telephone: site.phone, email: site.email, address: { "@type": "PostalAddress", streetAddress: site.address, addressLocality: "Patnitop", addressRegion: "Jammu & Kashmir", addressCountry: "IN" } }) }} />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
