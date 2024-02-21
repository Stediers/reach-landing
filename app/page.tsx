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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

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
      <JoinReach />
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

function HappyPartners() {
  return (
    <HeaderWrapper
      title="Happy Partners"
      className="items-center justify-center w-full flex flex-col space-y-16"
      id="happy-partners"
    >
      <div className="lg:grid grid-cols-3 lg:gap-x-10 lg:gap-y-10 w-full lg:justify-items-center flex flex-col items-center justify-center space-y-10 lg:space-y-0">
        <PartnerCard
          name="Pooja"
          designation="Makeup Artist"
          quote="Hi"
          image="/images/what-we-believe-3.webp"
        />
        <PartnerCard
          name="Parthiban"
          designation="Photographer"
          quote="Hi"
          image="/images/what-we-believe-1.webp"
        />
        <PartnerCard
          name="Saravanan"
          designation="Caterer"
          quote="Hi"
          image="/images/what-we-believe-2.webp"
        />
        <PartnerCard
          name="Pooja"
          designation="Makeup Artist"
          quote="Hi"
          image="/images/what-we-believe-3.webp"
        />
        <PartnerCard
          name="Parthiban"
          designation="Photographer"
          quote="Hi"
          image="/images/what-we-believe-1.webp"
        />
        <PartnerCard
          name="Saravanan"
          designation="Caterer"
          quote="Hi"
          image="/images/what-we-believe-2.webp"
        />
      </div>
    </HeaderWrapper>
  );
}

function PartnerCard({
  name,
  designation,
  quote,
  image,
}: {
  name: string;
  designation: string;
  quote: string;
  image: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <ImageComponent
        src={image}
        alt={name}
        className="rounded-2xl lg:w-[18rem] lg:h-[18rem] border border-gray w-[12rem] h-[12rem]"
        whileHover={{ scale: 1.05 }}
      />
      <div className="flex flex-col items-center justify-center lg:space-y-2 space-y-1">
        <p className="lg:text-2xl text-lg font-medium text-center">{name}</p>
        <p className="lg:text-md text-base text-center text-info">
          {designation}
        </p>
      </div>
    </div>
  );
}

