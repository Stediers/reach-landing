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
    default: "ReachGig",
    template: "%s | ReachGig",
  },
  alternates: {
    canonical: "https://reachgig.com",
  },
  keywords:
    "freelance, finance, freelance tips, freelance finance, freelance taxes, freelance financial management, freelance financial tips, freelance financial advice",
  description:
    "Discover endless opportunities for freelance work and connect with top-tier talent at ReachGig. Explore our platform for seamless collaboration and unlock your potential today!",
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
