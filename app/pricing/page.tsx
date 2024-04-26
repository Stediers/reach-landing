import React, { ReactNode } from "react";
import { ArrowDownCircle, CheckCheckIcon, Shield } from "lucide-react";
import { Metadata } from "next";
import HeaderWrapper from "@wrapper/HeaderWrapper";
import FeatureCard from "@components/FeatureCard";
import { BsSafe } from "react-icons/bs";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "ReachGig offers the best prices for the best services. With a 5% booking advance, we ensure that both the client and the service provider are protected.",
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
  return (
    <div className="relative flex flex-col items-center justify-center scroll-smooth lg:space-y-20 space-y-10 pb-20">
      <Hero />
      <Pricing />
      <WhatYouGet />
    </div>
  );
}

function Hero() {
  return (
    <div className="lg:min-h-[75vh] min-h-[60vh] bg-foreground w-full flex flex-col items-center justify-center">
      <div className="max-w-4xl text-center">
        <h1 className="lg:text-5xl text-3xl font-semibold text-white !leading-relaxed px-10">
          Say Goodbye to <span className="text-error">hefty advances</span>
          &nbsp; and hello to <span className="text-success">fair pricing</span>
          .
        </h1>
        <div className="flex flex-col space-y-5 items-center mt-10">
          <ArrowDownCircle className="w-12 h-12 text-white mx-auto" />
          <p className="text-white text-base">See our pricing plan below.</p>
        </div>
      </div>
    </div>
  );
}

function Pricing() {
  return (
    <div className="max-w-4xl lg:min-h-[40vh] min-h-[30vh] w-full flex flex-col items-center justify-center lg:space-y-7 space-y-7 px-10">
      <p className="text-center text-base tracking-wider font-medium text-success">
        PAID BY THE CLIENT
      </p>
      <div className="flex flex-col items-center space-y-7">
        <div className="flex flex-col items-center space-y-5">
          <h2 className="lg:text-5xl text-3xl text-center font-semibold">
            &nbsp;
            <span className="">20%</span> Advance
          </h2>
        </div>
        <p className="text-lg text-center max-w-md lg:!leading-10 leading-8">
          This is dont to make sure that partners on our platform can reserve a
          slot for you. This is refundable if the job is not done.
        </p>
      </div>
    </div>
  );
}

function WhatYouGet() {
  return (
    <HeaderWrapper
      className="min-h-[30vh] w-full flex flex-col items-center justify-center lg:space-y-20 space-y-10 px-10"
      title="What you get"
    >
      <div className="lg:grid grid-cols-3 lg:gap-x-10 lg:gap-y-10 w-full lg:justify-items-center flex flex-col items-center justify-center space-y-10 lg:space-y-0">
        <FeatureCard
          icon={
            <CheckCheckIcon className="w-12 h-12 lg:w-32 lg:h-32 text-success" />
          }
          heading="Proof of appointment"
          description="Have a documented proof of your appointment with an invoice."
        />
        <FeatureCard
          icon={<Shield className="w-12 h-12 lg:w-32 lg:h-32 text-success" />}
          heading="Secure payment"
          description="Payment is secure and is only released after the job is done."
        />
        <FeatureCard
          icon={<BsSafe className="w-12 h-12 lg:w-32 lg:h-32 text-success" />}
          heading="Refundable advances"
          description="If anything goes wrong, your advance is refundable."
        />
      </div>
    </HeaderWrapper>
  );
}
