import { Poppins } from "next/font/google";
import { cn } from "@lib/utils";
import "@styles/globals.css";
import { Metadata } from "next";
import { GoogleAnalyticsTracking } from "@scripts/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";
import FacebookPixel from "@scripts/FacebookPixel";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";

// const fontSans = Poppins({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   display: "swap",
// });

const Gilroy = localFont({
  src: [
    {
      path: "../assets/fonts/gilroy/Gilroy-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/gilroy/Gilroy-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/gilroy/Gilroy-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/gilroy/Gilroy-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/gilroy/Gilroy-Light.ttf",
      weight: "300",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-gilroy",
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL("https://reachgig.com"),
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
        <head />
        <GoogleAnalyticsTracking />
        <FacebookPixel />
        <body
          className={`${cn(
            Gilroy.className
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
