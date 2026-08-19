import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";
import { Fraunces, Poppins } from "next/font/google";
import "./globals.css";

// Titulares y elementos de marca. Fraunces va de 100 a 900; pedimos solo las dos
// instancias que usamos —600 para titulares y 500 para los más finos— en lugar de
// la familia entera. El import map de next/font valida contra pesos discretos, así
// que aquí no sirve la sintaxis de rango ("500 600").
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

// Cuerpo, navegación, botones y formularios. Poppins NO es variable en Google
// Fonts, así que cada peso es un archivo aparte: cargamos únicamente los cuatro
// que el markup usa hoy (400/500/600/700) y ninguno más — sin cursivas.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.seo.siteUrl,
    siteName: siteConfig.businessName,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