function CustomerStories() {
  return (
    <HeaderWrapper
      title="Happy Customers"
      className="items-center justify-center w-full flex flex-col space-y-16"
      id="customer-stories"
    >
      <div className="lg:grid grid-cols-3 lg:gap-x-10 lg:gap-y-10 w-full lg:justify-items-center flex flex-col items-center justify-center space-y-10 lg:space-y-0">
        <CustomerCard
          name="Pooja"
          designation="Makeup Artist"
          quote="Hi"
          image="/images/what-we-believe-3.webp"
        />
        <CustomerCard
          name="Parthiban"
          designation="Photographer"
          quote="Hi"
          image="/images/what-we-believe-1.webp"
        />
        <CustomerCard
          name="Saravanan"
          designation="Caterer"
          quote="Hi"
          image="/images/what-we-believe-2.webp"
        />
        <CustomerCard
          name="Pooja"
          designation="Makeup Artist"
          quote="Hi"
          image="/images/what-we-believe-3.webp"
        />
        <CustomerCard
          name="Parthiban"
          designation="Photographer"
          quote="Hi"
          image="/images/what-we-believe-1.webp"
        />
        <CustomerCard
          name="Saravanan"
          designation="Caterer"
          quote="Hi"
          image="/images/what-we-believe-2.webp"
        />
      </div>
    </HeaderWrapper>
  );

  function CustomerCard({
    name,
    designation,
    quote,
    image,
  }: {
    name: string;
    designation: string;
    quote: string;
    image: string;
  }) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 lg:space-y-7">
        <ImageComponent
          src={image}
          alt={name}
          className="rounded-2xl lg:w-[18rem] lg:h-[18rem] border border-gray w-[12rem] h-[12rem]"
          whileHover={{ scale: 1.05 }}
        />
        <div className="flex flex-col items-center justify-center lg:space-y-2 space-y-1">
          <p className="lg:text-2xl text-lg font-medium text-center">{name}</p>
          <p className="lg:text-md text-base text-center text-info">
            {designation}
          </p>
        </div>
      </div>
    );
  }
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
            <Link href="/user/sign-up">How does it work?</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function JoinReach() {
  return (
    <HeaderWrapper
      title="What are you waiting for?"
      className="items-center justify-center w-full flex flex-col space-y-16"
      id="who-we-are-and-what-we-do"
    >
      <div className="grid lg:grid-cols-3 grid-cols-1 justify-items-center gap-x-10 gap-y-20 w-full max-w-7xl">
        <DescriptionCard
          title="Become a Partner"
          description="Join ReachGig"
          linkText="Join Now"
          link="/user/sign-up"
          icon={<MdPersonSearch className={iconStyle} />}
        />
        <DescriptionCard
          title="Search for Services"
          description="Join ReachGig"
          linkText="Join Now"
          link="/user/sign-up"
          icon={<GiJourney className={iconStyle} />}
        />
        <DescriptionCard
          title="Careers"
          description="Help us change the way we work and earn."
          linkText="Join Now"
          link="/user/sign-up"
          icon={<AiFillStar className={iconStyle} />}
        />
      </div>
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

function FeatureCard({
  icon,
  heading,
  description,
}: {
  icon: ReactNode;
  heading: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {icon}
      <p className="lg:text-2xl text-lg font-medium text-center">{heading}</p>
      <p className="lg:text-md text-base text-center max-w-[20rem]">
        {description}
      </p>
    </div>
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
            Lets change the way we work and earn.
          </p>
          <div className="grid grid-cols-2 gap-5 pt-5">
            <Button asChild variant="success">
              <Link href={partnerLink}>Become a Partner</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={customerLink}>Find Partners</Link>
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

function DescriptionCard({
  title,
  description,
  linkText = "Find Services",
  link,
  icon,
}: {
  title: string;
  description: string;
  linkText?: string;
  link: string;
  icon: ReactNode;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center space-x-5">{icon}</div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-center space-y-5 lg:space-y-0 lg:flex-row lg:space-x-5 pt-5">
          <Button asChild variant="default">
            <Link href={link}>{linkText}</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function WhatWeBelieve({ cookieExists }: { cookieExists: boolean }) {
  return (
    <HeaderWrapper
      title="WE BELIEVE IN YOU"
      className="items-center justify-center w-full flex flex-col space-y-16"
      id="about-us"
    >
      <p className="lg:text-lg text-md text-center max-w-2xl">
        We are a team of passionate individuals who believe in the power of
        dreams. We are here to help you reach your dreams and achieve your
        goals.
      </p>
      <div className="lg:grid grid-cols-3 lg:gap-x-10 lg:gap-y-10 w-full lg:justify-items-center flex flex-col items-center justify-center space-y-10 lg:space-y-0">
        <ImageWithQuote
          image="/images/what-we-believe-1.webp"
          quote="Hi"
          name="Deepakindresh N"
          designation="Head of Marketing"
        />
        <ImageWithQuote
          designation="Chief Executive Officer"
          name="Harshavardhan J"
          quote="Hi"
          image="/images/what-we-believe-3.webp"
        />
        <ImageWithQuote
          image="/images/what-we-believe-2.webp"
          quote="Hi"
          name="Gautthum J"
          designation="Chief Operating Officer"
        />
      </div>
    </HeaderWrapper>
  );

  function ImageWithQuote({
    image,
    quote,
    name,
    designation,
  }: {
    image: string;
    quote: string;
    name: string;
    designation: string;
  }) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <ImageComponent
          src={image}
          alt={name}
          className="rounded-2xl lg:w-[20rem] lg:h-[20rem] border border-gray w-[12rem] h-[12rem]"
          whileHover={{ scale: 1.05 }}
        />
        <div className="flex flex-col items-center justify-center lg:space-y-2 space-y-1">
          <p className="lg:text-2xl text-lg font-medium text-center">{name}</p>
          <p className="lg:text-md text-base text-center">Co Founder</p>
          <p className="lg:text-md text-base text-center text-info">
            {designation}
          </p>
        </div>
      </div>
    );
  }
}

function HeaderWrapper({
  children,
  title,
  bgColor = "bg-white text-text",
  className,
  id,
  showHeader = true,
}: {
  children: ReactNode;
  title: string;
  bgColor?: string;
  className?: string;
  id?: string;
  showHeader?: boolean;
}) {
  return (
    <div id={id} className={`${className} py-16 w-full px-7 ${bgColor}`}>
      {showHeader && (
        <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="text-2xl lg:text-3xl font-medium text-center first-letter:capitalize">
            {title}
          </h1>
          <div className="h-px w-[80%] bg-primary" />
        </div>
      )}
      {children}
    </div>
  );
}
