import { Poppins } from "next/font/google";
import { cn } from "@lib/utils";
import "@styles/globals.css";
import { Metadata } from "next";
import { GoogleAnalyticsTracking } from "@scripts/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@components/Navbar";
import Footer from "@components/footer/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import FacebookPixel from "@scripts/FacebookPixel";

const fontSans = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    default: "ReachGig",
    template: "%s | ReachGig",
  },
  alternates: {
    canonical: "https://reachgig.com",
  },
  description: "ReachGig",
  openGraph: {
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
    locale: "en_US",
  },
  metadataBase: new URL("https://reachgig.com"),
  applicationName: "ReachGig",
  robots: "index, follow",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <GoogleAnalyticsTracking />
        <FacebookPixel />
        <body
          className={`${cn(
            fontSans.className
          )} text-text min-h-screen flex flex-col bg-white`}
        >
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </>
  );
}
