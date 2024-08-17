import { ServiceCategory, State } from "@data/enums";
import React, { useState } from "react";
import Image from "next/image";
import { Metadata } from "next";
import { BiRupee } from "react-icons/bi";
import { Button } from "@components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import {
  ArrowDownCircle,
  ArrowRightCircle,
  BookIcon,
  Check,
  FeatherIcon,
  Flower,
  HandshakeIcon,
  MessageSquareQuote,
  Percent,
  Search,
  SearchCheckIcon,
  ShieldCheckIcon,
  ShieldCloseIcon,
  Star,
  UserPlus,
} from "lucide-react";
import ImageComponent from "@components/ImageComponent";
import Card from "@components/Card";
import ReachSVG from "@components/svg/ReachSVG";
import { BsLightningCharge, BsShieldCheck } from "react-icons/bs";
import Link from "next/link";
import FeatureCard from "@components/FeatureCard";
import { ProfileCard } from "@components/ProfileCard";
import SwitchText from "@components/landing/SwitchText";
import { NumberCircle } from "@components/landing/NumberCircle";
import SearchInput from "@components/landing/Search";
import HeaderWrapper from "@wrapper/HeaderWrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import { CardContent } from "@components/ui/card";
import { AspectRatio } from "@components/ui/aspect-ratio";
import { serviceTypeDescriptions } from "@data/static";
import RawCarousel from "@components/carousel/RawCarousel";
import TextInput from "@components/input/TextInput";

export const metadata: Metadata = {
  description:
    "A secure way to interact with service providers. Find the best services and partners for your needs. Empowering the Gig Economy.",
  keywords:
    "Makeup Artists, Photographers, Mehandi Artists, Wedding Planners, Service Providers, Gig Economy, Service Categories, Tamil Nadu, India",
  openGraph: {
    title: "ReachGig",
    description:
      "A secure way to interact with service providers. Find the best services and partners for your needs. Empowering the Gig Economy.",
    url: "https://reachgig.com",
    type: "website",
    images: [
      {
        url: "https://reachgig.com/images/home1.svg",
        width: 800,
        height: 600,
        alt: "ReachGig",
      },
    ],
    locale: "en_US",
  },
};

export default function Main() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center scroll-smooth pb-20 lg:pt-0">
      <Hero />
      <Steps />
      <ElevateYourBrand />
      {/* <TheSafeWay />
      <YourOwnProfile />
      <div hidden className="lg:hidden flex items-start w-full">
        <BecomePartner />
      </div> */}
      <UpYourCareer />
      <Pricing />
      {/* <BestPartners /> */}
    </div>
  );
}

function ElevateYourBrand() {
  return (
    <HeaderWrapper
      title={
        <span className="!leading-snug">
          Make <br /> an{" "}
          <span className="text-primary font-semibold">Impact</span>
        </span>
      }
      className="items-center rounded-t-lg justify-center w-full flex flex-col space-y-16 bg-[#0F1117] text-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
        <ProfileCard
          description="I am a professional makeup artist with 3 years of experience. I have worked with clients from all over Tamil Nadu and have delivered high-quality makeup that has helped my clients look their best."
          images={[
            "https://user4762.s3.ap-south-1.amazonaws.com/gig/6382422787/0991A4DC-5FE3-4368-A080-463735EE8B21.jpeg.jpeg",
          ]}
          link="/partner/@Rithanyeahmakeover"
          name="Rithanya Makeover"
          profession="Makeup Artist"
          key={1}
          className="shrink-0"
        />
        <ProfileCard
          description="I have been a professional beautician for over a decade and have worked with clients from all over Tamil Nadu. I have helped my clients look their best for various occasions."
          images={[
            "https://user4762.s3.ap-south-1.amazonaws.com/1000470803.jpeg",
          ]}
          link="/partner/@lathaa"
          name="Latha Anand"
          profession="Beautician"
          key={1}
        />
      </div>
    </HeaderWrapper>
  );
}

