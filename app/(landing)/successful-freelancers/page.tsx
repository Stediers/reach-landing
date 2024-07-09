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
import { ProfileCard } from "@components/ProfileCard";

export const metadata: Metadata = {
  title: "Successful Freelancers",
  description:
    "Have a look at the profiles of our freelancers who have onboarded with us and have successfully completed appointments with clients.",
  openGraph: {
    title: "Successful Freelancers",
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
          link="https://reachgig.com/partner/2c3dbba5-6eb1-4954-9d1d-65a6b2a0b8de?backLink=%2Fservice%2F56874a0c-5c21-40a7-9591-47dc8d4cbd28"
          name="Rithanya Makeover"
          profession="Makeup Artist"
          key={1}
        />
        <ProfileCard
          description="I am the winner of the Mr. World competition and have been a professional Fitness Trainer for over a decade. I have trained over a 100 champions who have gone on to win titles on various stages."
          images={[
            "https://user4762.s3.ap-south-1.amazonaws.com/8A6B802E-B52C-405E-A939-E08D671F2F82.jpeg",
          ]}
          link="https://reachgig.com/service/b2c066bd-82f4-4225-b260-ef6f4cfcad47"
          name="Mohan Subramaniam"
          profession="Mr. World"
          key={1}
        />
      </div>
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
