import type { Metadata } from "next";
import { Bebas_Neue, Montserrat, Geist } from "next/font/google";
import "./globals.css";
import { SiteHeaderAnimated } from "@/components/site-header-animated";
import { SiteFooter } from "@/components/site-footer";
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
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
