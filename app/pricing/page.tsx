import React from "react";
import Pricing from "./pricing";
import { Metadata } from "next";
import { Button } from "@components/ui/button";
import { BiRupee } from "react-icons/bi";
import ImageComponent from "@components/ImageComponent";

export const metadata: Metadata = {
  title: {
    default: "Pricing",
    template: "%s | ReachGig",
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

function Hero() {
  return (
    <div className="bg-foreground w-full">
      <div className="px-10 py-16 mx-auto lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
          <div className="flex flex-col space-y-5 items-center mb-16 text-center sm:mb-0">
            <ImageComponent
              src="/images/pricing.svg"
              alt="Pricing"
              className="w-[15rem] h-[15rem] object-cover"
              border={false}
            />
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h2 className="max-w-lg mb-6  text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
                  <span className="relative">Pricing</span>
                </span>{" "}
              </h2>
              <p className="text-base text-indigo-100 md:text-lg !leading-10">
                We are a business that is committed to providing the best
                services at the best prices. Scroll down to see our pricing
                plans.
              </p>
            </div>
            <div className="max-w-xl sm:mx-auto sm:text-center lg:max-w-2xl">
              <Button variant="info" asChild>
                Join Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="relative flex flex-col items-center justify-center scroll-smooth lg:space-y-20 space-y-10 pb-20">
      <Hero />
      <Pricing />
    </div>
  );
}
