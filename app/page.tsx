import Logo from "@components/Logo";
import { ReactNode } from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { FcConferenceCall, FcBullish } from "react-icons/fc";
import { CiTrophy } from "react-icons/ci";
import "swiper/css";
import "swiper/css/pagination";
import { MdOutlinePriceCheck, MdPersonSearch } from "react-icons/md";
import { AiFillCloseCircle, AiFillStar } from "react-icons/ai";
import ImageComponent from "@components/ImageComponent";
import { GiJourney } from "react-icons/gi";
import { FaHandshake } from "react-icons/fa";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { BsShield, BsShieldCheck } from "react-icons/bs";
import ReachSVG from "@components/svg/ReachSVG";
import HeaderWrapper from "@wrapper/HeaderWrapper";
import FeatureCard from "@components/FeatureCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import ComponentWrapper from "@wrapper/ComponentWrapper";
import SideComponent from "@components/SideComponent";

const iconStyle = "lg:w-24 lg:h-24 w-20 h-20";

export const metadata: Metadata = {
  title: {
    default: "ReachGig",
    template: "%s",
  },
  description:
    "Find the best services and partners for your needs. Empowering the Gig Economy.",
  openGraph: {
    title: "ReachGig",
    description:
      "Find the best services and partners for your needs. Empowering the Gig Economy.",
    url: "https://reachgig.com",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "ReachGig",
      },
    ],
    locale: "en_US",
  },
};

export default function Page() {
  return (
    <div className="relative flex flex-col items-center justify-center scroll-smooth">
      <Index />
      <What />
      <ByeByeScammers />
      <BecomeAPartner />
      {/* <CustomerStories />
      <HappyPartners /> */}
      {/* <WhatWeBelieve cookieExists={cookieExists} /> */}
      {/* <div className="w-full flex flex-col items-center justify-center space-y-5">
        <LineHeader title="More from Reach" />
        <YoutubeEmbed />
      </div> */}
    </div>
  );
}

