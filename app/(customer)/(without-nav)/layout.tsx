import { Poppins } from "next/font/google";
import { cn } from "@lib/utils";
import "@styles/globals.css";
import { Metadata } from "next";
import { NavBar } from "@components/explore/Navbar";

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
    locale: "en_IN",
  },
  metadataBase: new URL("https://reachgig.com"),
  applicationName: "ReachGig",
  robots: "noindex, nofollow",
};

export default function ConsoleLayout({ children }: RootLayoutProps) {
  return (
    <div className="w-full flex flex-col justify-start items-center relative !z-50 !hide-scrollbar">
      <div className="w-full flex flex-col justify-start items-center space-y-5  sticky top-0 z-50">
        <NavBar showMobileNav={false} />
      </div>
      <div className="max-w-7xl w-full flex flex-1 flex-col justify-start items-center space-y-5 lg:px-10">
        {children}
      </div>
    </div>
  );
}
