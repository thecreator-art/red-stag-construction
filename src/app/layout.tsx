import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/layout/Analytics";
import { StickyMobileHeader } from "@/components/layout/StickyMobileHeader";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";

export const metadata: Metadata = {
  title: "General Contractor in Los Angeles, CA | Red Stag Construction",
  description: "Licensed general contractor in Los Angeles since 2011. Custom homes, ADUs, kitchen & bathroom remodels, home additions, hardscape & fencing. Serving Beverly Hills, Bel Air, Malibu & all of LA.",
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
      className="h-full antialiased"
    >
      <body className="font-sans text-text-body bg-warm-white min-h-full flex flex-col items-stretch justify-start pt-16 md:pt-0">
        <Analytics />
        <ExitIntentPopup />
        <StickyMobileHeader />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
