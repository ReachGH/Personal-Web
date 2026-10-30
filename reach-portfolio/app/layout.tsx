import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { profile } from "@/data/profile";
import { isPublished, siteUrl } from "@/lib/site";
import "./globals.css";

const sans = localFont({
  src: "../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
  variable: "--font-sans",
  display: "swap",
});
const display = localFont({
  src: "../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Reach — Software Developer", template: "%s | Reach" },
  description: profile.description,
  applicationName: "Reach Portfolio",
  authors: [{ name: profile.name, url: profile.github }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Reach — A little curiosity. A lot of building.",
    description: profile.description,
    type: "website",
    locale: "en_AU",
    siteName: "Reach — Software Developer",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Reach — Software Developer. A little curiosity. A lot of building.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reach — Software Developer",
    description: profile.description,
    images: ["/opengraph-image"],
  },
  robots: { index: isPublished, follow: isPublished },
  icons: { icon: "/icon.svg", apple: "/apple-icon" },
};

export const viewport: Viewport = {
  themeColor: "#f8f7f3",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${sans.variable} ${display.variable}`}>
      <body id="top">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
