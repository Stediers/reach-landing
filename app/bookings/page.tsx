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
    default: "Bookings",
    template: "%s | ReachGig",
  },
  description:
    "Book the best services at the best prices. Get the best partners and services when booking with ReachGig!",
  openGraph: {
    title: "Bookings on ReachGig",
    description:
      "Get the best prices, partners and services when booking with ReachGig!",
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
        <FairPricing />
        <FeedbackSystem />
        <Communication />
        <Variety />
        <Disputes />
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
              src="/images/booking.svg"
              alt="About Us"
              className="w-[15rem] h-[15rem] object-cover"
              border={false}
            />
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h2 className="max-w-lg mb-6  text-3xl font-bold leading-none text-white sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
                  <span className="relative">Bookings</span>
                </span>{" "}
              </h2>
              <p className="text-base text-indigo-100 md:text-lg !leading-10">
                Leran more about our booking system and how it works. Reap the
                benefits of our platform today!
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

function FairPricing() {
  return (
    <ComponentWrapper>
      {" "}
      <ImageComponent
        src="/images/fair-pricing.svg"
        className="w-48 h-48 object-cover lg:hidden"
        alt="Fair Pricing"
        border={false}
      />
      <div className="flex flex-col space-y-5 leading-7 text-center md:text-left md:w-full md:flex md:flex-col md:space-y-10 md:leading-7">
        <h2 className="max-w-lg font-medium leading-10 text-3xl ">
          Fair Pricing
        </h2>
        <p className="text-lg">
          Conventional booking advances range from{" "}
          <span className="text-primary">2000 Rs - 5000 Rs</span> ! Our platform
          charges only a nominal{" "}
          <span className="text-success">5% service fee, capped at 800 Rs</span>
          , ensuring affordability for customers and fair compensation for
          service providers.
        </p>
      </div>
      <ImageComponent
        src="/images/fair-pricing.svg"
        className="w-[18rem] h-[18rem] object-cover hidden lg:block"
        alt="Fair Pricing"
        border={false}
      />
    </ComponentWrapper>
  );
}

function FeedbackSystem() {
  return (
    <ComponentWrapper>
      {" "}
      <ImageComponent
        src="/images/feedback.svg"
        className="w-48 h-48 object-cover lg:hidden"
        alt="Feedback System"
        border={false}
      />
      <div className="flex flex-col space-y-5 leading-7 text-center md:text-left md:w-full md:flex md:flex-col md:space-y-10 md:leading-7">
        <h2 className="max-w-lg font-medium leading-10 text-3xl ">
          Transparent Feedback System
        </h2>
        <p className="text-lg">
          Make informed decisions effortlessly! With our transparent feedback
          system, customers can easily gauge service quality through authentic
          user reviews, empowering both parties to strive for excellence.
        </p>
      </div>
      <ImageComponent
        src="/images/feedback.svg"
        className="w-[20rem] h-[20rem] object-cover hidden lg:block"
        alt="Fair Pricing"
        border={false}
      />
    </ComponentWrapper>
  );
}

function Communication() {
  return (
    <ComponentWrapper>
      {" "}
      <ImageComponent
        src="/images/communication.svg"
        className="w-48 h-48 object-cover lg:hidden"
        alt="Communication System"
        border={false}
      />
      <div className="flex flex-col space-y-5 leading-7 text-center md:text-left md:w-full md:flex md:flex-col md:space-y-10 md:leading-7">
        <h2 className="max-w-lg font-medium leading-10 text-3xl ">
          Seamless Communication
        </h2>
        <p className="text-lg">
          Streamline your service experience! Our native chat platform
          facilitates seamless communication between customers and service
          providers, allowing for clear expectations and tailored service
          delivery.
        </p>
      </div>
      <ImageComponent
        src="/images/communication.svg"
        className="w-[20rem] h-[20rem] object-cover hidden lg:block"
        alt="Seamless Communication"
        border={false}
      />
    </ComponentWrapper>
  );
}

function Variety() {
  return (
    <ComponentWrapper>
      {" "}
      <ImageComponent
        src="/images/variety.svg"
        className="w-48 h-48 object-cover lg:hidden"
        alt="Variety of Services"
        border={false}
      />
      <div className="flex flex-col space-y-5 leading-7 text-center md:text-left md:w-full md:flex md:flex-col md:space-y-10 md:leading-7">
        <h2 className="max-w-lg font-medium leading-10 text-3xl ">
          Variety of Services
        </h2>
        <p className="text-lg">
          From online to at-home services, our platform provides a wide array of
          options. Detailed listings include partner experience
        </p>
      </div>
      <ImageComponent
        src="/images/variety.svg"
        className="w-[20rem] h-[20rem] object-cover hidden lg:block"
        alt="Variety of Services"
        border={false}
      />
    </ComponentWrapper>
  );
}

function Disputes() {
  return (
    <ComponentWrapper>
      {" "}
      <ImageComponent
        src="/images/support.svg"
        className="w-48 h-48 object-cover lg:hidden"
        alt="Dispute Resolution"
        border={false}
      />
      <div className="flex flex-col space-y-5 leading-7 text-center md:text-left md:w-full md:flex md:flex-col md:space-y-10 md:leading-7">
        <h2 className="max-w-lg font-medium leading-10 text-3xl ">
          Dispute Resolution
        </h2>
        <p className="text-lg">
          We&apos;ve got your back. In case of disputes, our support team is
          just a click away. With prompt intervention via the help button or
          contact form, we ensure quick resolution, fostering trust and
          satisfaction among users.
        </p>
      </div>
      <ImageComponent
        src="/images/support.svg"
        className="w-[20rem] h-[20rem] object-cover hidden lg:block"
        alt="Dispute Resolution"
        border={false}
      />
    </ComponentWrapper>
  );
}
