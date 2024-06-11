import React, { ReactNode } from "react";
import {
  ArrowDownCircle,
  CheckCheckIcon,
  HandCoinsIcon,
  Shield,
  ShieldPlus,
} from "lucide-react";
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
    <div className="relative flex flex-col items-center justify-center scroll-smooth lg:space-y-16 space-y-10 pb-20">
      <Hero />
      <Pricing />
      <HowItWorks />
      <WhatYouGet />
    </div>
  );
}

function NumberCircle({ number }: { number: number }) {
  return (
    <div className="w-12 h-12 lg:w-16 lg:h-16 border-success border-2 rounded-full flex items-center justify-center">
      <p className="text-success font-medium text-xl lg:text-2xl">{number}</p>
    </div>
  );
}

function Hero() {
  return (
    <div className="lg:min-h-[75vh] min-h-[60vh] bg-foreground w-full flex flex-col items-center justify-center">
      <div className="max-w-4xl text-center">
        <h1 className="lg:text-5xl text-3xl font-semibold text-white !leading-relaxed px-10">
          Say Goodbye to
          <br />
          <span className="text-error">hefty commisions</span>
          &nbsp; and hello to <br />
          <span className="text-success">fair pricing</span>.
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
    <div className="max-w-2xl lg:min-h-[40vh] min-h-[30vh] w-full flex flex-col items-center justify-center lg:space-y-7 space-y-7 px-10 rounded-lg lg:border-2 border-success">
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
          This advance is yours and we hold it until the appointment is
          completed.
        </p>
      </div>
    </div>
  );
}

function WhatYouGet() {
  return (
    <HeaderWrapper
      className="min-h-[30vh] w-full flex flex-col items-center justify-center lg:space-y-20 space-y-10 px-10"
      title="Benefits"
    >
      <div className="lg:grid grid-cols-3 lg:gap-x-10 gap-y-10 w-full lg:items-start lg:justify-items-center flex flex-col items-center justify-center space-y-10 lg:space-y-0">
        <FeatureCard
          icon={
            <CheckCheckIcon className="w-16 h-16 lg:w-28 lg:h-28 text-success" />
          }
          heading="Proof of appointment"
          description="Have a documented proof of your appointment with feedback. This can be used for future references, which can help you get more clients."
        />
        <FeatureCard
          icon={
            <ShieldPlus className="w-16 h-16 lg:w-28 lg:h-28 text-success" />
          }
          heading="Trust and safety"
          description="By holding the advance, we ensure that both the client and the service provider are protected and are committed to the success of the appointment."
        />
        <FeatureCard
          icon={<BsSafe className="w-16 h-16 lg:w-28 lg:h-28 text-success" />}
          heading="Reminders"
          description="We understand the value of your time. So go ahead and enjoy your life while we remind you of your upcoming appointments for both you and your clients."
        />
      </div>
    </HeaderWrapper>
  );
}

function HowItWorks() {
  return (
    <HeaderWrapper
      className="min-h-[30vh] w-full flex flex-col items-center justify-center lg:space-y-20 space-y-10 px-10"
      title="How it works"
    >
      <div className="lg:grid grid-cols-3 lg:gap-x-10 lg:gap-y-20 lg:items-start w-full lg:justify-items-center flex flex-col items-center justify-center space-y-10 lg:space-y-0">
        <FeatureCard
          icon={<NumberCircle number={1} />}
          heading="Get a Callback"
          description="Clients go through your profile and state their requirements through a callback request. it is your choice to accept or reject the request."
        />
        <FeatureCard
          icon={<NumberCircle number={2} />}
          heading="Schedule an appointment"
          description="If the request is accepted, you schedule an appointment on the platform. By scheduling an appointment, you agree to the terms and conditions of the platform."
        />
        <FeatureCard
          icon={<NumberCircle number={3} />}
          heading="Client pays advance"
          description="Client pays 20% of the total amount as an advance. This advance is held by ReachGig until the appointment is completed."
        />
        <FeatureCard
          icon={<NumberCircle number={4} />}
          heading="Complete the appointment"
          description="Enter the OTP provided by the client to complete the appointment. Once the appointment is completed, the advance is released to you within 48 hours."
        />
        <FeatureCard
          icon={<NumberCircle number={5} />}
          heading="All done!"
          description="You have successfully completed the appointment and the client is satisfied. You can now rate the client and the client can rate you."
        />
      </div>
    </HeaderWrapper>
  );
}