function UpYourCareer() {
  return (
    <HeaderWrapper
      title={
        <span className="!leading-snug">
          No
          <br /> <span className="text-primary font-semibold">Scams</span> Here
        </span>
      }
      className="items-center justify-center w-full flex flex-col space-y-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full">
        <FeatureCard
          heading="Identity Verification"
          description="We ensure that all our partners are verified and trustworthy."
          icon={<ShieldCheckIcon className="w-14 h-14 lg:w-16 lg:h-16" />}
        />
        <FeatureCard
          heading="Skill Verification"
          description="We ensure that all our partners are skilled and experienced."
          icon={<Star className="w-14 h-14 lg:w-16 lg:h-16" />}
        />
        <FeatureCard
          heading="Secure Payments"
          description="Your payments are secure and protected by automated systems. "
          icon={<HandshakeIcon className="w-14 h-14 lg:w-16 lg:h-16" />}
        />
        <FeatureCard
          heading="No Hidden Costs"
          description="Hidden costs are a thing of the past. We ensure transparency."
          icon={<FeatherIcon className="w-14 h-14 lg:w-16 lg:h-16" />}
        />
        <FeatureCard
          heading="Quick Response"
          description="Our partners are quick to respond to your queries and requests."
          icon={<BsLightningCharge className="w-14 h-14 lg:w-16 lg:h-16" />}
        />
        <FeatureCard
          heading="Your Budget"
          description="We have partners for every budget. Find the right one for you."
          icon={<BiRupee className="w-14 h-14 lg:w-16 lg:h-16" />}
        />
      </div>
    </HeaderWrapper>
  );
}

function Steps() {
  return (
    <HeaderWrapper
      title={
        <span className="!leading-snug">
          Easy <br /> <span className="text-primary font-semibold">For</span>{" "}
          Everyone
        </span>
      }
      className="items-center justify-center w-full flex flex-col space-y-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full">
        <FeatureCard
          heading="Request Callback"
          description="Ask the service provider to call you back after providing your details."
          icon={<NumberCircle number={1} size="lg" color="text" />}
        />
        <FeatureCard
          heading="Schedule Appointment"
          description="The partner will schedule an appointment with you."
          icon={<NumberCircle number={2} size="lg" color="text" />}
        />
        <FeatureCard
          heading="Pay Advance"
          description="Pay the advance amount to confirm the appointment."
          icon={<NumberCircle number={3} size="lg" color="text" />}
        />
        <FeatureCard
          heading="Get the Job Done"
          description="Share the completion OTP once the job is done."
          icon={<NumberCircle number={4} size="lg" color="text" />}
        />
        <FeatureCard
          heading="Pay Remaining Amount"
          description="Settle the remaining amount after the job is done."
          icon={<NumberCircle number={5} size="lg" color="text" />}
        />
        <FeatureCard
          heading="Review"
          description="Provide feedback for your experience anonymously."
          icon={<NumberCircle number={6} size="lg" color="text" />}
        />
      </div>
    </HeaderWrapper>
  );
}

function YourOwnProfile() {
  return (
    <HeaderWrapper
      title={
        <span className="!leading-snug">
          Become a <br />{" "}
          <span className="text-primary font-semibold">Trustable</span> Partner
        </span>
      }
      className="lg:bg-[#0F1117] lg:text-white lg:py-10 lg:rounded-t-2xl"
    >
      <div className="flex flex-col lg:flex-row items-start justify-center lg:justify-start space-y-20 lg:space-y-0 lg:space-x-20 w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          hidden
          className="lg:w-1/4 lg:block mr-10 shrink-0 lg:h-full w-full h-[30rem] overflow-hidden !bg-transparent hidden"
        >
          <source src="/videos/landing-video-black.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          playsInline
          hidden
          className="lg:hidden shrink-0 w-2/3 bg-white h-full block"
        >
          <source src="/videos/landing-video-white.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
          className="lg:grid grid-cols-1 lg:grid-cols-7 gap-5 lg:gap-10 justify-items-start items-start w-full hidden h-full"
          hidden
        >
          <div className="grid grid-cols-2 gap-2 lg:gap-10 lg:col-span-4 w-full relative">
            <Image
              alt="Hero"
              src="/images/trustable-cards/card1.svg"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }} // optional
            />
            <Image
              alt="Hero"
              src="/images/trustable-cards/card2.svg"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }} // optional
            />
          </div>
          <Image
            alt="Hero"
            src="/images/trustable-cards/card4.svg"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full lg:col-span-3"
            style={{ width: "100%", height: "auto" }} // optional
          />
          <Image
            alt="Hero"
            src="/images/trustable-cards/card5.svg"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full lg:max-h-full lg:col-span-3"
            style={{ width: "100%", height: "auto" }} // optional
          />
          <div className="grid grid-cols-2 gap-2 lg:gap-10 lg:col-span-4 w-full">
            <Image
              alt="Hero"
              src="/images/trustable-cards/card3.svg"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full lg:max-h-full"
              style={{ width: "100%", height: "auto" }} // optional
            />
            <Image
              alt="Hero"
              src="/images/trustable-cards/card6.svg"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full"
              style={{ width: "100%", height: "auto" }} // optional
            />
          </div>
        </div>
      </div>
    </HeaderWrapper>
  );
}

