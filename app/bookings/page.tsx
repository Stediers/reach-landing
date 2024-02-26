import { State } from "@data/enums";
import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { BiRupee } from "react-icons/bi";
import { Button } from "@components/ui/button";
import { BookIcon } from "lucide-react";
import ImageComponent from "@components/ImageComponent";
import ComponentWrapper from "@wrapper/ComponentWrapper";
import Hero from "@components/Hero";
import SideComponent from "@components/SideComponent";

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
      <Hero
        image="/images/booking.svg"
        title="Bookings"
        subtitle="Book the best services at the best prices. Get the best partners and services when booking with ReachGig!"
      />
      <div className="grid gap-10 px-10 lg:grid-cols-2 lg:px-20 justify-items-center max-w-[100rem]">
        <SideComponent
          title="Fair Pricing"
          imageUrl="/images/fair-pricing.svg"
          description="Conventional booking advances range from 2000 Rs - 5000 Rs! Our platform charges only a nominal 5% service fee, capped at 800 Rs, ensuring affordability for customers and fair compensation for service providers."
        />
        <SideComponent
          title="Transparent Feedback System"
          imageUrl="/images/feedback.svg"
          description="Make informed decisions effortlessly! With our transparent feedback system, customers can easily gauge service quality through authentic user reviews, empowering both parties to strive for excellence."
        />
        <SideComponent
          title="Seamless Communication"
          imageUrl="/images/communication.svg"
          description="Streamline your service experience! Our native chat platform facilitates seamless communication between customers and service providers, allowing for clear expectations and tailored service delivery."
        />
        <SideComponent
          title="Variety of Services"
          imageUrl="/images/variety.svg"
          description="From online to at-home services, our platform provides a wide array of options. Detailed listings include partner experience"
        />
        <SideComponent
          title="Dispute Resolution"
          imageUrl="/images/support.svg"
          description="We've got your back. In case of disputes, our support team is just a click away. With prompt intervention via the help button or contact form, we ensure quick resolution, fostering trust and satisfaction among users."
        />
      </div>
    </div>
  );
}
