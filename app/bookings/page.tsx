import { State } from "@data/enums";
import React from "react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Bookings on ReachGig",
    template: "%s | Bookings",
  },
  description:
    "Get the best prices, partners and services when booking with ReachGig!",
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
    <div className="relative flex flex-col items-center justify-center space-y-10 sm:space-y-10 scroll-smooth px-5">
      <Header />
      <FairPricing />
      <FeedbackSystem />
      <Communication />
      <Variety />
      <Disputes />
    </div>
  );
}

function Header() {
  return (
    <div className="w-full flex flex-col space-y-5 leading-7 text-center my-10 md:w-full md:flex md:flex-col md:space-y-10 md:leading-7">
      <h1 className="max-w-lg text-3xl font-medium leading-10 tracking-tight sm:text-4xl md:mx-auto text-center">
        Bookings are effortless with ReachGig!
      </h1>
      <p>
        In today's dynamic gig economy, finding reliable service providers can
        be a daunting task. However, our platform offers a range of benefits for
        both customers and partners, fostering a seamless and transparent
        experience for all parties involved. Here's why booking services on our
        platform stands out:
      </p>
    </div>
  );
}

function FairPricing() {
  return (
    <div className="w-full flex flex-col space-y-5 leading-7 text-center md:text-left md:w-full md:flex md:flex-col md:space-y-10 md:leading-7">
      <h2 className="max-w-lg  text-xl font-medium leading-10 tracking-tight sm:text-2xl ">
        Fair Pricing
      </h2>
      <div className="sm:flex sm:flex-row-reverse sm:w-full sm:items-center">
        <Image
          src="/images/fair-pricing.svg"
          className="w-full sm:w-1/3 object-cover"
          alt="Fair Pricing"
          width={100}
          height={100}
        />
        <p>
          Conventional booking advances range from{" "}
          <span className="text-primary">2000 Rs - 5000 Rs</span> ! Our platform
          charges only a nominal{" "}
          <span className="text-success">
            5% service fee, capped at 800 rupees
          </span>
          , ensuring affordability for customers and fair compensation for
          service providers.
        </p>
      </div>
    </div>
  );
}

function FeedbackSystem() {
  return (
    <div className="w-full flex flex-col space-y-5 leading-7 text-center md:text-left md:w-full md:flex md:flex-col md:space-y-10 md:leading-7">
      <h2 className="max-w-lg  text-xl font-medium leading-10 tracking-tight sm:text-2xl ">
        Transparent Feedback System
      </h2>
      <div className="sm:flex sm:flex-row sm:w-full sm:items-center">
        <Image
          src="/images/feedback.svg"
          className="w-full sm:w-1/3 object-cover"
          alt="Feedback System"
          width={100}
          height={100}
        />
        <p>
          Make informed decisions effortlessly! With our transparent feedback
          system, customers can easily gauge service quality through authentic
          user reviews, empowering both parties to strive for excellence.
        </p>
      </div>
    </div>
  );
}

function Communication() {
  return (
    <div className="w-full flex flex-col space-y-5 leading-7 text-center md:text-left md:w-full md:flex md:flex-col md:space-y-10 md:leading-7">
      <h2 className="max-w-lg  text-xl font-medium leading-10 tracking-tight sm:text-2xl ">
        Seamless Communication
      </h2>
      <div className="sm:flex sm:flex-row-reverse sm:w-full sm:items-center">
        <Image
          src="/images/communication.svg"
          className="w-full sm:w-1/3 object-cover"
          alt="communication system"
          width={100}
          height={100}
        />
        <p>
          Streamline your service experience! Our native chat platform
          facilitates seamless communication between customers and service
          providers, allowing for clear expectations and tailored service
          delivery.
        </p>
      </div>
    </div>
  );
}

function Variety() {
  return (
    <div className="w-full flex flex-col space-y-5 leading-7 text-center md:text-left md:w-full md:flex md:flex-col md:space-y-10 md:leading-7">
      <h2 className="max-w-lg  text-xl font-medium leading-10 tracking-tight sm:text-2xl ">
        Variety of Services
      </h2>
      <div className="sm:flex sm:flex-row sm:w-full sm:items-center">
        <Image
          src="/images/variety.svg"
          className="w-full sm:w-1/3 object-cover"
          alt="Variety of Services"
          width={100}
          height={100}
        />
        <p>
          From online to at-home services, our platform provides a wide array of
          options. Detailed listings include partner experience, gender served,
          ratings, visuals, requirements, inclusions, exclusions, and discounts,
          ensuring tailored bookings for every need.
        </p>
      </div>
    </div>
  );
}

function Disputes() {
  return (
    <div className="w-full flex flex-col space-y-5 leading-7 text-center md:text-left md:w-full md:flex md:flex-col md:space-y-10 md:leading-7">
      <h2 className="max-w-lg  text-xl font-medium leading-10 tracking-tight sm:text-2xl ">
        We always have your back
      </h2>
      <div className="sm:flex sm:flex-row sm:w-full sm:items-center">
        <Image
          src="/images/support.svg"
          className="w-full sm:w-1/3 object-cover"
          alt="Dispute Resolution"
          width={100}
          height={100}
        />
        <p>
          We've got your back. In case of disputes, our support team is just a
          click away. With prompt intervention via the help button or contact
          form, we ensure quick resolution, fostering trust and satisfaction
          among users.
        </p>
      </div>
    </div>
  );
}
