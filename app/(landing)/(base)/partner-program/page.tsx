import { CustomerRoutes, ServiceCategory, State } from "@data/enums";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Metadata } from "next";
import { BiRupee } from "react-icons/bi";
import { Button } from "@components/ui/button";
import {
  ArrowRight,
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
import { BsInstagram, BsLightningCharge, BsShieldCheck } from "react-icons/bs";
import Link from "next/link";
import FeatureCard from "@components/FeatureCard";
import { ProfileCard } from "@components/ProfileCard";
import { NumberCircle } from "@components/landing/NumberCircle";
import HeaderWrapper from "@wrapper/HeaderWrapper";
import { CarouselItem } from "@components/ui/carousel";
import RawCarousel from "@components/carousel/RawCarousel";
import { Badge } from "@components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { fetchBestPartners } from "@api_functions/explore/seo/fetch-best-partners";
import { FetchPartnerResponse } from "@data/types";
import AppDownload from "@components/DownloadApp";
import LinkButton from "@components/Button";
import Logo from "@components/Logo";

export const metadata: Metadata = {
  title: {
    default: "ReachGig - Be your own Boss",
    template: "%s - ReachGig",
  },
  description:
    "Kickstart your career with a free website. Get discovered, get paid securely and find trustable clients easily.",
  keywords: [
    "freelancer",
    "freelance",
    "free website",
    "service provider",
    "makeup artist",
    "photographer",
    "wedding planner",
    "tamil nadu",
    "india",
    "reachgig",
    "reach gig",
    "reach",
    "gig",
    "find clients",
    "get paid",
    "secure payments",
    "identity verification",
  ].join(", "),
  openGraph: {
    title: "ReachGig - Be your own Boss",
    description:
      "Kickstart your career with a free website. Get discovered, get paid securely and find trustable clients easily.",
    url: "https://reachgig.com",
    type: "website",
    images: [
      {
        url: "https://reachgig.com/images/home1.svg",
        width: 1200,
        height: 630,
        alt: "ReachGig - Be your own Boss",
      },
    ],
    locale: "en_IN",
    siteName: "ReachGig",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReachGig - Be your own Boss",
    description:
      "Kickstart your career with a free website. Get discovered, get paid securely and find trustable clients easily.",
    images: ["https://reachgig.com/images/home1.svg"],
  },
  // other: {
  //   structured_data: JSON.stringify({
  //     "@context": "https://schema.org",
  //     "@type": "Organization",
  //     name: "ReachGig",
  //     url: "https://reachgig.com",
  //     logo: "https://reachgig.com/images/logo.webp",
  //     description:
  //       "A trusted platform connecting verified service providers with customers in Tamil Nadu.",
  //     address: {
  //       "@type": "PostalAddress",
  //       addressRegion: "Tamil Nadu",
  //       addressCountry: "IN",
  //     },
  //     sameAs: [
  //       "https://facebook.com/reachgig",
  //       "https://twitter.com/reachgig",
  //       "https://instagram.com/reachgig",
  //     ],
  //     aggregateRating: {
  //       "@type": "AggregateRating",
  //       ratingValue: "4.8",
  //       reviewCount: "1000",
  //     },
  //   }),
  // },
};

export default async function Main() {
  const response = await fetchBestPartners();
  return (
    <div className="relative w-full flex flex-col items-center justify-center scroll-smooth pb-20 lg:pt-0">
      <Hero />
      <People response={response} />
      <HowItWorks />
      <TheresMore />
      <Pricing />
      <FrequentlyAskedQuestions />
      {/* <BestPartners /> */}
    </div>
  );
}

function HowItWorks() {
  return (
    <HeaderWrapper
      title={
        <span className="!leading-snug">
          Here&apos;s how <br />
          it works
        </span>
      }
      mobileAlign="center"
      desktopAlign="center"
      className="items-center justify-center w-full flex flex-col space-y-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 gap-y-20 w-full">
        <FeatureCard
          heading="Download the App"
          description="Make the first impression with your own website."
          icon={<NumberCircle number={1} size="lg" color="text" />}
        />
        <FeatureCard
          heading="Create your Profile"
          description="Mention the services you offer and get discovered."
          icon={<NumberCircle number={2} size="lg" color="text" />}
        />
        <FeatureCard
          heading="Add your services"
          description="Paste your generated link on your social media."
          icon={<NumberCircle number={3} size="lg" color="text" />}
        />
        <FeatureCard
          heading="Let the world know"
          description="Paste your generated link on all your social media."
          icon={<NumberCircle number={4} size="lg" color="text" />}
        />
        <FeatureCard
          heading="Start getting clients"
          description="Get discovered by people looking for your services."
          icon={<NumberCircle number={5} size="lg" color="text" />}
        />
        <FeatureCard
          heading="Get paid"
          description="Get paid securely and easily with our integrated payment gateway."
          icon={<NumberCircle number={6} size="lg" color="text" />}
        />
      </div>
    </HeaderWrapper>
  );
}

function TheresMore() {
  return (
    <HeaderWrapper
      title={
        <span className="!leading-snug">
          Wait! <br /> <span className="text-primary">There&apos;s More</span>
        </span>
      }
      mobileAlign="center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
        <SocialMediaCard
          src="/appointments.webp"
          heading="Manage Appointments"
          description="With our in built calendar, notificatons and reminders you can manage your appointments easily and effectively."
        />
        <SocialMediaCard
          src="/paid.avif"
          heading="Secure Payments"
          description="Get paid securely and easily with our integrated payment gateway"
        />
        <SocialMediaCard
          src="/invoice.avif"
          heading="Automated Invoices"
          description="Automatically generate invoices for your clients and keep track of your earnings."
        />
        <SocialMediaCard
          src="/instagram.avif"
          heading="Instagram Integration"
          description="Integrate your Instagram account and showcase your previous work to your clients."
        />
      </div>
    </HeaderWrapper>
  );

  function SocialMediaCard({
    src,
    heading,
    description,
  }: {
    src: string;
    heading: string;
    description: string;
  }) {
    return (
      <Card className="flex !bg-[#FAFAFA] flex-col items-center justify-start lg:!items-start space-y-6 lg:space-y-10 !rounded-3xl px-5 py-7 lg:px-10 lg:py-14 text-black">
        <Image
          alt="Hero"
          src={src}
          width={200}
          height={200}
          className="w-full lg:h-[15rem] object-cover"
        />
        <div className="flex flex-col items-start justify-center lg:space-y-5 space-y-3 w-full">
          <h3 className="lg:text-2xl text-2xl font-medium w-full">{heading}</h3>
          <p className="text-md lg:text-lg">{description}</p>
        </div>
      </Card>
    );
  }
}

// function Hero() {
//   return (
//     <div
//       className="w-full flex flex-col items-center justify-center space-y-5 relative lg:pt-10 xl:min-h-[80vh] lg:min-h-[50vh] pt-10"
//       id="home"
//     >
//       <div className="flex flex-col md:flex-col-reverse xl:flex-row-reverse lg:justify-between lg:items-center items-start justify-center pb-10 space-y-5 w-full px-5 lg:px-10 max-w-7xl">
//         <Image
//           alt="Hero"
//           src="/images/landing-profiles/home.webp"
//           className="w-full h-full"
//           width={1000}
//           height={900}
//         />
//         <div className="flex flex-col items-start justify-center space-y-3 lg:space-y-5 w-full z-10 ">
//           <div className="flex flex-col items-start justify-center space-y-3 lg:space-y-5 w-full max-w-lg">
//             <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium lg:font-semibold !leading-tight xl:!leading-[4.7rem]">
//               <span className="font-medium">Get a</span>
//               <br />
//               <span className="font-medium">
//                 <span className="text-primary">Free</span> website
//               </span>
//               <br />
//               <span className="font-medium">
//                 for your
//                 <span className="text-primary"> Business</span>
//               </span>
//             </h1>
//             <h2 className="text-lg xl:text-xl font-normal xl:leading-relaxed text-textsubtle">
//               Become the reason why people choose you. Get a free website for
//               your business and start getting more clients.
//             </h2>
//           </div>
//           <div className="max-w-md grid grid-cols-2 gap-2 pt-3 w-full">
//             <AppDownload
//               triggerJSX={
//                 <Image
//                   alt="Hero"
//                   src="/images/buttons/playstore.webp"
//                   width={0}
//                   height={0}
//                   sizes="100vw"
//                   className="w-full h-full"
//                 />
//               }
//             />
//             <AppDownload
//               triggerJSX={
//                 <Image
//                   alt="Hero"
//                   src="/images/buttons/appstore.webp"
//                   width={0}
//                   height={0}
//                   sizes="100vw"
//                   className="w-full h-full"
//                 />
//               }
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

function Hero() {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-5 relative lg:pt-10 lg:min-h-[50vh] pt-8">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center items-center justify-center pb-10 space-y-5 w-full px-5 lg:px-10 max-w-7xl">
        <div className="flex flex-col lg:items-start items-center justify-center space-y-3 lg:space-y-5 w-full z-10 max-w-lg lg:max-w-none">
          <Badge variant="defaultOutline">With Instagram Integration</Badge>
          <h1 className="text-4xl lg:text-left lg:text-6xl xl:text-6xl font-semibold lg:font-semibold !leading-normal xl:!leading-[5.2rem] text-center">
            <span className="font-medium">Get a</span>
            <br />
            <span className="font-medium">
              <span className="bg-info px-3 rounded-lg text-white text-3xl lg:text-4xl xl:text-5xl">
                Free
              </span>{" "}
              website
            </span>
            <br />
            <span className="font-medium">
              for your{" "}
              <span className="bg-success px-3 rounded-lg text-white text-3xl lg:text-4xl xl:text-5xl">
                Business
              </span>
            </span>
          </h1>
          <h2 className="text-md lg:text-left xl:text-xl font-normal xl:leading-relaxed text-textsubtle text-center max-w-md">
            No more
            <span className="text-primary">
              {" "}
              &quot;DM me for details&quot;.{" "}
            </span>
            Get a free website for your business and start getting more clients.
          </h2>
          <div className="pt-3">
            <AppDownload
              triggerJSX={
                <LinkButton
                  link="/download"
                  className="bg-black text-white py-3 px-5 !w-fit rounded-3xl text-md font-semibold"
                  text="Get Started - It's Free"
                />
              }
            />
          </div>
        </div>
        <Image
          alt="Hero"
          src="/images/landing-profiles/home.webp"
          className="w-full h-full pt-10 md:h-[30rem] md:w-[30rem] xl:h-[30rem] xl:w-[30rem]"
          width={1000}
          height={900}
        />
      </div>
    </div>
  );
}

