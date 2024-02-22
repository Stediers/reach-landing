import { State } from "@data/enums";
import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { BiRupee } from "react-icons/bi";
import { Button } from "@components/ui/button";
import { BookIcon } from "lucide-react";
import ImageComponent from "@components/ImageComponent";
import ComponentWrapper from "@wrapper/ComponentWrapper";

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
      <Hero />
      <div className="grid gap-10 px-10 lg:grid-cols-2 lg:px-20 justify-items-center max-w-[100rem]">
        <ProfanityFilter />
        <Identity />
        <MobileNumber />
        <SkillVerification />
        <Report />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="bg-foreground w-full">
      <div className="px-10 py-16 mx-auto lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
          <div className="flex flex-col space-y-5 items-center mb-16 text-center sm:mb-0">
            <ImageComponent
              src="/images/verification.svg"
              alt="Verification"
              className="w-[15rem] h-[15rem] object-cover"
              border={false}
            />
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h2 className="max-w-lg mb-6  text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
                  <span className="relative">Verifications</span>
                </span>{" "}
              </h2>
              <p className="text-base text-indigo-100 md:text-lg !leading-10">
                Know who you&apos;re dealing with. Our verification process
                ensures that you can trust the service providers on our
                platform.
              </p>
            </div>
            <div className="max-w-xl sm:mx-auto sm:text-center lg:max-w-2xl">
              <Button variant="info" asChild>
                Join Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfanityFilter() {
  return (
    <ComponentWrapper>
      <ImageComponent
        src="/images/profanity.svg"
        className="w-48 h-48 object-cover lg:hidden"
        alt="Profanity"
        border={false}
      />
      <div className="flex flex-col space-y-3 leading-7 text-center md:text-left md:w-full md:flex md:flex-col md:space-y-10 md:leading-7">
        <h2 className="max-w-lg font-medium leading-10 text-3xl">
          Profanity Filter
        </h2>
        <p className="text-lg">
          Our Manual Profanity Filter ensures that all content on our platform
          is appropriate for all users. This ensures a safe and comfortable
          environment for all users.
        </p>
      </div>
      <ImageComponent
        src="/images/profanity.svg"
        className="w-[18rem] h-[18rem] object-cover hidden lg:block"
        alt="Fair Pricing"
        border={false}
      />
    </ComponentWrapper>
  );
}

function SkillVerification() {
  return (
    <ComponentWrapper>
      {" "}
      <ImageComponent
        src="/images/skill-verification.svg"
        className="w-48 h-48 object-cover lg:hidden"
        alt="Feedback System"
        border={false}
      />
      <div className="flex flex-col space-y-5 leading-7 text-center md:text-left md:w-full md:flex md:flex-col md:space-y-10 md:leading-7">
        <h2 className="max-w-lg font-medium leading-10 text-3xl ">
          Skill Verification
        </h2>
        <p className="text-lg">
          Our skill verification process ensures that the service providers on
          our platform are skilled and experienced in their respective fields.
          Say goodbye to unqualified service providers!
        </p>
      </div>
      <ImageComponent
        src="/images/skill-verification.svg"
        className="w-[15rem] h-[15rem] object-cover hidden lg:block"
        alt="Fair Pricing"
        border={false}
      />
    </ComponentWrapper>
  );
}

function MobileNumber() {
  return (
    <ComponentWrapper>
      <ImageComponent
        src="/images/mobile-verification.svg"
        className="w-48 h-48 object-cover lg:hidden"
        alt="MobileNumber System"
        border={false}
      />
      <div className="flex flex-col space-y-5 leading-7 text-center md:text-left md:w-full md:flex md:flex-col md:space-y-10 md:leading-7">
        <h2 className="max-w-lg font-medium leading-10 text-3xl ">
          Mobile Number Verification
        </h2>
        <p className="text-lg">
          Our mobile number verification process ensures that the service
          providers on our platform are real and can be contacted easily. We
          ensure that the service providers are easily reachable.
        </p>
      </div>
      <ImageComponent
        src="/images/mobile-verification.svg"
        className="w-[20rem] h-[20rem] object-cover hidden lg:block"
        alt="Seamless MobileNumber"
        border={false}
      />
    </ComponentWrapper>
  );
}

function Identity() {
  return (
    <ComponentWrapper>
      <ImageComponent
        src="/images/identity.svg"
        className="w-48 h-48 object-cover lg:hidden"
        alt="Identity of Services"
        border={false}
      />
      <div className="flex flex-col space-y-5 leading-7 text-center md:text-left md:w-full md:flex md:flex-col md:space-y-10 md:leading-7">
        <h2 className="max-w-lg font-medium leading-10 text-3xl ">
          Identity Verification
        </h2>
        <p className="text-lg">
          Our identity verification process ensures that the service providers
          on our platform are who they say they are. We ensure that the service
          providers are real and genuine.
        </p>
      </div>
      <ImageComponent
        src="/images/identity.svg"
        className="w-[20rem] h-[20rem] object-cover hidden lg:block"
        alt="Identity of Services"
        border={false}
      />
    </ComponentWrapper>
  );
}

function Report() {
  return (
    <ComponentWrapper>
      <ImageComponent
        src="/images/report.svg"
        className="w-48 h-48 object-cover lg:hidden"
        alt="Dispute Resolution"
        border={false}
      />
      <div className="flex flex-col space-y-5 leading-7 text-center md:text-left md:w-full md:flex md:flex-col md:space-y-10 md:leading-7">
        <h2 className="max-w-lg font-medium leading-10 text-3xl ">
          Report System
        </h2>
        <p className="text-lg">
          Even if we miss something, you can report any inappropriate content or
          service providers on our platform. This ensures that our platform is
          safe and comfortable for all users.
        </p>
      </div>
      <ImageComponent
        src="/images/report.svg"
        className="w-[20rem] h-[20rem] object-cover hidden lg:block"
        alt="Dispute Resolution"
        border={false}
      />
    </ComponentWrapper>
  );
}
