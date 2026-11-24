import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Preloader from "../components/Preloader";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { services } from "../components/serviceData";
import { site } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  icons: {
    icon: "/loom-and-grain-icon.svg",
    shortcut: "/loom-and-grain-icon.svg",
    apple: "/loom-and-grain-icon.svg",
  },
  keywords: [
    "Loom and Grain Furnishing LLC",
    "custom curtains Dubai",
    "office blinds Dubai",
    "sofa upholstery Dubai",
    "custom furniture Dubai",
    "wallpapers and flooring Dubai",
    "carpet installation Dubai",
    "frosted glass film Dubai",
    "interior furnishings UAE",
    "Al Quoz Dubai",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: site.url },
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.name,
    url: site.url,
    locale: "en_AE",
    images: [{ url: site.image, width: 2172, height: 724, alt: `${site.name} logo` }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.image],
  },
};

const businessId = `${site.url}/#business`;
const websiteId = `${site.url}/#website`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": businessId,
      "name": site.name,
      "url": site.url,
      "description": site.description,
      "image": `${site.url}${site.image}`,
      "logo": `${site.url}${site.image}`,
      "telephone": site.phone,
      "email": site.email,
      "address": {
        "@type": "PostalAddress",
        ...site.address,
      },
      "areaServed": site.areasServed,
      "hasMap": site.mapUrl,
      "sameAs": [site.instagramUrl],
      "knowsAbout": services.map(({ title }) => title),
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      "url": site.url,
      "name": site.name,
      "inLanguage": "en-AE",
      "publisher": { "@id": businessId },
    },
    {
      "@type": "WebPage",
      "@id": `${site.url}/#webpage`,
      "url": site.url,
      "name": site.title,
      "description": site.description,
      "inLanguage": "en-AE",
      "isPartOf": { "@id": websiteId },
      "about": { "@id": businessId },
      "primaryImageOfPage": `${site.url}${site.image}`,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-AE"
      className="h-full antialiased"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Preloader />
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <ScrollToTop />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
