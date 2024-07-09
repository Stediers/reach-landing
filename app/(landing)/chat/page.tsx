import React from "react";
import { Metadata } from "next";
import Hero from "@components/Hero";
import SideComponent from "@components/SideComponent";
import { ArrowDownCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Chats",
  description:
    "Book the best services at the best prices. Get the best partners and services when booking with ReachGig!",
  openGraph: {
    title: "Chats on ReachGig",
    description:
      "Get the best prices, partners and services when booking with ReachGig!",
    url: "https://reachgig.com/bookings",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "Chat",
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
          Making <span className="text-success">Communication</span>
          &nbsp; easier and more <span className="text-primary">Secure</span>
        </h1>
        <div className="flex flex-col space-y-5 items-center mt-10">
          <ArrowDownCircle className="w-12 h-12 text-white mx-auto" />
          <p className="text-white text-base">See what you get!</p>
        </div>
      </Hero>
      <div className="grid gap-10 px-10 lg:grid-cols-2 lg:px-20 justify-items-center max-w-[90rem]">
        <SideComponent
          title="Easy to Use"
          imageUrl="/images/fair-pricing.svg"
          description="A healthy UI/UX design that makes it easy to use and understand. Who said business chats have to be boring?"
        />
        <SideComponent
          title="Monitored"
          imageUrl="/images/feedback.svg"
          description="We monitor all chats to ensure that they are professional and respectful. We also ensure that no personal information is shared."
        />
        <SideComponent
          title="Block and Report"
          imageUrl="/images/communication.svg"
          description="We give you the power to block and report any user who is not following the guidelines. We take strict action against such users."
        />
        <SideComponent
          title="Multiple Triggers"
          imageUrl="/images/variety.svg"
          description="Have customers trigger booking requests, service queries, and more. More comfort, less yak-yak."
        />
      </div>
    </div>
  );
}