function ByeByeScammers() {
  return (
    <div
      className="flex flex-col items-center justify-center w-full lg:min-h-[70vh] min-h-[50vh] bg-success px-10 lg:px-0"
      id="Index"
    >
      <div className="flex flex-col items-center justify-start w-full max-w-7xl space-y-5">
        <BsShieldCheck className="lg:w-24 lg:h-24 w-20 h-20 text-white" />
        <h3 className="lg:text-5xl text-3xl font-bold text-white">
          Bye Bye Scammers
        </h3>
        <p className="lg:text-lg text-md text-center max-w-xl text-white">
          We have a strict verification process to ensure that only genuine
          service providers are listed on ReachGig.
        </p>
        <div className="flex flex-col items-center justify-center space-y-5 lg:space-y-0 lg:flex-row lg:space-x-5 pt-5">
          <Button asChild variant="outline">
            <Link href="/verification">How does it work?</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function BecomeAPartner() {
  return (
    <HeaderWrapper
      title="Become a Partner"
      className="items-center justify-center w-full flex flex-col space-y-16"
      id="who-we-are-and-what-we-do"
    >
      <Button asChild variant="success" className="w-fit">
        <Link href="/user/sign-up" className="w-fit">
          Get Started
        </Link>
      </Button>
      <div className="grid gap-10 px-10 lg:grid-cols-2 lg:px-20 justify-items-center max-w-[100rem]">
        <SideComponent
          title="Less Ghosting"
          description="Let your custome know what, how and when you offer your services before they reach out to you. This will help you get more genuine leads."
          imageUrl="/images/ghost.svg"
        />
        <SideComponent
          title="Avoid Negotiations"
          description="Have complete control over your pricing and services. No more negotiations and haggling."
          imageUrl="/images/negotiate.svg"
        />
        <SideComponent
          title="Be Discovered"
          description="We enable you and your services to be found on Google and other search engines. This enhances your online presence."
          imageUrl="/images/discover.svg"
        />
        <SideComponent
          title="Get Paid on Time"
          description="Get paid for your services. No more chasing payments. We take care of it for you."
          imageUrl="/images/paid.svg"
        />
        <SideComponent
          title="Customer Reviews"
          description="Get genuine reviews from your customers, helping you build your reputation and credibility."
          imageUrl="/images/review.svg"
        />
        {/* <SideComponent
          title="Join the Community"
          description="Leverage our social media to connect with other experts in your field and grow your business."
          imageUrl="/images/community.svg"
        /> */}
      </div>
      <Button asChild variant="success" className="w-fit">
        <Link href="/user/sign-up" className="w-fit">
          Get Started
        </Link>
      </Button>
    </HeaderWrapper>
  );
}

function What() {
  return (
    <HeaderWrapper
      title="What we Do"
      className="items-center justify-center w-full flex flex-col space-y-16"
      id="who-we-are-and-what-we-do"
    >
      <div className="lg:grid grid-cols-3 lg:gap-x-10 lg:gap-y-10 w-full lg:justify-items-center flex flex-col items-center justify-center space-y-10 lg:space-y-0">
        <FeatureCard
          icon={<CiTrophy className={`${iconStyle} text-yellow-500`} />}
          heading="Talent is everywhere"
          description="Lack of opportunities for the youth is a major concern. Lets change that!"
        />
        <FeatureCard
          icon={<FaHandshake className={`${iconStyle} text-green-500`} />}
          heading="Communication"
          description="Lets bridge the gap between the service providers and the customers."
        />
        <FeatureCard
          icon={
            <MdOutlinePriceCheck className={`${iconStyle} text-blue-500`} />
          }
          heading="Cost Effective"
          description="Low cost of entry for the service providers and low cost of services for the customers."
        />
        <FeatureCard
          icon={<FcConferenceCall className={iconStyle} />}
          heading="Find the right partner"
          description="Find the right partner for your needs. Makeup, Photography, Catering, and many more."
        />
        <FeatureCard
          icon={<HiChatBubbleLeftRight className={iconStyle} />}
          heading="Communicate"
          description="Communicate what you offer and showcase your expertise."
        />
        <FeatureCard
          icon={<FcBullish className={iconStyle} />}
          heading="Get the job done"
          description="Get the job done and get paid. It's that simple!"
        />
      </div>
    </HeaderWrapper>
  );
}

function Index() {
  const words = "Empowering the Gig Economy".split(" ");
  const partnerLink = process.env.NEXT_PUBLIC_PARTNER_LINK || "/user/sign-up";
  const customerLink = process.env.NEXT_PUBLIC_CUSTOMER_LINK || "/user/sign-up";
  return (
    <div
      className="flex flex-col items-center justify-center w-full min-h-[70vh] bg-foreground"
      id="Index"
    >
      <div className="flex lg:flex-row flex-col items-center lg:justify-between justify-start space-y-10 lg:space-y-0 w-full max-w-7xl px-5 py-10 lg:px-16">
        <div className="flex flex-col lg:items-start items-center justify-center space-y-5">
          <div className="lg:hidden flex">
            <ReachSVG color="#f40e1e" className="w-40" />
          </div>
          <h1 className="lg:text-5xl text-3xl font-bold lg:text-left text-center text-white">
            <span className="text-primary leading-relaxed">Empowering</span>{" "}
            <br />
            the Gig Economy
          </h1>
          <p className="lg:text-lg text-md text-center text-white">
            Join us and be part of the revolution.
          </p>
          <div className="grid grid-cols-2 gap-5 pt-5">
            <Button asChild variant="success">
              <Link href={partnerLink}>Become a Partner</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`${customerLink}/explore`}>Find Services</Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center space-y-5">
          <ImageComponent
            src="/images/index.svg"
            alt="ReachGig"
            className="rounded-2xl lg:w-[25rem] lg:h-[25rem] w-[15rem] h-[15rem]"
            border={false}
          />
        </div>
      </div>
    </div>
  );
}
