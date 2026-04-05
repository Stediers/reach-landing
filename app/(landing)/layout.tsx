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
    url: "https://reachgig.com",
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
  alternates: {
    canonical: "https://reachgig.com",
  },
  applicationName: "ReachGig",
  appleWebApp: {
    title: "ReachGig",
    statusBarStyle: "default",
    capable: true,
  },
  metadataBase: new URL("https://reachgig.com"),
};
//ola

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ReachGig",
  url: "https://reachgig.com",
  description:
    "India's leading freelancer marketplace. Hire verified photographers, makeup artists, mehndi designers, DJs & more.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://reachgig.com/vendors/{city}",
    },
    "query-input": "required name=city",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ReachGig",
  url: "https://reachgig.com",
  logo: "https://reachgig.com/images/logo.webp",
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
      <div className="w-full flex flex-col justify-start items-center space-y-5  sticky top-0 z-50">
        <NavBar showMobileNav={true} />
      </div>
      {children}
      <Footer />
    </div>
  );
}
