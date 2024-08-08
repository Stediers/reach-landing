import { ServiceCategory, State } from "@data/enums";
import React from "react";
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
  Flower,
  MessageSquareQuote,
  Percent,
  Search,
  SearchCheckIcon,
  ShieldCheckIcon,
  ShieldCloseIcon,
  UserPlus,
} from "lucide-react";
import ImageComponent from "@components/ImageComponent";
import Card from "@components/Card";
import ReachSVG from "@components/svg/ReachSVG";
import { BsShieldCheck } from "react-icons/bs";
import Link from "next/link";
import FeatureCard from "@components/FeatureCard";
import { ProfileCard } from "@components/ProfileCard";
import SwitchText from "@components/landing/SwitchText";
import { NumberCircle } from "@components/landing/NumberCircle";
import SearchInput from "@components/landing/Search";
import HeaderWrapper from "@wrapper/HeaderWrapper";
import ImageCarousel from "@components/ImageCarousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import { CardContent } from "@components/ui/card";
import { AspectRatio } from "@components/ui/aspect-ratio";

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
  //   const response = await fetchServiceCategories();
  //   if (response) {
  //     console.log("response", response);
  //   }
  return (
    <div className="relative w-full flex flex-col items-center justify-center scroll-smooth pb-20 pt-5 lg:pt-0">
      <Hero />
      <TheSafeWay />
      <YourOwnProfile />
      <div hidden className="lg:hidden flex items-start w-full">
        <BecomePartner />
      </div>
      <Pricing />
      <BestPartners />
    </div>
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
  return (
    <div className="lg:min-h-[75vh] w-full flex flex-col items-center justify-center space-y-5 relative">
      <div className="flex flex-col lg:flex-row lg:items-center items-start justify-center lg:justify-center pb-10 space-y-5 w-full px-5 lg:px-10 lg:min-h-[75vh] max-w-7xl">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0 hidden lg:block">
          <ImageComponent
            src="/images/landing-background.png"
            alt="Landing Background"
            className="w-full h-full object-cover z-0"
          />
        </div>
        <div className="flex flex-col items-start justify-center space-y-3 lg:space-y-5 w-full z-10">
          <ReachSVG className="w-32 lg:w-40" color="#f40e1e" />
          <h1 className="text-3xl lg:text-5xl font-medium  !leading-snug">
            Empowering <br />
            the best <br />
            {/* <SwitchText
            textArray={[
              "Makeup Artists",
              "Photographers",
              "Mehandi Artists",
              "Wedding Planners",
            ]}
          /> */}
            <Carousel
              className="w-full max-w-lg"
              autoplay={true}
              autoplayInterval={5000}
              opts={{ loop: true }}
            >
              <CarouselContent>
                <CarouselItem>
                  <span className="font-semibold text-primary">
                    Makeup Artists
                  </span>
                </CarouselItem>
                <CarouselItem>
                  <span className="font-semibold text-primary">
                    Photographers
                  </span>
                </CarouselItem>
                <CarouselItem>
                  <span className="font-semibold text-primary">
                    Mehandi Artists
                  </span>
                </CarouselItem>
                <CarouselItem>
                  <span className="font-semibold text-primary">
                    Wedding Planners
                  </span>
                </CarouselItem>
                <CarouselItem>
                  <span className="font-semibold text-primary">
                    Fitness Trainers
                  </span>
                </CarouselItem>
                <CarouselItem>
                  <span className="font-semibold text-primary">
                    Yoga Trainers
                  </span>
                </CarouselItem>
                <CarouselItem>
                  <span className="font-semibold text-primary">DJs</span>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </h1>

          <div className="max-w-md w-full grid grid-cols-2 gap-5 pt-3">
            {/* <SearchInput /> */}
            <Link href="/explore" passHref>
              <Button variant="info" className="!w-full">
                Hire Now
              </Button>
            </Link>
            <Link href="/partner" passHref>
              <Button variant="successOutline" className="!w-full">
                Join Us
              </Button>
            </Link>
          </div>
        </div>
        <ImageComponent
          src="/images/home1.png"
          alt="Landing Image 1"
          className="w-full h-80 lg:h-[30rem] lg:w-1/2 object-cover"
          popup={false}
          border={false}
        />
      </div>
    </div>
  );
}

function TheSafeWay() {
  return (
    <HeaderWrapper
      title={
        <span className="!leading-snug text-white lg:text-text">
          The
          <br /> <span className="font-semibold lg:text-primary">Safe</span> Way
        </span>
      }
      className="items-center rounded-t-lg py-5 bg-info lg:bg-white lg:py-20 min-h-[80vh] justify-center w-full flex flex-col space-y-16 relative"
    >
      <div className="lg:grid grid-cols-3 lg:gap-x-20 lg:gap-y-24 w-full lg:justify-items-start flex flex-col items-start justify-center space-y-14 lg:space-y-0 pt-5 lg:text-text text-white">
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
          Our <br /> <span className="text-primary font-semibold">Pricing</span>
        </span>
      }
      className="lg:bg-[#0F1117] lg:text-white lg:py-10"
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