function BestPartners() {
  return (
    <HeaderWrapper
      title={
        <span className="!leading-snug">
          Our <br /> <span className="text-primary font-semibold">Best</span>{" "}
          Partners
        </span>
      }
      className="items-center justify-center w-full flex flex-col space-y-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 w-full">
        <ProfileCard
          description="I am a professional makeup artist with 3 years of experience. I have worked with clients from all over Tamil Nadu and have delivered high-quality makeup that has helped my clients look their best."
          images={[
            "https://user4762.s3.ap-south-1.amazonaws.com/gig/6382422787/0991A4DC-5FE3-4368-A080-463735EE8B21.jpeg.jpeg",
          ]}
          link="/partner/2c3dbba5-6eb1-4954-9d1d-65a6b2a0b8de"
          name="Rithanya Makeover"
          profession="Makeup Artist"
          key={1}
        />
        <ProfileCard
          description="I am the winner of the Mr. World competition and have been a professional Fitness Trainer for over a decade. I have trained over a 100 champions who have gone on to win titles on various stages."
          images={[
            "https://user4762.s3.ap-south-1.amazonaws.com/8A6B802E-B52C-405E-A939-E08D671F2F82.jpeg",
          ]}
          link="/service/b2c066bd-82f4-4225-b260-ef6f4cfcad47"
          name="Mohan Subramaniam"
          profession="Mr. World"
          key={1}
        />
      </div>
    </HeaderWrapper>
  );
}

function BecomePartner() {
  return (
    <HeaderWrapper
      title={
        <span className="!leading-snug">
          Huge <br />{" "}
          <span className="text-primary font-semibold">Opportunity</span>
        </span>
      }
      className="lg:bg-[#0F1117] lg:text-white lg:py-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-5 lg:gap-10 justify-items-start items-start w-full lg:max-w-7xl">
        <div className="grid grid-cols-2 gap-2 lg:gap-10 lg:col-span-4 w-full relative">
          <Image
            alt="Hero"
            src="/images/trustable-cards/card1.svg"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }} // optional
          />
          <Image
            alt="Hero"
            src="/images/trustable-cards/card2.svg"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }} // optional
          />
        </div>
        <Image
          alt="Hero"
          src="/images/trustable-cards/card4.svg"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full lg:col-span-3"
          style={{ width: "100%", height: "auto" }} // optional
        />
        <Image
          alt="Hero"
          src="/images/trustable-cards/card5.svg"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full lg:max-h-full lg:col-span-3"
          style={{ width: "100%", height: "auto" }} // optional
        />
        <div className="grid grid-cols-2 gap-2 lg:gap-10 lg:col-span-4 w-full">
          <Image
            alt="Hero"
            src="/images/trustable-cards/card3.svg"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full lg:max-h-full"
            style={{ width: "100%", height: "auto" }} // optional
          />
          <Image
            alt="Hero"
            src="/images/trustable-cards/card6.svg"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full"
            style={{ width: "100%", height: "auto" }} // optional
          />
        </div>
      </div>
    </HeaderWrapper>
  );
}

