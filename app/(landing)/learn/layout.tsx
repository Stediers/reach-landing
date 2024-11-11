import { Poppins } from "next/font/google";
import { cn } from "@lib/utils";
import "@styles/globals.css";
import { Metadata } from "next";

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
    default: "ReachGig Blog",
    template: "%s | ReachGig Blog",
  },
  alternates: {
    canonical: "https://reachgig.com/learn",
  },
  keywords:
    "freelance blog, gig economy tips, freelance advice, freelance learning, freelance education, freelance resources, gig worker tips, freelance career guidance",
  description:
    "Explore expert insights, practical tips, and comprehensive guides for freelancers and gig workers. Learn how to thrive in the gig economy with ReachGig's curated content.",
  openGraph: {
    title: "ReachGig Blog",
    description:
      "Explore expert insights, practical tips, and comprehensive guides for freelancers and gig workers. Learn how to thrive in the gig economy with ReachGig's curated content.",
    url: "https://reachgig.com/learn",
    type: "website",
    images: [
      {
        url: "/public/512.png",
        width: 800,
        height: 600,
        alt: "ReachGig Blog",
      },
    ],
    locale: "en_US",
  },
  metadataBase: new URL("https://reachgig.com"),
  applicationName: "ReachGig Blog",
  robots: "index, follow",
};
// ... existing code ...

export default function BlogLayout({ children }: RootLayoutProps) {
  return (
    <div
      className={`${cn(
        fontSans.className
      )} text-text min-h-screen flex !flex-col w-full bg-white items-center justify-center`}
    >
      {children}
    </div>
  );
}
