import ImageComponent from "@components/ImageComponent";
import { Button } from "@components/ui/button";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "About ReachGig",
    template: "%s | About Us",
  },
  description:
    "Learn about our mission and story. We are committed to providing opportunities for the youth in the gig economy.",
  openGraph: {
    title: "About ReachGig",
    description:
      "Learn about our mission and story. We are committed to providing opportunities for the youth in the gig economy.",
    url: "https://reachgig.com/about-us",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "About Us",
      },
    ],
    locale: "en_US",
  },
};

export default function Page() {
  return (
    <div className="relative flex flex-col items-center justify-center scroll-smooth lg:space-y-20 space-y-10 pb-20">
      <Hero />
      <Section />
      <WhatWeBelieve />
    </div>
  );
}

function Section() {
  return (
    <section className="!w-full pb-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="pt-6 w-full md:w-4/12 px-4 text-center"></div>
        </div>
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
            <h3 className="text-4xl mb-2 font-semibold leading-normal">
              The Mission
            </h3>
            <p className="text-md italic text-info leading-relaxed mt-4 mb-4 text-blueGray-600">
              &quot;We build too many walls and not enough bridges&quot; - Isaac
              Newton
            </p>
            <p className="text-md leading-relaxed mt-0 mb-4 text-blueGray-600">
              Our mission is to provide opportunities for the youth in the gig
              economy. We are committed to providing a platform for the youth to
              connect with potential employers and clients. We believe that the
              youth are the future and we are committed to providing them with
              the tools they need to succeed in the gig economy.
            </p>
          </div>
          <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-2 shadow-lg rounded-lg">
              <Image
                alt="..."
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1051&amp;q=80"
                className="w-full align-middle rounded-t-lg"
                height={100}
                width={100}
              />
              <blockquote className="relative p-8 mb-4">
                <svg
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 583 95"
                  className="absolute left-0 w-full block h-95-px -top-94-px"
                ></svg>
                <h4 className="text-xl font-semibold">
                  Future of the Gig Economy
                </h4>
                <p className="text-md mt-2">
                  The gig economy is growing at an unprecedented rate. We are
                  committed to providing opportunities for the youth in the gig
                  economy.
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatWeBelieve() {
  return (
    <div
      title="WE BELIEVE IN YOU"
      className="items-center justify-center w-full flex flex-col space-y-16"
      id="about-us"
    >
      <p className="lg:text-5xl text-3xl font-bold text-center">
        We <span className="text-primary">Believe</span> in You
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
    </div>
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
          className="rounded-2xl lg:w-[18rem] lg:h-[18rem] border border-gray w-[12rem] h-[12rem]"
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

function Hero() {
  return (
    <div className="bg-foreground w-full">
      <div className="px-10 py-16 mx-auto lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
          <div className="flex flex-col space-y-5 items-center mb-16 text-center sm:mb-0">
            <ImageComponent
              src="/images/about-us.svg"
              alt="About Us"
              className="w-[15rem] h-[15rem] object-cover"
              border={false}
            />
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h2 className="max-w-lg mb-6  text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
                  <span className="relative">About Us</span>
                </span>{" "}
              </h2>
              <p className="text-lg text-indigo-100 md:text-lg !leading-10">
                Learn about our mission and story. We are committed to providing
                opportunities for the youth in the gig economy.
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