function Hero() {
  const partnerUrl = process.env.NEXT_PUBLIC_PARTNER_LINK || "";
  return (
    <div
      className="w-full flex flex-col items-center justify-center space-y-5 relative lg:pt-10 xl:min-h-[80vh] lg:min-h-[50vh] bg-[#F8F7F1] pt-10"
      id="home"
    >
      <div className="flex flex-col lg:flex-row lg:items-center items-start justify-center lg:justify-center pb-10 space-y-5 w-full px-5 lg:px-10 max-w-7xl lg:space-x-20">
        <div className="flex flex-col items-start justify-center space-y-3 lg:space-y-5 w-full z-10">
          <div className="flex flex-col items-start justify-center space-y-3 lg:space-y-5 w-full max-w-lg">
            {/* <div
              className="rounded-3xl bg-white w-full border overflow-hidden flex items-center justify-start lg:hidden mb-5"
              hidden
            >
              <ImageComponent
                src="https://user4762.s3.ap-south-1.amazonaws.com/gig/6382422787/0991A4DC-5FE3-4368-A080-463735EE8B21.jpeg.jpeg"
                alt="ReachGig Logo"
                className="w-24 h-24 lg:w-32 lg:h-32"
                popup={false}
                border={false}
                objectFit="contain"
              />
              <div className="flex flex-col items-start justify-center space-y-2 p-5">
                <p className="text-lg lg:text-2xl font-semibold lg:font-bold">
                  Rithanya Makeover
                </p>
                <p className="text-base lg:text-lg font-normal lg:font-medium">
                  Makeup Artist
                </p>
              </div>
            </div> */}

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium lg:font-semibold !leading-tight xl:!leading-[4.7rem]">
              <span className="font-medium">Stand out</span>
              <br />
              <span className="font-semibold">and become</span>
              <br />
              {/* <SwitchText
              textArray={Object.keys(serviceTypeDescriptions).map(
                //@ts-ignore
                (key) => serviceTypeDescriptions[key].title
              )}
            /> */}
              {/* <SwitchText
                textArray={["Trustable", "Reliable", "Professional"]}
              /> */}
              <span className="font-semibold text-primary">Trustable</span>
            </h1>
            <h2 className="text-lg xl:text-xl font-normal xl:leading-relaxed">
              Advocating safe and secure interactions with service providers.
            </h2>
          </div>

          <div className="max-w-md w-full grid lg:grid-cols-2 gap-5 pt-3">
            {/* <SearchInput /> */}
            <Link href={`${partnerUrl}/user/sign-in`} passHref>
              <Button variant="success" className="!w-full">
                Start for Free
              </Button>
            </Link>
            <Link href="/explore" passHref>
              <Button variant="close" className="!w-full">
                Looking for a freelancer?
              </Button>
            </Link>
          </div>
        </div>
        {/* <ImageComponent
          src="/images/home1.png"
          alt="Landing Image 1"
          className="w-full h-full aspect-square lg:h-[30rem] lg:w-1/2 object-cover"
          popup={false}
          border={false}
          objectFit="contain"
        /> */}
        {/* <ImageCarousel
          bgCol="bg-black"
          images={[
            "/images/landing-profiles/1.png",
            "/images/landing-profiles/2.png",
            "/images/landing-profiles/3.png",
            "/images/landing-profiles/4.png",
          ]}
          autoPlay={true}
          imageHeight="h-[15rem] xl:h-[25rem]"
          border={false}
          showArrows={false}
        /> */}
        <RawCarousel autoPlay={true} showArrows={false}>
          {[1, 2, 3, 4].map((index) => (
            <CarouselItem key={index}>
              <ImageComponent
                src={`/images/landing-profiles/${index}.webp`}
                alt={`Landing Image ${index}`}
                className="w-full h-full aspect-square object-cover"
                popup={false}
                border={false}
                objectFit="contain"
              />
            </CarouselItem>
          ))}
        </RawCarousel>
      </div>
      {/* <div className="w-full flex items-center justify-center py-5 lg:bg-primary lg:text-white lg:text-xl">
        Trusted by&nbsp;
        <span className="lg:text-white text-primary font-semibold">
          1000+ Customers and Partners
        </span>
      </div> */}
    </div>
  );
}

