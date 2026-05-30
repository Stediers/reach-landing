"use client";
import React, { useState } from "react";
import TabSwitcher from "./Tabs";

type RootLayoutProps = {
  children: React.ReactNode;
};

// export const metadata: Metadata = {
//   title: {
//     default: "ReachGig",
//     template: "%s | ReachGig",
//     absolute: "ReachGig",
//   },
//   description:
//     "Discover endless opportunities for freelance work and connect with top-tier talent at ReachGig. Explore our platform for seamless collaboration and unlock your potential today!",
//   openGraph: {
//     title: "ReachGig",
//     description:
//       "Discover endless opportunities for freelance work and connect with top-tier talent at ReachGig. Explore our platform for seamless collaboration and unlock your potential today!",
//     url: "https://www.reachgig.com",
//     type: "website",
//     images: [
//       {
//         url: "/public/512.png",
//         width: 800,
//         height: 600,
//         alt: "ReachGig",
//       },
//     ],
//     locale: "en_IN",
//   },
//   metadataBase: new URL("https://www.reachgig.com"),
//   applicationName: "ReachGig",
//   robots: "index, follow",
// };

export default function ConsoleLayout({ children }: RootLayoutProps) {
  return (
    <div className="w-full flex flex-col justify-start items-center relative !hide-scrollbar">
      <TabSwitcher />
      {children}
    </div>
  );
}
