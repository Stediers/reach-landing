import React from "react";
import Pricing from "./pricing";
import { Metadata } from "next";

export const metaData: Metadata = {
  title: {
    default: "Pricing",
    template: "%s | Pricing",
  },
  description:
    "ReachGig offers the best prices for the best services. Explore our platform today!",
  openGraph: {
    title: "Pricing",
    description:
      "ReachGig offers the best prices for the best services. Explore our platform today!",
    url: "https://reachgig.com/pricing",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "Pricing",
      },
    ],
    locale: "en_US",
  },
};

export default function Page() {
  return <Pricing />;
}