function TheSafeWay() {
  return (
    <HeaderWrapper
      title={
        <span className="!leading-snug lg:text-text">
          The
          <br /> <span className="font-semibold text-primary">Safe</span> Way
        </span>
      }
      className="items-center rounded-t-lg py-5 lg:py-20 min-h-[80vh] justify-center w-full flex flex-col space-y-16 relative"
    >
      <div className="lg:grid grid-cols-3 lg:gap-x-20 lg:gap-y-24 w-full lg:justify-items-start flex flex-col items-start justify-center space-y-14 lg:space-y-0 pt-5">
        <FeatureCard
          heading="Request Callback"
          description="Ask the service provider to call you back after providing your details."
          icon={<BookIcon className="w-14 h-14 lg:w-16 lg:h-16" />}
        />
        <FeatureCard
          heading="Schedule Appointment"
          description="The partner will schedule an appointment with you."
          icon={<Flower className="w-14 h-14 lg:w-16 lg:h-16" />}
        />
        <FeatureCard
          heading="Pay Advance"
          description="Pay the advance amount to confirm the appointment."
          icon={<BiRupee className="w-14 h-14 lg:w-16 lg:h-16" />}
        />
        <FeatureCard
          heading="Get the Job Done"
          description="Share the completion OTP once the job is done."
          icon={<MessageSquareQuote className="w-14 h-14 lg:w-16 lg:h-16" />}
        />
        <FeatureCard
          heading="Pay Remaining Amount"
          description="Settle the remaining amount after the job is done."
          icon={<Percent className="w-14 h-14 lg:w-16 lg:h-16" />}
        />
        <FeatureCard
          heading="Review"
          description="Provide feedback for your experience anonymously."
          icon={<BsShieldCheck className="w-14 h-14 lg:w-16 lg:h-16" />}
        />
      </div>
    </HeaderWrapper>
  );
}

function Pricing() {
  return (
    <HeaderWrapper
      title={
        <span className="!leading-snug">
          The <br /> <span className="text-primary font-semibold">Right</span>
          {"  "}Price
        </span>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
        <PricingCard
          title="Free"
          description="The complete reachgig experience for free."
          price={0}
          commision={0}
          features={[
            "Personalized Profile",
            "Lead Generation",
            "Maximum of 5 services",
            "Proof of Appointment",
            "Automated Appointment Flows",
            "Dispute Resolution Team",
          ]}
          tag="No upfront costs"
        />
        {/* <PricingCard
          title="Basic"
          description="For individuals and small businesses."
          capped={800}
          commision={20}
          price={20}
          features={[
            "Everything in Free",
            "Secure Payments",
            "Proof of Appointment",
            "Automated Appointment Flows",
            "Dispute Resolution Team",
            "Maximum of 10 services",
          ]}
          tag="Collected from your clients"
        /> */}
        <PricingCard
          title="Pro"
          description="To become a pro in your industry."
          price={1499}
          features={[
            "Everything in Free",
            "Invoice Generation",
            "Unlimited Services",
            "Unlimited Businesses",
            "Brand building assistance",
            "Dedicated Account Manager",
            "Customized Solutions",
          ]}
          capped={1500}
          tag="Invest in your business"
        />
      </div>
    </HeaderWrapper>
  );
}

function PricingCard({
  title,
  description,
  commision,
  price,
  features,
  className,
  capped,
  tag,
}: {
  title: string;
  description: string;
  commision?: number;
  features: string[];
  className?: string;
  capped?: number;
  tag: string;
  price: number | string;
}) {
  return (
    <Card
      className={`w-full ${className} lg:!p-10 !p-5 !justify-between !space-y-10`}
    >
      <div className="flex flex-col items-start justify-start h-full space-y-10">
        <div className="flex flex-col items-start justify-start space-y-5">
          <p className="text-base font-medium">{tag}</p>
          <h3 className="text-3xl font-medium">{title}</h3>
          <p className="text-lg">{description}</p>
          {commision != undefined ? (
            <div className="flex flex-col items-start justify-start space-y-5">
              <p className="text-3xl font-medium w-full flex flex-row space-x-2 items-center">
                <span>{commision}</span>
                <Percent size={20} />
                <span className="text-lg font-normal">Advance</span>
              </p>
              {capped && (
                <p className="text-lg font-normal">
                  Capped at{" "}
                  <span className="text-success font-medium">₹{capped}</span>
                </p>
              )}
            </div>
          ) : (
            <p className="text-3xl font-medium w-full flex flex-row space-x-2 items-center">
              <span>₹ {price}</span>
              <span className="text-lg font-normal">/ month</span>
            </p>
          )}
        </div>

        <ul className="flex flex-col items-start justify-start space-y-5">
          {features.map((feature) => (
            <li
              className="flex flex-row items-center justify-start space-x-2"
              key={feature}
            >
              <Check size={24} className="text-success" />
              <p>{feature}</p>
            </li>
          ))}
        </ul>
      </div>
      <Link
        href="https://partner.reachgig.com"
        className="w-full"
        passHref
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="success" className="!w-full">
          Get Started with {title}
        </Button>
      </Link>
    </Card>
  );
}
