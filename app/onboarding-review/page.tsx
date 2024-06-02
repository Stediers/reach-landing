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
import Hero from "@components/Hero";
import ReachSVG from "@components/svg/ReachSVG";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import SideComponent from "@components/SideComponent";
import Setting from "@components/Setting";
import Card from "@components/Card";
import { AiOutlineAccountBook } from "react-icons/ai";
import Link from "next/link";
import ImageComponent from "@components/ImageComponent";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

export const metadata: Metadata = {
  title: "Become a Partner",
  description:
    "Standout and get noticed by clients. ReachGig offers you the ability to showcase your skills and get helps you perform better.",
  openGraph: {
    title: "Become a Partner",
    description:
      "Standout and get noticed by clients. ReachGig offers you the ability to showcase your skills and get helps you perform better.",
    url: "https://reachgig.com/onboarding-review",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "Become a Partner",
      },
    ],
    locale: "en_US",
  },
};

export default function Page() {
  return (
    <div className="relative flex flex-col items-center justify-center scroll-smooth lg:space-y-16 space-y-10 pb-20">
      <Index />
    </div>
  );
}

function Index() {
  const partnerLink = process.env.NEXT_PUBLIC_PARTNER_LINK + "/user/sign-in";
  return (
    <section
      className="flex flex-col items-center justify-center w-full lg:min-h-[40vh] xl:min-h-[45vh] relative max-w-7xl"
      id="Index"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:gap-20 gap-5 xl:items-center w-full px-5 py-5 lg:py-10 xl:px-16">
        <ImageComponent
          src="/images/discover.svg"
          alt="Onboarding Review"
          className="lg:hidden w-full h-full rounded-lg overflow-hidden min-h-[200px] max-h-[400px]"
        />
        <div className="flex flex-col items-start justify-center space-y-5 lg:space-y-10 relative">
          <div className="flex flex-col justify-center space-y-2 lg:space-y-3">
            <h1 className="lg:text-3xl text-2xl font-semibold !leading-relaxed">
              Ready to&nbsp;
              <span className="text-primary">Stand out</span>&nbsp; to your
              clients?
            </h1>
            <p className="lg:text-2xl text-xl font-medium">
              Here is how can do it.
            </p>
          </div>
          <div className="flex flex-col items-start justify-center space-y-5 lg:space-y-10">
            <div className="flex flex-col items-start justify-center space-y-5 lg:space-y-7">
              <Separator orientation="horizontal" />
              <StepDetails
                number={1}
                title="Create your profile"
                description="Let clients know who you are, what you do and how you can help them."
              />
              <Separator orientation="horizontal" />
              <StepDetails
                number={2}
                title="Add your first service"
                description="You can either paste your service template and let AI do the rest or create your service from scratch."
              />
              <Separator orientation="horizontal" />
              <StepDetails
                number={3}
                title="Share your profile link"
                description="Share your unique profile link in all your social media profiles and start getting noticed."
              />
              <Separator orientation="horizontal" />
            </div>
            <Link href={partnerLink}>
              <Button
                variant="success"
                className="lg:max-w-[200px] sticky bottom-5"
              >
                Let&apos;s get started
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-col lg:items-end lg:justify-start pt-20 lg:space-y-5 h-full">
          <ImageComponent
            src="/images/discover.svg"
            alt="Onboarding Review"
            className="lg:w-full lg:h-full lg:max-w-[500px] lg:rounded-xl lg:overflow-hidden lg:min-h-[300px] lg:max-h-[400px]"
          />
        </div>
      </div>
    </section>
  );
}

function StepDetails({
  title,
  description,
  number,
}: {
  title: string;
  description: string;
  number: number;
}) {
  return (
    <div className="flex flex-row items-start justify-start space-x-5">
      <NumberCircle number={number} />
      <div className="flex flex-col items-start justify-center space-y-2 lg:space-y-3">
        <h2 className="lg:text-xl text-lg font-medium">{title}</h2>
        <p className="lg:text-lg lg:!leading-relaxed text-base">
          {description}
        </p>
      </div>
    </div>
  );
}

function NumberCircle({ number }: { number: number }) {
  return (
    <div className="w-8 h-8 shrink-0 lg:w-8 lg:h-8 border-success border-2 rounded-full flex items-center justify-center">
      <p className="text-success font-medium text-base lg:text-base">
        {number}
      </p>
    </div>
  );
}
