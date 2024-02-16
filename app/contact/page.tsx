import React from "react";
import Contact from "./contact-us";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Contact Us",
    template: "%s | Contact Us",
  },
  description:
    "ReachGig is the best platform for booking services from freelancers. Get in touch with us today!",
  openGraph: {
    title: "Contact Us",
    description:
      "ReachGig is the best platform for booking services from freelancers. Get in touch with us today!",
    url: "https://reachgig.com/contact",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "Contact Us",
      },
    ],
    locale: "en_US",
  },
};

export default function Page() {
  return <Contact />;
}
