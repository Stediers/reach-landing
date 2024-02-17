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
    <div className="relative flex flex-col items-center justify-center scroll-smooth">
      <Hero />
      <Section />
    </div>
  );
}

function Section() {
  return (
    <section className="bg-blueGray-200 -mt-28 !w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center"></div>
        </div>
        <div className="flex flex-wrap items-center mt-16">
          <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
            <h3 className="text-2xl mb-2 font-semibold leading-normal">
              The Mission
            </h3>
            <p className="text-md font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
              Lack of opportunities for the youth in the gig economy is a
              problem that has been around for a while. We are here to change
              the narrative.
            </p>
            <p className="text-md font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
              The gig economy is a free market system in which temporary
              positions are common and organizations contract with independent
              workers for short-term engagements. The trend toward a gig economy
              has begun. A study by Intuit predicted that by 2020, 40 percent of
              American workers would be independent contractors.
            </p>
          </div>
          <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-2 shadow-lg rounded-lg bg-info">
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
                <h4 className="text-xl font-bold text-white">
                  Top Notch Services
                </h4>
                <p className="text-md font-light mt-2 text-white">
                  The Arctic Ocean freezes every winter and much of the sea-ice
                  then thaws every summer, and that process will continue
                  whatever happens.
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <div className="bg-primary w-full">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
          <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
            <div className="mb-6 sm:mx-auto">
              <div className="flex items-center justify-center w-28 sm:mx-auto">
                <svg
                  className="w-full h-full text-white"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
            </div>
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
                  <svg
                    viewBox="0 0 52 24"
                    fill="currentColor"
                    className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-deep-purple-accent-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                  >
                    <defs>
                      <pattern
                        id="700c93bf-0068-4e32-aafe-ef5b6a647708"
                        x="0"
                        y="0"
                        width=".135"
                        height=".30"
                      >
                        <circle cx="1" cy="1" r=".7" />
                      </pattern>
                    </defs>
                    <rect
                      fill="url(#700c93bf-0068-4e32-aafe-ef5b6a647708)"
                      width="52"
                      height="24"
                    />
                  </svg>
                  <span className="relative">Our</span>
                </span>{" "}
                Story
              </h2>
              <p className="text-base text-indigo-100 md:text-lg !leading-10">
                Our Story is one of passion, dedication and hard work. We are
                here to change the narrative of the gig economy by providing
                opportunities for the youth.
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
