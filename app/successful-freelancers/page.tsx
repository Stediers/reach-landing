import React, { ReactNode } from "react";
import {
  ArrowDownCircle,
  CheckCheckIcon,
  ShieldPlus,
  ThumbsUp,
} from "lucide-react";
import { Metadata } from "next";
import HeaderWrapper from "@wrapper/HeaderWrapper";
import FeatureCard from "@components/FeatureCard";
import { BsSafe } from "react-icons/bs";
import ImageComponent from "@components/ImageComponent";
import { Button } from "@components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Successful Freelancers",
  description:
    "Have a look at the profiles of our freelancers who have onboarded with us and have successfully completed appointments with clients.",
  openGraph: {
    title: "Pricing",
    description:
      "Have a look at the profiles of our freelancers who have onboarded with us and have successfully completed appointments with clients.",
    url: "https://reachgig.com/successful-freelancers",
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
      <div className="w-full flex flex-col items-center justify-center space-y-20 lg:px-10 px-5">
        <ProfileCard
          description="I am a professional makeup artist with 3 years of experience. I have worked with clients from all over Tamil Nadu and have delivered high-quality makeup that has helped my clients look their best."
          images={[
            "https://user4762.s3.ap-south-1.amazonaws.com/gig/6382422787/0991A4DC-5FE3-4368-A080-463735EE8B21.jpeg.jpeg",
          ]}
          link="https://customer.reachgig.com/partner/2c3dbba5-6eb1-4954-9d1d-65a6b2a0b8de?backLink=%2Fservice%2F56874a0c-5c21-40a7-9591-47dc8d4cbd28"
          name="Rithanya Makeover"
          profession="Makeup Artist"
          key={1}
        />
        <ProfileCard
          description="I am the winner of the Mr. World competition and have been a professional Fitness Trainer for over a decade. I have trained over a 100 champions who have gone on to win titles on various stages."
          images={[
            "https://user4762.s3.ap-south-1.amazonaws.com/8A6B802E-B52C-405E-A939-E08D671F2F82.jpeg",
          ]}
          link="https://customer.reachgig.com/service/b2c066bd-82f4-4225-b260-ef6f4cfcad47"
          name="Mohan Subramaniam"
          profession="Mr. World"
          key={1}
        />
        {/* <ProfileCard
          description="I am a professional web developer with 5 years of experience. I have worked with clients from all over the world and have delivered high-quality websites that have helped my clients grow their business."
          images={["/public/512.png"]}
          link="/"
          name="Ashrin Fathima"
          profession="Model"
          key={1}
        />
        <ProfileCard
          description="I am a professional web developer with 5 years of experience. I have worked with clients from all over the world and have delivered high-quality websites that have helped my clients grow their business."
          images={["/public/512.png"]}
          link="/"
          name="John Doe"
          profession="Web Developer"
          key={1}
        /> */}
      </div>
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
    <div className="lg:min-h-[75vh] min-h-[60vh] bg-foreground w-full flex flex-col items-center justify-center px-10">
      <div className="max-w-4xl text-center flex flex-col items-center justify-center space-y-10">
        <ThumbsUp className="w-16 h-16 lg:w-28 lg:h-28 text-success" />
        <h1 className="lg:text-5xl text-3xl font-semibold text-white !leading-relaxed">
          Our Proud Freelancers
        </h1>
        <p className="text-white text-lg max-w-md lg:!leading-10 leading-8">
          Have a look at the profiles of our freelancers who have onboarded with
          us and have successfully completed appointments with clients.
        </p>
      </div>
    </div>
  );
}

function ProfileCard({
  images,
  name,
  profession,
  description,
  link,
}: {
  images: string[];
  name: string;
  profession: string;
  description: string;
  link: string;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:px-10 px-5 max-w-7xl items-start lg:justify-items-start justify-items-center gap-y-5 lg:gap-y-0">
      <ImageComponent
        src={images[0]}
        alt={`Service Image`}
        className="w-60 h-60 lg:w-[25rem] lg:h-[25rem] object-cover rounded-lg"
        popup={false}
      />
      <div className="flex flex-col lg:items-start items-center justify-center space-y-5 lg:py-10">
        <div className="flex flex-col items-center lg:items-start justify-center space-y-2">
          <p className="text-base font-medium text-primary">{profession}</p>
          <h2 className="lg:text-5xl text-3xl text-center font-semibold">
            {name}
          </h2>
        </div>
        <p className="text-lg text-center lg:text-left lg:!leading-10 leading-8">
          {description}
        </p>
        <Button variant="default" asChild>
          <Link href={link} target="_blank">
            View Profile
          </Link>
        </Button>
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
      <div className="lg:grid grid-cols-3 lg:gap-x-10 lg:gap-y-10 w-full lg:items-start lg:justify-items-center flex flex-col items-center justify-center space-y-10 lg:space-y-0">
        <FeatureCard
          icon={<CheckCheckIcon className="w-12 h-12 lg:w-28 lg:h-28" />}
          heading="Proof of appointment"
          description="Have a documented proof of your appointment with feedback. This can be used for future references, which can help you get more clients."
        />
        <FeatureCard
          icon={<ShieldPlus className="w-12 h-12 lg:w-28 lg:h-28" />}
          heading="Trust and safety"
          description="By holding the advance, we ensure that both the client and the service provider are protected and are committed to the success of the appointment."
        />
        <FeatureCard
          icon={<BsSafe className="w-12 h-12 lg:w-28 lg:h-28" />}
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