function People({ response }: { response: FetchPartnerResponse[] | null }) {
  return (
    <div className="px-5 lg:px-10 max-w-7xl w-full flex flex-col items-center justify-center space-y-8 lg:space-y-16 relative pt-10">
      <p className="text-md lg:text-xl text-center w-full font-semibold text-textsubtle tracking-wide">
        USED BY THESE AMAZING PEOPLE
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        {response?.map((partner) => (
          <Profile
            key={partner.userId}
            name={partner.firstName}
            image={partner.imageUrl}
            des={partner.designation}
            link={`/${partner.handle}`}
          />
        ))}
      </div>
    </div>
  );

  function Profile({
    name,
    image,
    des,
    link,
  }: {
    name: string;
    image: string;
    des: string;
    link: string;
  }) {
    return (
      <Link
        className="flex flex-col items-center justify-center space-y-3 lg:space-y-5"
        href={link}
      >
        <div className="w-40 h-40 lg:w-56 lg:h-56 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={80}
            height={80}
            className="w-full h-full bg-black object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-0 lg:space-y-2">
          <p className="text-lg lg:text-xl font-medium">{name}</p>
          <p className="text-sm lg:text-lg font-normal text-textsubtle">
            {des}
          </p>
        </div>
      </Link>
    );
  }
}

