import { Poppins } from "next/font/google";
import { cn } from "@lib/utils";
import "@styles/globals.css";
import { Metadata } from "next";
import { GoogleAnalyticsTracking } from "@scripts/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";
import FacebookPixel from "@scripts/FacebookPixel";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  description:
    "The best platform to find and book the perfect freelancers and artists",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
    startupImage: "/public/512.png",
    title: "ReachGig",
  },
  manifest: "/manifest.json",
  applicationName: "ReachGig",
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
          )} text-text min-h-[100svh] w-full flex !bg-background`}
        >
          {children}

          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </>
  );
}
