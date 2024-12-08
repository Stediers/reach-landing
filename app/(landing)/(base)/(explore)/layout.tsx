import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Designation } from "@data/enums";
import React from "react";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function ConsoleLayout({ children }: RootLayoutProps) {
  return (
    <div className="w-full flex flex-col justify-start items-center relative !hide-scrollbar">
      <Hero />
      {children}
    </div>
  );
}

function Hero() {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-5 relative lg:pt-10 lg:min-h-[50vh] pt-8">
      <div className="flex flex-col lg:justify-between lg:items-center items-center justify-center pb-5 space-y-5 w-full px-5 lg:px-10 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-3 lg:space-y-5 w-full z-10 max-w-lg lg:max-w-none">
          <Badge variant="successOutline">Safe and Secure</Badge>
          <h1 className="text-4xl lg:text-6xl xl:text-6xl font-medium !leading-normal xl:!leading-[5.2rem] text-center">
            <span className="font-medium">India&apos;s</span>
            <br />
            <span className="bg-primary px-3 rounded-lg text-white text-3xl lg:text-4xl xl:text-5xl">
              Best Experts
              <br />
            </span>
            at your service
            <br />
          </h1>
          <h2 className="text-md lg:text-lg xl:text-xl font-normal xl:leading-relaxed text-textsubtle text-center max-w-lg">
            Flawless bookings, advance payments, and a dedicated support team to
            ensure quality service.
          </h2>
        </div>
      </div>
    </div>
  );
}