function Pricing() {
  return (
    <HeaderWrapper
      title={
        <span className="!leading-snug">
          The <br /> <span className="font-semibold">Right</span>
          {"  "}Price
        </span>
      }
      className="bg-[#5755ca] text-white items-center justify-center w-full flex flex-col space-y-16"
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
      className={`w-full ${className} lg:!p-10 !p-5 !justify-between !space-y-10 bg-white text-black`}
    >
      <div className="flex flex-col items-start justify-start h-full space-y-10">
        <div className="flex flex-col items-start justify-start space-y-5">
          <Badge className="bg-[#5755ca] text-white">{tag}</Badge>
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
      <AppDownload
        triggerJSX={
          <Button variant="success" className="!w-full">
            Get Started with {title}
          </Button>
        }
      />
    </Card>
  );
}

function FrequentlyAskedQuestions() {
  return (
    <section className={`w-full flex flex-col lg:py-10 items-center`}>
      <div
        className={`flex flex-col max-w-7xl justify-center space-y-7 lg:space-y-20 w-full px-5 lg:px-10  py-10`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
          <div className="flex flex-col items-start justify-start space-y-5">
            <h2 className="text-4xl lg:text-5xl font-medium !leading-snug">
              Frequently Asked Questions
            </h2>
            <p className="text-lg">Can&apos;t find what you are looking for?</p>
            <Link href="/contact" passHref>
              <Button variant="infoOutline">Contact Support</Button>
            </Link>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <FAQCard
              question="Do I need to pay to become a partner?"
              answer="Absolutely not! You can become a partner for free. You also get your own website for free."
            />
            <FAQCard
              question="Do I pay a commission for the services I provide?"
              answer="No, you do not pay a commission for the services you provide. But your clients pay a small advance fee for using our safe and secure payment gateway."
            />
            <FAQCard
              question="How many services can I provide?"
              answer="You can provide a maximum of 5 services for free. If you want to provide more services, you can upgrade to our Pro plan."
            />
            <FAQCard
              question="How do I get paid?"
              answer="You get paid directly by your clients. We do not take any commission from the services you provide."
            />
            <FAQCard
              question="How do I get more clients?"
              answer="You can get more clients by providing high-quality services and by asking your clients to leave a review on your profile."
            />
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function FAQCard({
  question,
  answer,
  item,
}: {
  question: string;
  answer: string;
  item?: string;
}) {
  return (
    <AccordionItem value={question} className="w-full">
      <AccordionTrigger>
        <div className="flex flex-row items-center justify-start space-x-5">
          <p className="lg:text-xl text-lg text-left font-medium">{question}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <p className="text-lg">{answer}</p>
      </AccordionContent>
    </AccordionItem>
  );
}
