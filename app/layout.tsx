import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Mono, Cormorant_Garamond, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { SoulProvider } from "./context/SoulContext";
import { SITE_CONTENT } from "./data/content";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_CONTENT.meta.title,
  description: SITE_CONTENT.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${ibmPlexMono.variable} ${cormorant.variable} ${jetbrains.variable} ${inter.variable} h-full antialiased bg-[#1d1d1d] text-[#f5f0e8]`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://use.typekit.net/zdo5azo.css" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col selection:bg-white/20 selection:text-white"
      >
        <SoulProvider>{children}</SoulProvider>
      </body>
    </html>
  );
}
