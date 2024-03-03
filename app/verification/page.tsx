import { State } from "@data/enums";
import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { BiRupee } from "react-icons/bi";
import { Button } from "@components/ui/button";
import { ArrowDownCircle, BookIcon } from "lucide-react";
import ImageComponent from "@components/ImageComponent";
import ComponentWrapper from "@wrapper/ComponentWrapper";
import Hero from "@components/Hero";
import SideComponent from "@components/SideComponent";

export const metadata: Metadata = {
  title: {
    default: "Verification",
    template: "%s | ReachGig",
  },
  description:
    "Know who you're dealing with. Our verification process ensures that you can trust the service providers on our platform.",
  openGraph: {
    title: "Verification",
    description:
      "Know who you're dealing with. Our verification process ensures that you can trust the service providers on our platform.",
    url: "https://reachgig.com/bookings",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "Booking",
      },
    ],
    locale: "en_US",
  },
};

export default function Main() {
  return (
    <div className="relative flex flex-col items-center justify-center space-y-10 sm:space-y-10 scroll-smooth pb-20">
      <Hero>
        <h1 className="lg:text-5xl text-3xl font-semibold text-white !leading-relaxed px-10">
          {/* Making <span className="text-success">communication</span>
          &nbsp; easier and more <span className="text-primary">secure</span> */}
          Say Goodbye to <span className="text-error">Scammers</span>
          &nbsp; and hello to <span className="text-success">Trustable</span>
          &nbsp; partners
        </h1>
        <div className="flex flex-col space-y-5 items-center mt-10">
          <ArrowDownCircle className="w-12 h-12 text-white mx-auto" />
          <p className="text-white text-base">See what you get!</p>
        </div>
      </Hero>
      <div className="grid gap-10 px-10 lg:grid-cols-2 lg:px-20 justify-items-center max-w-[100rem]">
        {/* <ProfanityFilter />
        <Identity />
        <MobileNumber />
        <SkillVerification />
        <Report /> */}
        <SideComponent
          title="Profanity Filter"
          imageUrl="/images/profanity.svg"
          description="Our Manual Profanity Filter ensures that all content on our platform is appropriate for all users. This ensures a safe and comfortable environment for all users."
        />
        <SideComponent
          title="Identity Verification"
          imageUrl="/images/identity.svg"
          description="Our identity verification process ensures that the service providers on our platform are who they say they are. We ensure that the service providers are real and genuine."
        />
        <SideComponent
          title="Mobile Number Verification"
          imageUrl="/images/mobile-verification.svg"
          description="Our mobile number verification process ensures that the service providers on our platform are real and can be contacted easily. We ensure that the service providers are easily reachable."
        />
        <SideComponent
          title="Skill Verification"
          imageUrl="/images/skill-verification.svg"
          description="Our skill verification process ensures that the service providers on our platform are skilled and experienced in their respective fields. Say goodbye to unqualified service providers!"
        />
        <SideComponent
          title="Report System"
          imageUrl="/images/report.svg"
          description="Even if we miss something, you can report any inappropriate content or service providers on our platform. This ensures that our platform is safe and comfortable for all users."
        />
      </div>
    </div>
  );
}
