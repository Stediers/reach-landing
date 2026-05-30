import React from "react";
import { Metadata } from "next";
import HeaderWrapper from "@wrapper/HeaderWrapper";
import Card from "@components/Card";
import { MailCheck, PhoneCallIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@components/ui/button";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "ReachGig is the best platform for booking services from freelancers. Get in touch with us today!",
  alternates: {
    canonical: "https://www.reachgig.com/contact",
  },
  openGraph: {
    title: "Contact Us",
    description:
      "ReachGig is the best platform for booking services from freelancers. Get in touch with us today!",
    url: "https://www.reachgig.com/contact",
    type: "website",
    images: [
      {
        url: "https://www.reachgig.com/opengraph-image.png",
        width: 800,
        height: 600,
        alt: "Contact Us",
      },
    ],
    locale: "en_IN",
  },
};

export default function Page() {
  return (
    <HeaderWrapper
      title={
        <span className="!leading-snug">
          Reach Out <br /> to Us
        </span>
      }
      className="items-center justify-center w-full flex flex-col lg:space-y-16 space-y-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-5 w-full">
        <Card className="flex flex-col items-start justify-start space-y-5 lg:!p-10 bg-white">
          <div className="flex flex-row items-center justify-between space-x-5 w-full">
            <h2 className="text-2xl font-medium">Call Us</h2>
            <PhoneCallIcon className="h-8 w-8" />
          </div>
          <p className="text-lg">
            The best way to get in touch with us is to call us. We&apos;ll be
            happy to help you out.
          </p>
          <Link href="tel:+917550083900" passHref>
            <p className="text-lg text-info underline cursor-pointer">
              +91 7550083900
            </p>
          </Link>
        </Card>
        <Card className="flex flex-col items-start justify-start space-y-5 lg:!p-10">
          <div className="flex flex-row items-center justify-between space-x-5 w-full">
            <h2 className="text-2xl font-medium">Mail Us</h2>
            <MailCheck className="h-8 w-8" />
          </div>
          <p className="text-lg">
            Too lazy to call? No worries! Drop us an email and we&apos;ll get
            back to you as soon as possible
          </p>
          <Link href="mailto:asdas" passHref>
            <p className="text-lg text-info underline cursor-pointer">
              reachgig.connect@gmail&#46;com
            </p>
          </Link>
        </Card>
      </div>
    </HeaderWrapper>
  );
}
