import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { Button } from "@components/ui/button";
import {
  Calendar,
  Check,
  Clock,
  CreditCard,
  MapPin,
  MessageSquare,
  Percent,
  Phone,
  StarsIcon,
  User,
} from "lucide-react";
import Card from "@components/Card";
import Link from "next/link";
import FeatureCard from "@components/FeatureCard";
import HeaderWrapper from "@wrapper/HeaderWrapper";
import { Badge } from "@components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { fetchBestPartners } from "@api_functions/explore/seo/fetch-best-partners";
import AppDownload from "@components/DownloadApp";
import { FaSuitcase } from "react-icons/fa";
import Hero from "./hero";
import InfinitePartners from "./people";
import { GiveClients } from "./give-clients";
import TheresMore from "./theres-more";
import Pricing from "./pricing";
import FrequentlyAskedQuestions from "./faq";

export const metadata: Metadata = {
  title: {
    absolute:
      "ReachGig Partner Program - Start Your Freelance Business | Free Website & Tools",
  },
  description:
    "Join ReachGig's Partner Program and get a free business website, secure payment processing, appointment management, and client acquisition tools. Perfect for freelancers, service providers, and small businesses in India.",
  keywords: [
    "freelancer website",
    "business management platform",
    "appointment scheduling",
    "secure payments",
    "client management",
    "service provider tools",
    "free business website",
    "freelance marketplace",
    "professional portfolio",
    "business growth platform",
    "client acquisition",
    "service booking system",
    "digital invoicing",
    "business automation",
    "india freelancing",
    "tamil nadu services",
    "reachgig partner",
    "local service providers",
    "online business tools",
    "professional networking",
  ].join(", "),
  openGraph: {
    title:
      "ReachGig Partner Program - Start Your Freelance Business | Free Website & Tools",
    description:
      "Launch your freelance career with ReachGig. Get a free business website, secure payment processing, appointment management, and powerful tools to grow your client base.",
    url: "https://reachgig.com/partner-program",
    type: "website",
    images: [
      {
        url: "https://reachgig.com/images/landing-profiles/home.webp",
        width: 1200,
        height: 630,
        alt: "ReachGig Partner Program - Professional Business Tools",
      },
    ],
    locale: "en_IN",
    siteName: "ReachGig",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "ReachGig Partner Program - Start Your Freelance Business | Free Website & Tools",
    description:
      "Launch your freelance career with ReachGig. Get a free business website, secure payment processing, appointment management, and powerful tools to grow your client base.",
    images: ["https://reachgig.com/images/landing-profiles/home.webp"],
  },
  other: {
    structured_data: JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "ReachGig",
        url: "https://reachgig.com",
        logo: "https://reachgig.com/images/logo.webp",
        description:
          "ReachGig is a comprehensive platform empowering freelancers and service providers with free business websites and professional tools.",
        address: {
          "@type": "PostalAddress",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
        sameAs: [
          "https://facebook.com/reachgig",
          "https://twitter.com/reachgig",
          "https://instagram.com/reachgig",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "ReachGig Partner Program",
        description:
          "Complete business management platform for freelancers and service providers",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "1000",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Do I need to pay to become a partner?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolutely not! You can become a partner for free. You also get your own website for free.",
            },
          },
          {
            "@type": "Question",
            name: "Do I pay a commission for the services I provide?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, you do not pay a commission for the services you provide. But your clients pay a small advance fee for using our safe and secure payment gateway.",
            },
          },
          {
            "@type": "Question",
            name: "How many services can I provide?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can provide a maximum of 5 services for free. If you want to provide more services, you can upgrade to our Pro plan.",
            },
          },
        ],
      },
    ]),
  },
};

export const revalidate = 60 * 60; // 1 hour

export default async function Main() {
  const response = await fetchBestPartners();
  return (
    <div className="relative w-full flex flex-col items-center justify-center scroll-smooth pb-20 lg:pt-0">
      <Hero />
      <InfinitePartners response={response} />
      <GiveClients />
      <TheresMore />
      <Pricing />
      <FrequentlyAskedQuestions />
      {/* <BestPartners /> */}
    </div>
  );
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
