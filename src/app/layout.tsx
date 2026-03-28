import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/layout/Analytics";
import { StickyBottomBar } from "@/components/layout/StickyBottomBar";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "General Contractor in Los Angeles, CA | Red Stag Construction",
  description: "Licensed general contractor in Los Angeles since 2011. Custom homes, ADUs, kitchen & bathroom remodels, home additions, hardscape & fencing. Serving Beverly Hills, Bel Air, Malibu & all of LA.",
  openGraph: {
    type: 'website',
    siteName: 'Red Stag Construction',
    locale: 'en_US',
    url: 'https://redstagcc.com',
    title: 'General Contractor in Los Angeles CA',
    description:
      'Licensed general contractor in Los Angeles since 2011. Custom homes ADUs kitchen and bathroom remodels home additions hardscape and fencing across Beverly Hills Bel Air Malibu and Greater Los Angeles',
    images: [
      {
        url: 'https://redstagcc.com/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Red Stag Construction Los Angeles General Contractor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@redstagcc',
    creator: '@redstagcc',
  },
};

export const viewport: Viewport = {
  themeColor: "#0F0F0F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${playfair.variable} ${inter.variable}`}
    >
      <body className="font-sans text-text-body bg-warm-white min-h-full flex flex-col items-stretch justify-start pb-14 md:pb-0">
        <Analytics />
        <ExitIntentPopup />
        <StickyBottomBar />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
