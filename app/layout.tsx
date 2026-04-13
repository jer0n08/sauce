import type { Metadata } from "next";
import { Bebas_Neue, Montserrat, Geist } from "next/font/google";
import "./globals.css";
import { SiteHeaderAnimated } from "@/components/site-header-animated";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const bebas = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Berliner Kebab Paris",
  description:
    "Site vitrine officiel de Berliner Kebab a Paris: menu, infos pratiques et FAQ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn("font-sans", geist.variable)}>
      <body suppressHydrationWarning className={`${bebas.variable} ${montserrat.variable}`}>
        <SiteHeaderAnimated />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <main>{children}</main>
            <SiteFooter />
          </div>
        </div>
        <SmoothScroll />
      </body>
    </html>
  );
}
