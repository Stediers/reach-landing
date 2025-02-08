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
    "Discover endless opportunities for freelance work and connect with top-tier talent at ReachGig. Explore our platform for seamless collaboration and unlock your potential today!",
  openGraph: {
    siteName: "ReachGig",
    locale: "en_IN",
    title: "ReachGig",
    description:
      "Discover endless opportunities for freelance work and connect with top-tier talent at ReachGig. Explore our platform for seamless collaboration and unlock your potential today!",
    url: "https://reachgig.com",
    type: "website",
    images: [
      {
        url: "/public/512.png",
        width: 800,
        height: 600,
        alt: "ReachGig",
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
  applicationName: "ReachGig",
  appleWebApp: {
    title: "ReachGig",
    statusBarStyle: "default",
    capable: true,
  },
  metadataBase: new URL("https://reachgig.com"),
};
//ola

export default function ConsoleLayout({ children }: RootLayoutProps) {
  return (
    <div className="w-full flex flex-col justify-start items-center relative !z-50 !hide-scrollbar">
      <div className="w-full flex flex-col justify-start items-center space-y-5  sticky top-0 z-50">
        <NavBar showMobileNav={true} />
      </div>
      {children}
      <Footer />
    </div>
  );
}
