import { NavBar } from "@components/explore/Navbar";
import { Metadata } from "next";
import React from "react";
import Footer from "@components/footer/Footer";

type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    default: "ReachGig",
    template: "%s | ReachGig",
    absolute: "ReachGig",
  },
  description:
    "ReachGig is India's leading freelancer marketplace. Hire verified photographers, makeup artists, mehndi designers, DJs & more in your city. Book trusted professionals instantly with secure payments.",
  openGraph: {
    siteName: "ReachGig",
    locale: "en_IN",
    title: "ReachGig",
    description:
      "ReachGig is India's leading freelancer marketplace. Hire verified photographers, makeup artists, mehndi designers, DJs & more in your city. Book trusted professionals instantly with secure payments.",
    url: "https://www.reachgig.com",
    type: "website",
    images: [
      {
        url: "/images/landing-profiles/home.webp",
        width: 1200,
        height: 630,
        alt: "ReachGig - India's Leading Freelancer Marketplace",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReachGig - Hire Verified Freelancers & Artists in India",
    description:
      "ReachGig is India's leading freelancer marketplace. Hire verified photographers, makeup artists, mehndi designers, DJs & more in your city.",
    images: ["/images/landing-profiles/home.webp"],
    creator: "@ReachGig",
  },
  applicationName: "ReachGig",
  appleWebApp: {
    title: "ReachGig",
    statusBarStyle: "default",
    capable: true,
  },
  metadataBase: new URL("https://www.reachgig.com"),
};
//ola

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ReachGig",
  url: "https://www.reachgig.com",
  description:
    "India's leading freelancer marketplace. Hire verified photographers, makeup artists, mehndi designers, DJs & more.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.reachgig.com/vendors/{city}",
    },
    "query-input": "required name=city",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ReachGig",
  url: "https://www.reachgig.com",
  logo: "https://www.reachgig.com/icon-512x512.png",
  description:
    "ReachGig connects customers with verified freelancers and service providers across India. Book photographers, makeup artists, DJs, mehndi designers and more.",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  sameAs: [
    "https://facebook.com/reachgig",
    "https://twitter.com/reachgig",
    "https://instagram.com/reachgig",
  ],
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ReachGig",
  url: "https://www.reachgig.com",
  logo: "https://www.reachgig.com/icon-512x512.png",
  description:
    "India's leading freelancer marketplace. Hire verified photographers, makeup artists, mehndi designers, DJs and more in your city.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "13.0827",
    longitude: "80.2707",
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
};

export default function ConsoleLayout({ children }: RootLayoutProps) {
  return (
    <div className="w-full flex flex-col justify-start items-center relative !z-50 !hide-scrollbar">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <div className="w-full flex flex-col justify-start items-center space-y-5  sticky top-0 z-50">
        <NavBar showMobileNav={true} />
      </div>
      {children}
      <Footer />
    </div>
  );
}
