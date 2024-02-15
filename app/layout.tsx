import { Poppins } from "next/font/google";
import { cn } from "@lib/utils";
import "@styles/globals.css";
import { Metadata } from "next";
import { GoogleAnalyticsTracking } from "@scripts/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@components/Navbar";
import Footer from "@components/footer/Footer";

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
  description: "ReachGig",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
    startupImage: "/public/512.png",
    title: "ReachGig",
  },
  metadataBase: new URL("https://reachgig.com"),
  applicationName: "ReachGig",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      nosnippet: false,
      noarchive: false,
      noimageindex: false,
      notranslate: false,
    },
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <GoogleAnalyticsTracking />
        <body
          className={`${cn(
            fontSans.className
          )} text-text min-h-screen flex flex-col bg-white`}
        >
          <Navbar />
          {children}
          <Footer />
          <Analytics />
        </body>
      </html>
    </>
  );
}
