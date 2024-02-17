import Logo from "@components/Logo";
import { ReactNode } from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { FcConferenceCall, FcBullish } from "react-icons/fc";
import { CiTrophy } from "react-icons/ci";
import Card from "@components/Card";
import "swiper/css";
import "swiper/css/pagination";
import { MdOutlinePriceCheck, MdPersonSearch } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import ImageComponent from "@components/ImageComponent";
import { GiJourney } from "react-icons/gi";
import { FaHandshake } from "react-icons/fa";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

const iconStyle = "lg:w-28 lg:h-28 w-20 h-20";

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
    <div className="relative flex flex-col items-center justify-center scroll-smooth px-5">
      <Index />
      <What />
      <How />
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

function How() {
  return (
    <HeaderWrapper
      title="How does it work?"
      className="items-center justify-center w-full flex flex-col space-y-16"
      id="how-it-works"
    >
      <div className="lg:grid grid-cols-3 lg:gap-x-10 lg:gap-y-10 w-full lg:justify-items-center flex flex-col items-center justify-center space-y-10 lg:space-y-0">
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

function What() {
  return (
    <HeaderWrapper
      title="What is Reach?"
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

function Blogs() {
  return (
    <HeaderWrapper
      title="LEARN AND GROW"
      className="items-center justify-center w-full flex flex-col space-y-16"
      id="blogs"
    >
      <div className="lg:grid grid-cols-3 justify-items-center lg:gap-y-32 gap-y-10 lg:gap-x-10 w-full lg:justify-items-center flex flex-col items-center justify-center space-y-10 lg:space-y-0">
        <BlogCard
          title="How to get more clients?"
          image="/images/blog-1.svg"
          description="Learn how to get more clients on Reach."
          link="/blog/how-to-get-more-clients"
        />
        <BlogCard
          title="How to get more clients?"
          image="/images/blog-1.svg"
          description="Learn how to get more clients on Reach."
          link="/blog/how-to-get-more-clients"
        />
        <BlogCard
          title="How to get more clients?"
          image="/images/blog-1.svg"
          description="Learn how to get more clients on Reach."
          link="/blog/how-to-get-more-clients"
        />
        <BlogCard
          title="How to get more clients?"
          image="/images/blog-1.svg"
          description="Learn how to get more clients on Reach."
          link="/blog/how-to-get-more-clients"
        />
        <BlogCard
          title="How to get more clients?"
          image="/images/blog-1.svg"
          description="Learn how to get more clients on Reach."
          link="/blog/how-to-get-more-clients"
        />
        <BlogCard
          title="How to get more clients?"
          image="/images/blog-1.svg"
          description="Learn how to get more clients on Reach."
          link="/blog/how-to-get-more-clients"
        />
      </div>
    </HeaderWrapper>
  );

  function BlogCard({
    title,
    image,
    description,
    link,
  }: {
    title: string;
    image: string;
    description: string;
    link: string;
  }) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 cursor-pointer">
        <ImageComponent
          src={image}
          alt={title}
          className="rounded-2xl lg:w-[20rem] lg:h-[20rem] border border-gray w-[12rem] h-[12rem] hover:scale-105 transition duration-200 cursor-pointer"
          whileHover={{ scale: 1.0 }}
        />
        <div className="flex flex-col items-center justify-center lg:space-y-2 space-y-1">
          <p className="lg:text-2xl text-lg font-medium text-center">{title}</p>
          <p className="lg:text-md text-base text-center">{description}</p>
        </div>
      </div>
    );
  }
}

function WordPopUp({
  words,
  delay,
}: {
  words: string;
  delay: number;
  className?: string;
}) {
  const wordsArray = words.split(" ");
  const typeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <div className="flex items-center justify-center space-x-1 text-lg font-medium">
      {wordsArray.map((word, index) => (
        <span key={index}>{word}</span>
      ))}
    </div>
  );
}

function Index() {
  const words = "Empowering the Gig Economy".split(" ");
  const partnerLink = process.env.NEXT_PUBLIC_PARTNER_LINK || "/user/sign-up";
  const customerLink = process.env.NEXT_PUBLIC_CUSTOMER_LINK || "/user/sign-up";
  return (
    <div
      className="flex flex-col items-center justify-start space-y-20 w-full lg:px-10"
      id="Index"
    >
      {/* <ImageComponent
        className="!absolute top-0 left-0 w-full h-[40rem] object-cover z-[-1] opacity-70"
        src={LandingPageImage1}
        alt="background"
      /> */}
      <div className="flex flex-col items-center justify-center lg:space-y-3 space-y-3 pt-5">
        <Logo
          wings="lg:w-[12rem] w-[12rem]"
          textStyle="font-medium lg:text-3xl text-2xl"
        />
        <WordPopUp words={words.join(" ")} delay={0.2} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-y-10 gap-x-10 w-full lg:justify-items-center items-start flex-1">
        <DescriptionCard
          icon={<MdPersonSearch className="w-24 h-24 text-text" />}
          title="Find the right partner"
          description="Find the right partner for your needs. Makeup, Photography, Catering, and many more."
          linkText="Find Services"
          link={customerLink}
        />
        <DescriptionCard
          icon={<AiFillStar className="w-24 h-24 text-rating-2.5" />}
          title="Become the best in the business"
          description="Communicate what you offer and showcase your expertise. No commission charges!"
          linkText="Become a Partner"
          link={partnerLink}
        />
        <DescriptionCard
          icon={<GiJourney className="w-24 h-24 text-info" />}
          title="Join Us in our journey"
          description="Are you passionate about the gig economy? We are here to help you reach your dreams and achieve your goals."
          linkText="Find Jobs"
          link="/user/sign-up"
        />
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
    <Card className="w-full max-w-[800px] flex flex-col items-center justify-between space-y-5 lg:min-h-[28rem] min-h-[10rem] bg-white shadow-md lg:!pt-10 !pt-5 lg:!pb-20 !pb-10">
      <div className="flex flex-col items-center justify-center space-y-4">
        {icon}
        <p className="lg:text-xl font-medium text-lg text-center">{title}</p>
        <p className="lg:text-md text-base text-center">{description}</p>
      </div>
      <div className="max-w-[200px] w-full">
        <Button className="bg-primary text-white font-medium" asChild>
          <Link href={link}>{linkText}</Link>
        </Button>
      </div>
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

function YoutubeEmbed() {
  // logic to fetch latest Reach video from youtube

  return (
    <iframe
      src="https://www.youtube.com/embed/me_DDgXNgpY"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}
