import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import React from "react";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function ConsoleLayout({ children }: RootLayoutProps) {
  return (
    <div className="w-full flex flex-col justify-start items-center relative !hide-scrollbar">
      <Hero />
      <PopularDesignations />
      {children}
    </div>
  );
}

function PopularDesignations() {
  return (
    <div className="border-y-2 border-border w-full py-5">
      <div className="flex flex-row justify-start items-center lg:space-x-5 lg:space-y-0 w-full px-5 lg:px-10">
        <Button variant="default" className="!w-fit">
          Explore all services
        </Button>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-5 relative lg:pt-10 lg:min-h-[50vh] pt-8">
      <div className="flex flex-col lg:justify-between lg:items-center items-center justify-center pb-10 space-y-5 w-full px-5 lg:px-10 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-3 lg:space-y-5 w-full z-10 max-w-lg lg:max-w-none">
          <Badge variant="successOutline">Safe and Secure</Badge>
          <h1 className="text-4xl lg:text-6xl xl:text-6xl font-medium !leading-tight xl:!leading-[4.7rem] text-center">
            <span className="font-medium">India's</span>
            <br />
            <span className="font-medium text-primary">
              best experts
              <br />
            </span>
            at your service
            <br />
          </h1>
          <h2 className="text-md lg:text-lg xl:text-2xl font-normal xl:leading-relaxed text-textsubtle text-center max-w-lg">
            Find the right professional for your needs. <br />
            <span className="text-primary">Get started today!</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
